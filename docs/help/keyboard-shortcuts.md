---
id: 1040
name: Keyboard Shortcuts
slug: keyboard-shortcuts
description: >-
  Navigate Gainium faster with keyboard shortcuts. Full reference of default
  shortcuts, plus how to rebind keys, create custom shortcuts, and manage
  hints in the Shortcut Manager.
createdAt: '2026-07-23T09:00:00.000Z'
updatedAt: '2026-07-23T09:00:00.000Z'
publishedAt: '2026-07-23T09:00:00.000Z'
locale: en
categories:
  - platform
difficulty: beginner
tags: []
tldr: >-
  Gainium includes keyboard shortcuts for navigation, panels, and common
  actions — press ⌘/ (Mac) or Ctrl+/ (Windows) to open the Shortcut Manager.
  There you can rebind any shortcut, create custom shortcuts that jump to any
  page, assign keys to your dashboards, reset everything to defaults, and turn
  off shortcut hint messages.
---

Keyboard shortcuts let you move around Gainium and trigger common actions without touching the mouse. Every shortcut is customizable: you can rebind keys, remove shortcuts you don't want, and add your own shortcuts that jump straight to any page in the app.

## Opening the Shortcut Manager

There are three ways to open it:

- Press **⌘ /** (Mac) or **Ctrl + /** (Windows/Linux).
- Click your profile menu in the top navigation bar and choose **Shortcuts**.
- Go to **Settings → Shortcuts** for the same list embedded in the settings page.

The manager shows all shortcuts grouped by category, with a search box that filters by name, category, or page.

**Mac vs. Windows:** shortcuts shown with **⌘** on Mac use **Ctrl** on Windows and Linux. Single-letter shortcuts are the same everywhere.

## Default shortcut reference

### Managers

| Action | Shortcut |
| --- | --- |
| Dashboard Manager | ⌘/Ctrl + D |
| Shortcut Manager | ⌘/Ctrl + / |
| Global Search | ⌘/Ctrl + . |

### Actions

| Action | Shortcut |
| --- | --- |
| Notifications panel | ⌘/Ctrl + I |
| AI Chat | ⌘/Ctrl + K |
| Toggle trading mode (paper/live) | ⌘/Ctrl + E |

### Panels

These progressively expand or collapse the side and bottom panels on pages that have them (for example, the bot editing views).

| Action | Shortcut |
| --- | --- |
| Push content left (expand right panel) | Alt + ← |
| Push content right (collapse right panel) | Alt + → |
| Push content up (expand bottom panel) | Alt + ↑ |
| Push content down (collapse bottom panel) | Alt + ↓ |

### Navigation

Single letters, no modifier needed. If you're already on the page, pressing its shortcut reloads it.

| Page | Shortcut |
| --- | --- |
| Trading Terminal | T |
| Dashboard | D |
| Overview | O |
| DCA Bots | B |
| Combo Bots | C |
| Grid Bots | G |
| Hedge DCA Bots | H |
| Hedge Combo Bots | W |
| Rulebooks | R |
| Manual Backtesting Sessions | M |
| Settings | S |
| Portfolio | P |
| Trades | X |
| Trade Journal | J |
| Reports | Q |
| Exchanges | E |

### Creating new bots

Shift plus the bot type's navigation letter — no shift to browse, shift to create.

| Action | Shortcut |
| --- | --- |
| New DCA Bot | Shift + B |
| New Combo Bot | Shift + C |
| New Grid Bot | Shift + G |
| New Hedge DCA Bot | Shift + H |
| New Hedge Combo Bot | Shift + W |

### Dashboards

Each dashboard you create gets its own entry in the **Dashboards** category, with no key assigned by default. Record a key for a dashboard (in the Shortcut Manager or in the Dashboard Manager) and you can jump straight to it from anywhere.

### Templates

When you save a bot template, you can optionally assign it a hotkey. Pressing that hotkey while creating a bot loads the template into the form. Template hotkeys appear under the **Templates** category, and deleting one there just clears the hotkey — the template itself is not deleted.

## Customizing shortcuts

### Rebinding a key

1. Open the Shortcut Manager and find the shortcut (use the search box if needed).
2. Click the **cog icon** next to it — the row starts recording.
3. Press the key combination you want. It's saved immediately.
4. Press **Escape** (or click elsewhere) to cancel recording.

If the combination is already used by another shortcut, you'll see a warning and the old binding is kept — pick a different combination or free up the conflicting one first.

**Tip:** avoid combinations your browser or operating system already reserves (like ⌘/Ctrl + W to close a tab) — the browser may act on them before Gainium can.

### Custom shortcuts

At the bottom of the list, the **Custom shortcuts** section lets you create your own navigation shortcuts:

1. Enter a **name** for the shortcut.
2. Enter the **path** of the page inside Gainium it should open — for example `/portfolio` or `/bot/new`. The easiest way to find a path is to open that page and copy everything after `app.gainium.io` from the address bar. The path must start with `/`.
3. Click the **cog icon** and press the key combination you want.
4. Click **Add**.

Custom shortcuts work anywhere in the app, just like the built-in ones.

### Removing and restoring shortcuts

- The **trash icon** removes a shortcut. Built-in shortcuts can be brought back later with the reset button; custom shortcuts are deleted permanently.
- The **reset icon** on a row restores that shortcut's default key. For dashboard shortcuts (which have no default), reset clears the key instead.
- **Reset all** restores every shortcut to its default key and re-enables any built-in shortcuts you removed. Dashboard shortcuts stay unassigned.

## Shortcut hints

When you use the mouse for something that has a keyboard shortcut — for example opening notifications from the bell icon — Gainium occasionally shows a small message like *"Next time, press ⌘I"*. These hints appear at most once every few minutes per feature.

If you'd rather not see them, turn on **Disable shortcut hints** at the top of the Shortcut Manager (also available in **Settings → Shortcuts**).

## Good to know

- Shortcuts don't fire while you're typing in a text field, so single-letter shortcuts won't interfere with search boxes or forms. The only exceptions are Global Search and AI Chat, which can also be closed with their shortcut while typing in them.
- Shortcuts are saved in your browser, so they apply per device.
- Higher-priority shortcuts win: if a page-specific shortcut and a global one share a key, only one runs.
