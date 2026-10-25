---
id: 128
name: Market Structure Indicator
slug: market-structure
description: >-
  Learn how to use the Market Structure Indicator in Gainium for automated
  trading, detecting trend reversals, breakouts, and market shifts with event,
  market, or price triggers.
createdAt: '2024-10-07T04:22:04.612Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-07T04:22:07.958Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.015Z'
templateVersion: 2
tldr: >-
  Market Structure labels swing highs and lows and fires when the close breaks
  one. A break in the direction of the trend is a break of structure (BOS); a
  break against it is a change of character (CHoCH). Gainium tracks swing
  structure on 50-bar swings and internal structure on 5-bar swings, and
  offers three trigger types: Event Based (BOS or CHoCH on the bar it
  happens), Market Based (bullish or bearish since the last swing CHoCH) and
  Price Based (the close crossing the latest pivot high or low). The default
  is Price Based, Any Pivot Low, Crossing down, on 1-hour candles.
kind: native
catalogKeys:
  - PP
category: structure
aliases:
  - "Market Structure"
  - "BOS"
  - "CHoCH"
  - "Break of Structure"
  - "Change of Character"
  - "Pivot Points"
faq:
  - title: What is the difference between BOS and CHoCH?
    details: >-
      Both are the close crossing the latest swing high or low. A BOS goes the
      same way as the current trend, for example a new high in an uptrend. A
      CHoCH goes against it: the first close above a swing high after a
      downtrend, or below a swing low after an uptrend.
  - title: What is the difference between swing and internal structure?
    details: >-
      Swing structure is built from 50-bar swings, so a swing high needs 50
      lower highs after it before it counts. Internal structure uses 5-bar
      swings and reacts to much smaller moves. On BTC/USDT 1h, internal
      structure prints several signals for each swing-structure CHoCH.
  - title: Does the Market Structure indicator repaint?
    details: >-
      No. A swing point is only used once the bars to its right have closed,
      and the BOS or CHoCH fires on the bar whose close breaks it. The price
      for that delay is lag: a swing high is confirmed 50 bars late on swing
      structure and 5 bars late on internal structure.
  - title: Can I set the swing length?
    details: >-
      Not for Event Based and Market Based triggers: they use 50-bar swings
      and 5-bar swings, fixed. Price Based triggers use pivots, and there you
      set the left and right bars of pivot highs and lows, 5 each by default.
  - title: What does the Multiplier do?
    details: >-
      It only applies to Price Based triggers. The engine multiplies the pivot
      price by it before comparing it with the close, so the default of 1
      compares the close with the pivot itself. Leave it at 1 unless you want
      the level moved by a fixed factor.
related:
  - fair-value-gap
  - discount-premium-ote-levels
  - support-resistance-indicator
sources:
  - title: LuxAlgo, Smart Money Concepts (SMC), TradingView script (swing and internal structure, BOS and CHoCH)
    url: https://www.tradingview.com/script/CnB3fSph-Smart-Money-Concepts-SMC-LuxAlgo/
  - title: Gainium, Risk:Reward
    url: https://gainium.io/help/risk-reward
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Market Structure marks swing highs and lows on the chart and fires when a candle closes beyond one. A close through a swing high in an uptrend is a break of structure (BOS); the first close against the trend is a change of character (CHoCH). Bot traders use a CHoCH to time a reversal entry, a BOS to add to a trend, and the bullish or bearish state as a filter.

## What is Market Structure

Market structure is the price-action way of reading trend: an uptrend makes higher highs (HH) and higher lows (HL), a downtrend makes lower highs (LH) and lower lows (LL). The BOS and CHoCH vocabulary comes from smart money concepts (SMC). Gainium's version follows the swing logic of LuxAlgo's open-source Smart Money Concepts script.

Gainium tracks structure on two scales:

- **Swing structure** uses 50-bar swings. A bar's high is a swing high when it is above every high of the 50 bars that follow it, so a swing is confirmed 50 bars after it prints.
- **Internal structure** uses 5-bar swings, found the same way, and reacts to moves a tenth that size.

On each scale the rules are:

- **Bullish BOS:** the close crosses above the latest swing high while the trend is up (or not yet set).
- **Bullish CHoCH:** the close crosses above the latest swing high while the trend is down. The trend flips to up.
- **Bearish BOS and CHoCH:** the same with the close crossing below the latest swing low.

A level fires once: after a break, the next signal needs a new swing. **Bullish Market Structure** holds from a swing bullish CHoCH until the next swing bearish CHoCH, and the reverse for bearish. Before the first swing CHoCH on the chart there is no market state, so both Market Based options are false.

Price Based triggers use a second set of points: pivots with 5 bars on each side by default. A pivot high is labelled HH if it is above the previous pivot high and LH if it is below; pivot lows are HL or LL. The latest pivot of each kind stays as a level until a new pivot replaces it.

![Gainium bot chart, BTC/USDT 1h, with Market Structure on Price Based defaults: green HL and red LL labels under the pivot lows and dotted lines at each pivot level](https://content.gainium.io/images/content/indicators/market-structure__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Trigger type | Price Based | Event Based fires on a break of structure or change of character; Market Based is true while the swing structure is bullish or bearish; Price Based compares the close with the latest pivot. |
| Structure signal | Any Pivot Low | The event, market state or pivot the condition reads. The list depends on Trigger type. |
| High left bars | 5 | Bars before a pivot high that must have lower highs. Price Based only. |
| High right bars | 5 | Bars after a pivot high that must have lower highs; the pivot is confirmed this many bars late. Price Based only. |
| Low left bars | 5 | Bars before a pivot low that must have higher lows. Price Based only. |
| Low right bars | 5 | Bars after a pivot low that must have higher lows; the pivot is confirmed this many bars late. Price Based only. |
| Multiplier | 1 | Scales the pivot price before the comparison: 0.99 puts the level 1% under the pivot. Price Based only. |
| Condition | Crossing down | How the close is compared with the pivot level: Crossing down, Crossing up, Greater than or Lower than. Price Based only. |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the left and right bars only change Price Based signals. Event Based and Market Based use fixed 5-bar internal and 50-bar swing pivots: Internal Bullish Change of Character fires exactly as often on BTC/USDT 1h with 5 bars as with 20.

**Tip:** in Price Based mode, more bars mean fewer, older levels. On BTC/USDT 1h, Any Pivot Low with Crossing down fires about a fifth less often with 10 left and right bars than with 5, and about half as often with 20.

**Tip:** Multiplier 0.99 waits for a close 1% under the pivot low instead of any close under it. On BTC/USDT 1h that cut Any Pivot Low crossings to about a third; 1.01 roughly doubled them.

## Trading setups for bots

### Internal bullish CHoCH entry on 4h

- **Entry:** Deal start condition Market Structure, Event Based, **Internal Bullish Change of Character**, 4 hours.
- **Exit:** take profit 2.5%, or a second condition on **Internal Bearish Change of Character** set as the close condition.
- **Settings:** Keep true 0. Add a stop loss of about 3%, below the internal swing low the CHoCH came from.
- **Timeframe:** 4h. On 1h the 5-bar internal swings are small and the signal reverses more often.
- **When it fails:** in a range. In the chart below, the first CHoCH fired near 83,000; price stalled under 84,000 and then fell about 4%.

![Annotated Gainium bot chart, BTC/USDT 4h, internal structure: a first bullish CHoCH that failed, then a bullish CHoCH near 81,900 that led to a BOS near 83,300 and a high of 84,880](https://content.gainium.io/images/content/indicators/market-structure__internal-choch.webp)

### Internal bearish CHoCH as the exit

- **Entry:** any long entry, for example the 4h CHoCH above.
- **Exit:** close condition Market Structure, Event Based, **Internal Bearish Change of Character**, 1 hour.
- **Settings:** take profit off or wide (5% or more), so the structure condition closes the deal. Keep true 0.
- **Timeframe:** exit one step below the entry timeframe: 1h exits for 4h entries.
- **When it fails:** in a fast drop. The internal swing low is up to 5 bars old, so the exit can land 2–4% under the top, as in the chart below.

![Annotated Gainium bot chart, BTC/USDT 1h, internal structure: the top at 84,800 and the internal bearish CHoCH near 82,200 that closes the long about 3% lower](https://content.gainium.io/images/content/indicators/market-structure__internal-bearish-exit.webp)

### Bullish market structure as a filter

- **Entry:** your usual entry indicator (an RSI dip, for example) in an AND group with Market Structure, **Market Based**, **Bullish Market Structure**, 1 hour.
- **Exit:** the bot's normal take profit. The filter only blocks new deals.
- **Settings:** Market Based ignores the pivot bars and the Multiplier.
- **Timeframe:** 1h or 4h. The filter changes only on a swing CHoCH, so on BTC/USDT 1h it flips far less often than internal structure signals fire.
- **When it fails:** at the turn. The state flips only on a swing CHoCH, which needs a 50-bar swing low to break. Below, the filter stayed bullish through a 4.5% drop from 84,800.

![Annotated Gainium bot chart, BTC/USDT 1h, Market Based trigger: the green shaded Bullish Market Structure period from a swing bullish CHoCH to a swing bearish CHoCH, through a 4.5% drop](https://content.gainium.io/images/content/indicators/market-structure__bullish-market-filter.webp)

## Using Market Structure in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **Market Structure** from the Chart category.

![Market Structure settings card in the Gainium bot form with Trigger type Event Based and Structure signal Internal Bullish Change of Character ringed, Interval 4 hours, Keep true 0](https://content.gainium.io/images/content/indicators/market-structure__settings.webp)

The fields and their defaults:

- **Trigger type:** Price Based. The options are Event Based, Market Based and Price Based.
- **Structure signal:** Any Pivot Low. The list depends on the trigger type:
  - Event Based: Swing or Internal, Bullish or Bearish, Break of Structure or Change of Character, plus Swing Any Bullish/Bearish, Internal Any Bullish/Bearish, and Any Bullish/Bearish Break of Structure or Change of Character (swing or internal).
  - Market Based: Bullish Market Structure, Bearish Market Structure.
  - Price Based: Higher High, Lower High, Higher Low, Lower Low, Any Pivot High, Any Pivot Low.
- **High left bars / High right bars:** 5 each. Shown for pivot-high signals.
- **Low left bars / Low right bars:** 5 each. Shown for pivot-low signals. A pivot is confirmed after its right bars close.
- **Multiplier:** 1. Price Based only. The pivot price is multiplied by it before the comparison.
- **Condition:** Crossing down. Price Based only: Crossing down, Crossing up, Greater than, Lower than, comparing the close with the pivot level.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Keep true:** 0 extra bars.

Market Structure can also place the stop loss of a [Risk:Reward](https://gainium.io/help/risk-reward) bot at a structure low.

**Example configuration** (the first setup): Deal start condition Indicators, Market Structure with Trigger type Event Based, Structure signal Internal Bullish Change of Character, Interval 4 hours, Keep true 0. Take profit 2.5%, stop loss 3%.

## Related indicators

- [Fair Value Gap](https://gainium.io/indicators/fair-value-gap): the gaps a BOS leaves behind are where pullback entries go.
- [Discount/Premium OTE Levels](https://gainium.io/indicators/discount-premium-ote-levels): measures the pullback into the leg that a BOS extended.
- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): the same pivot idea with 15-bar pivots and a plain level cross.
