import ts from 'typescript'
import { parseCatalog } from './catalogCheck'
import { defaultText, type IndicatorSettings } from './settingsTable'

/**
 * Describe a NATIVE indicator (one Gainium runs) from the dashboard's catalog,
 * in the same JSON shape claus-dashboard's tv-describe writes for TradingView
 * scripts (`gainium.indicator-settings/1`), so every article's settings table
 * has one source shape (spec 053 §2.1 "Settings and tips").
 *
 * The catalog is evaluated STATICALLY: its source is parsed with the
 * TypeScript compiler and a small evaluator folds the literal subset it uses
 * (object/array literals, spreads, enum members, top-level consts, the
 * `make*Field` helpers, `??`, and filter/map/includes over literal arrays).
 * No dashboard code is imported or run. Anything outside that subset becomes
 * a note on the result rather than a guess.
 */

export interface ModuleReader {
  /** Source text of a module, by its path relative to the dashboard `src/` (e.g. `types/index.ts`). */
  read(relPath: string): Promise<string>
}

export const CATALOG_MODULE = 'types/indicators/indicatorCatalog.ts'
export const ENUM_MODULE = 'types/index.ts'

const UNRESOLVED = Symbol('unresolved')
type Value = unknown

interface Closure {
  kind: 'closure'
  node: ts.ArrowFunction | ts.FunctionExpression
  scope: Scope
  module: Module
}

interface Scope {
  vars: Map<string, Value>
  parent: Scope | null
}

interface Module {
  path: string
  source: ts.SourceFile
  consts: Map<string, ts.Expression>
  enums: Map<string, Map<string, Value>>
  imports: Map<string, { from: string; name: string }>
  cache: Map<string, Value>
}

/** Resolve an import specifier from a module to a path under src/. */
function resolveSpecifier(fromPath: string, spec: string): string | null {
  const join = (base: string, rel: string) => {
    const parts = base.split('/').slice(0, -1)
    for (const p of rel.split('/')) {
      if (p === '..') parts.pop()
      else if (p !== '.') parts.push(p)
    }
    return parts.join('/')
  }
  let p: string
  if (spec.startsWith('@/')) p = spec.slice(2)
  else if (spec === '..' || spec.startsWith('.')) p = join(fromPath, spec)
  else return null
  if (spec === '..' || spec.endsWith('/..')) return `${p}/index.ts`
  return /\.tsx?$/.test(p) ? p : `${p}.ts`
}

export class CatalogEvaluator {
  private modules = new Map<string, Promise<Module>>()
  readonly notes: string[] = []

  constructor(private reader: ModuleReader) {}

  load(path: string): Promise<Module> {
    let m = this.modules.get(path)
    if (!m) {
      m = this.reader.read(path).then((text) => this.index(path, text))
      this.modules.set(path, m)
    }
    return m
  }

  private index(path: string, text: string): Module {
    const source = ts.createSourceFile(path, text, ts.ScriptTarget.ES2022, true)
    const mod: Module = {
      path,
      source,
      consts: new Map(),
      enums: new Map(),
      imports: new Map(),
      cache: new Map(),
    }
    for (const st of source.statements) {
      if (
        ts.isImportDeclaration(st) &&
        ts.isStringLiteral(st.moduleSpecifier)
      ) {
        const from = resolveSpecifier(path, st.moduleSpecifier.text)
        const named = st.importClause?.namedBindings
        if (from && named && ts.isNamedImports(named)) {
          for (const el of named.elements) {
            mod.imports.set(el.name.text, {
              from,
              name: (el.propertyName ?? el.name).text,
            })
          }
        }
      } else if (ts.isVariableStatement(st)) {
        for (const d of st.declarationList.declarations) {
          if (ts.isIdentifier(d.name) && d.initializer)
            mod.consts.set(d.name.text, d.initializer)
        }
      } else if (ts.isEnumDeclaration(st)) {
        const members = new Map<string, Value>()
        let next = 0
        for (const mem of st.members) {
          const name = mem.name.getText(source).replace(/^['"]|['"]$/g, '')
          if (mem.initializer && ts.isStringLiteral(mem.initializer))
            members.set(name, mem.initializer.text)
          else if (mem.initializer && ts.isNumericLiteral(mem.initializer)) {
            next = Number(mem.initializer.text)
            members.set(name, next++)
          } else members.set(name, next++)
        }
        mod.enums.set(st.name.text, members)
      }
    }
    return mod
  }

  /** A top-level name of a module, following imports. */
  async lookup(mod: Module, name: string): Promise<Value> {
    if (mod.cache.has(name)) return mod.cache.get(name)
    let v: Value = UNRESOLVED
    if (mod.enums.has(name)) v = { kind: 'enum', members: mod.enums.get(name) }
    else if (mod.consts.has(name)) {
      mod.cache.set(name, UNRESOLVED) // cycle guard
      v = await this.ev(
        mod.consts.get(name) as ts.Expression,
        { vars: new Map(), parent: null },
        mod,
      )
    } else if (mod.imports.has(name)) {
      const imp = mod.imports.get(name) as { from: string; name: string }
      try {
        v = await this.lookup(await this.load(imp.from), imp.name)
      } catch (e) {
        this.notes.push(
          `could not read ${imp.from} for ${name}: ${(e as Error).message.slice(0, 80)}`,
        )
      }
    }
    mod.cache.set(name, v)
    return v
  }

  private find(
    scope: Scope | null,
    name: string,
  ): { found: boolean; value?: Value } {
    for (let s = scope; s; s = s.parent)
      if (s.vars.has(name)) return { found: true, value: s.vars.get(name) }
    return { found: false }
  }

  async call(fn: Value, args: Value[]): Promise<Value> {
    if (typeof fn === 'function')
      return (fn as (...a: Value[]) => Value)(...args)
    const c = fn as Closure
    if (!c || c.kind !== 'closure') return UNRESOLVED
    const vars = new Map<string, Value>()
    c.node.parameters.forEach((p, i) => {
      if (ts.isIdentifier(p.name)) vars.set(p.name.text, args[i])
    })
    if (!ts.isBlock(c.node.body))
      return this.ev(c.node.body, { vars, parent: c.scope }, c.module)
    // A block body: only `return <expr>` is followed.
    const ret = c.node.body.statements.find(ts.isReturnStatement)
    return ret?.expression
      ? this.ev(ret.expression, { vars, parent: c.scope }, c.module)
      : UNRESOLVED
  }

  async ev(node: ts.Expression, scope: Scope, mod: Module): Promise<Value> {
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isTypeAssertionExpression(node)
    ) {
      return this.ev(node.expression, scope, mod)
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      return node.text
    if (ts.isNumericLiteral(node)) return Number(node.text)
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false
    if (node.kind === ts.SyntaxKind.NullKeyword) return null
    if (ts.isIdentifier(node) && node.text === 'undefined') return undefined
    if (
      ts.isPrefixUnaryExpression(node) &&
      node.operator === ts.SyntaxKind.MinusToken
    ) {
      const v = await this.ev(node.operand, scope, mod)
      return typeof v === 'number' ? -v : UNRESOLVED
    }
    if (ts.isTemplateExpression(node)) {
      let s = node.head.text
      for (const span of node.templateSpans) {
        const v = await this.ev(span.expression, scope, mod)
        if (v === UNRESOLVED) return UNRESOLVED
        s += String(v) + span.literal.text
      }
      return s
    }
    if (ts.isArrayLiteralExpression(node)) {
      const out: Value[] = []
      for (const el of node.elements) {
        if (ts.isSpreadElement(el)) {
          const v = await this.ev(el.expression, scope, mod)
          if (Array.isArray(v)) out.push(...v)
          else out.push(UNRESOLVED)
        } else out.push(await this.ev(el, scope, mod))
      }
      return out
    }
    if (ts.isObjectLiteralExpression(node)) {
      const out: Record<string, Value> = {}
      for (const p of node.properties) {
        if (ts.isSpreadAssignment(p)) {
          const v = await this.ev(p.expression, scope, mod)
          if (v && typeof v === 'object') Object.assign(out, v)
        } else if (ts.isPropertyAssignment(p)) {
          let key: Value
          if (ts.isComputedPropertyName(p.name))
            key = await this.ev(p.name.expression, scope, mod)
          else key = p.name.getText(mod.source).replace(/^['"]|['"]$/g, '')
          if (key === UNRESOLVED) continue
          // Summary/derivation callbacks are UI behaviour, not settings. A
          // derive `set` is kept as a closure: the edge check calls it to see
          // whether the control stores its own key (Session's Active field
          // writes it inline, ADX's Mode through a named function).
          if (
            (ts.isArrowFunction(p.initializer) ||
              ts.isFunctionExpression(p.initializer)) &&
            key !== 'set'
          )
            continue
          out[String(key)] = await this.ev(p.initializer, scope, mod)
        } else if (ts.isShorthandPropertyAssignment(p)) {
          const f = this.find(scope, p.name.text)
          out[p.name.text] = f.found
            ? f.value
            : await this.lookup(mod, p.name.text)
        }
      }
      return out
    }
    if (ts.isIdentifier(node)) {
      const f = this.find(scope, node.text)
      return f.found ? f.value : this.lookup(mod, node.text)
    }
    if (ts.isPropertyAccessExpression(node)) {
      const obj = await this.ev(node.expression, scope, mod)
      const name = node.name.text
      if (
        obj &&
        typeof obj === 'object' &&
        (obj as { kind?: string }).kind === 'enum'
      ) {
        const members = (obj as { members: Map<string, Value> }).members
        return members.has(name) ? members.get(name) : UNRESOLVED
      }
      if (obj && typeof obj === 'object' && name in (obj as object))
        return (obj as Record<string, Value>)[name]
      if (Array.isArray(obj) && name === 'length') return obj.length
      return obj === UNRESOLVED ? UNRESOLVED : undefined
    }
    if (ts.isBinaryExpression(node)) {
      const op = node.operatorToken.kind
      const l = await this.ev(node.left, scope, mod)
      if (op === ts.SyntaxKind.QuestionQuestionToken)
        return l === undefined || l === null
          ? this.ev(node.right, scope, mod)
          : l
      if (op === ts.SyntaxKind.BarBarToken)
        return l && l !== UNRESOLVED ? l : this.ev(node.right, scope, mod)
      const r = await this.ev(node.right, scope, mod)
      if (l === UNRESOLVED || r === UNRESOLVED) return UNRESOLVED
      switch (op) {
        case ts.SyntaxKind.EqualsEqualsEqualsToken:
          return l === r
        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
          return l !== r
        case ts.SyntaxKind.PlusToken:
          return (l as number) + (r as number)
        case ts.SyntaxKind.MinusToken:
          return (l as number) - (r as number)
        case ts.SyntaxKind.AsteriskToken:
          return (l as number) * (r as number)
        case ts.SyntaxKind.SlashToken:
          return (l as number) / (r as number)
        case ts.SyntaxKind.AmpersandAmpersandToken:
          return l && r
        default:
          return UNRESOLVED
      }
    }
    if (ts.isConditionalExpression(node)) {
      const c = await this.ev(node.condition, scope, mod)
      if (c === UNRESOLVED) return UNRESOLVED
      return this.ev(c ? node.whenTrue : node.whenFalse, scope, mod)
    }
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      return { kind: 'closure', node, scope, module: mod } as Closure
    }
    if (ts.isCallExpression(node)) {
      const args: Value[] = []
      for (const a of node.arguments) args.push(await this.ev(a, scope, mod))
      if (ts.isPropertyAccessExpression(node.expression)) {
        const target = await this.ev(node.expression.expression, scope, mod)
        const method = node.expression.name.text
        if (Array.isArray(target)) return this.arrayMethod(target, method, args)
        if (
          target &&
          typeof target === 'object' &&
          (target as Record<string, Value>)[method] !== undefined
        ) {
          return this.call((target as Record<string, Value>)[method], args)
        }
        if (
          node.expression.expression.getText(mod.source) === 'Object' &&
          method === 'fromEntries' &&
          Array.isArray(args[0])
        ) {
          return Object.fromEntries(args[0] as Array<[string, Value]>)
        }
        return UNRESOLVED
      }
      const fn = await this.ev(node.expression, scope, mod)
      const out = fn === UNRESOLVED ? UNRESOLVED : await this.call(fn, args)
      // A wrapper the evaluator cannot follow (block-bodied, side effects):
      // when its first argument is an indicator definition, that is the definition.
      if (
        out === UNRESOLVED &&
        args[0] &&
        typeof args[0] === 'object' &&
        Array.isArray((args[0] as Record<string, Value>).fields)
      ) {
        return args[0]
      }
      return out
    }
    return UNRESOLVED
  }

  private async arrayMethod(
    arr: Value[],
    method: string,
    args: Value[],
  ): Promise<Value> {
    const each = async (fn: Value) => {
      const out: Value[] = []
      for (let i = 0; i < arr.length; i++)
        out.push(await this.call(fn, [arr[i], i]))
      return out
    }
    switch (method) {
      case 'includes':
        return arr.includes(args[0])
      case 'filter': {
        const keep = await each(args[0])
        return arr.filter((_, i) => keep[i] === true)
      }
      case 'map':
        return each(args[0])
      case 'find': {
        const hit = await each(args[0])
        return arr.find((_, i) => hit[i] === true)
      }
      case 'some':
        return (await each(args[0])).some((x) => x === true)
      case 'concat':
        return arr.concat(...(args as Value[][]))
      case 'slice':
        return arr.slice(args[0] as number, args[1] as number | undefined)
      default:
        return UNRESOLVED
    }
  }
}

const isPlain = (v: Value) => v !== UNRESOLVED && v !== undefined

/**
 * The describe JSON for one catalog entry.
 * @param entryKey the IndicatorEnum KEY (e.g. `rsi`, `st`)
 */
export async function describeNative(
  reader: ModuleReader,
  entryKey: string,
): Promise<IndicatorSettings> {
  const ev = new CatalogEvaluator(reader)
  const mod = await ev.load(CATALOG_MODULE)
  const catalog = (await ev.lookup(mod, 'BASE_INDICATOR_CATALOG')) as
    | Record<string, Record<string, Value>>
    | typeof UNRESOLVED
  if (!catalog || catalog === UNRESOLVED)
    throw new Error(
      'BASE_INDICATOR_CATALOG could not be evaluated; update describeNative',
    )
  const enumMod = await ev.load(ENUM_MODULE)
  const members = enumMod.enums.get('IndicatorEnum')
  if (!members?.has(entryKey))
    throw new Error(`IndicatorEnum has no key "${entryKey}"`)
  const value = String(members.get(entryKey))
  const def = catalog[value]
  if (!def)
    throw new Error(
      `BASE_INDICATOR_CATALOG has no entry for IndicatorEnum.${entryKey}`,
    )
  const notes = [...ev.notes]
  const fields = Array.isArray(def.fields)
    ? (def.fields as Array<Record<string, Value>>)
    : []
  const inputs = fields
    .filter((f) => f && typeof f === 'object' && typeof f.key === 'string')
    .map((f) => {
      const options = Array.isArray(f.options)
        ? (f.options as Array<Record<string, Value>>).filter(
            (o) => o && typeof o === 'object',
          )
        : null
      const input: IndicatorSettings['inputs'][number] = {
        id: String(f.key),
        label: String(f.label ?? f.key),
        group: null,
        type: String(f.type ?? 'unknown'),
        default: isPlain(f.defaultValue) ? f.defaultValue : null,
        kind: 'logic',
        defaultText: '',
      }
      if (options?.length) {
        input.options = options.map((o) => o.value)
        input.optionLabels = options.map((o) => String(o.label ?? o.value))
      }
      for (const k of ['min', 'max', 'step', 'tooltip', 'suffix'] as const)
        if (isPlain(f[k])) (input as Record<string, Value>)[k] = f[k]
      for (const k of ['shownWhen', 'hiddenWhen'] as const)
        if (Array.isArray(f[k])) (input as Record<string, Value>)[k] = f[k]
      if (f.defaultValue === UNRESOLVED)
        notes.push(`${input.label}: the default is not a static value`)
      input.defaultText = defaultText(input)
      return input
    })
  return {
    schema: 'gainium.indicator-settings/1',
    source: 'gainium-catalog',
    indicator: {
      kind: 'native',
      title: String(def.label ?? value),
      shortTitle: isPlain(def.shortLabel) ? String(def.shortLabel) : null,
      author: 'Gainium',
      scriptId: value,
      version: null,
      overlay: null,
      openSource: null,
    },
    chart: null,
    inputs,
    plots: [],
    alertConditions: 'not applicable',
    notes,
  }
}

/** IndicatorEnum key for a page slug, via INDICATOR_DOCUMENTATION_URLS (the same map the catalog check reads). */
export async function catalogKeyForSlug(
  reader: ModuleReader,
  slug: string,
): Promise<string | null> {
  const catalog = await reader.read(CATALOG_MODULE)
  const enumSource = await reader.read(ENUM_MODULE)
  const parsed = parseCatalog(catalog, enumSource)
  for (const [value, s] of parsed.documentationSlugs) {
    if (s !== slug) continue
    for (const [key, v] of parsed.enumValues) if (v === value) return key
  }
  return parsed.enumValues.has(slug) ? slug : null
}
