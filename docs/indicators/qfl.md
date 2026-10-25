---
id: 54
name: Quickfingers Luc (QFL)
slug: qfl
description: >-
  Navigating the volatile crypto market requires not just intuition but a solid,
  well-defined strategy. Gainium understands that and is committed to empowering
  traders with robust methodologies for informed decision-making. The
  Quickfingers Luc (QFL) trading strategy is among the most revered, providing a
  structure to the seemingly random world of cryptocurrency price movements.
createdAt: '2023-01-07T06:50:03.182Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-01-07T07:06:46.161Z'
locale: en
categories:
  - technical-indicators
difficulty: advanced
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.023Z'
templateVersion: 2
tldr: >-
  QFL (Quickfingers Luc) is a dip-buying method: find a base, a low that
  price bounced away from, and buy when a panic sell-off cracks below it.
  Gainium's QFL Base Scanner takes the lowest low of the last 36 candles as a
  base once it has held for 8 candles, and fires when price has bounced at
  least 3% above the base and then trades 3% below it. All four numbers are
  settings. It pairs with DCA orders placed further below and a take profit
  near the base.
kind: native
catalogKeys:
  - QFL
category: structure
aliases:
  - "QFL"
  - "Quickfingers Luc"
  - "QuickFingers Luc"
  - "QFL Base Scanner"
  - "Base Cracking"
faq:
  - title: What is a base in QFL?
    details: >-
      A low that price bounced away from. In Gainium it is the lowest low of
      the last Base periods candles (36 by default) once no lower low has
      printed for the next Pump periods candles (8). The base stays until a
      newer one forms.
  - title: When does the QFL indicator fire?
    details: >-
      On a candle whose low is more than Base crack (3%) below the base,
      provided price rose more than Pump from base (3%) above the base after
      it formed. It is true on every candle that meets both conditions, so
      it can fire several bars in a row during a crash.
  - title: What crack percentage should I use?
    details: >-
      It depends on the pair's volatility and the interval. On BTC/USDT 4h the
      default 3% did not fire in the data behind this page: in the 4h chart
      below, the deepest fall under a base is about 0.7%. On 1h, a 1% crack
      does fire. For coins whose daily range is 5% or more, a crack of 5% or
      more keeps every ordinary dip from firing.
  - title: Who is Quickfingers Luc?
    details: >-
      A crypto trader who published the base-cracking method on his Steemit
      blog. Gainium's implementation follows the "QFL base scanner"
      TradingView script by rex_wolfe.
related:
  - support-resistance-indicator
  - long-wick-detector
  - ath-drawdown
sources:
  - title: Quickfingers Luc, Steemit blog
    url: https://steemit.com/@quickfingersluc
  - title: QFL methodology, compiled from Quickfingers Luc's posts
    url: https://docs.google.com/document/d/13iqxT63UqdkbTMmt6VRMlWPL7hb5bp5sk6IqkQhBm8M/edit
  - title: rex_wolfe, QFL base scanner, TradingView script
    url: https://www.tradingview.com/script/PIFGdVsZ-QFL-base-scanner/
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

QFL (Quickfingers Luc) is a dip-buying method: mark a base, a low that price bounced away from, and buy when a panic sell-off cracks below it. Bot traders run it on DCA bots, with the first order at the crack and safety orders further down.

## What is QFL

The method comes from the trader Quickfingers Luc, who described it on his Steemit blog. Its premise is that a base that held once is where buyers return, and a fast fall through it is panic selling that tends to bounce. Gainium's QFL Base Scanner follows rex_wolfe's "QFL base scanner" TradingView script:

- **Base:** the lowest low of the last **Base periods** candles (36), once no lower low has printed for **Pump periods** candles (8) after it. It stays until a newer base forms.
- **Pump:** after the base forms, the highest high must rise more than **Pump from base** (3%) above it. A base that price never left is not a QFL base.
- **Crack:** the signal fires on a candle whose low is more than **Base crack** (3%) below the base.

The signal is true on every candle that meets both conditions, so in a crash that keeps going it fires several bars in a row.

On the bot chart the base is a blue line, with a dotted connector where it steps to a new base.

![Gainium bot chart, BTC/USDT 1h, QFL Base Scanner with defaults: the blue base line near 80,570, stepping up to about 80,790, then down to 80,450 and to 79,175 at the right edge](https://content.gainium.io/images/content/indicators/qfl__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Base periods | 36 | Candles searched for the lowest low that can become a base. More periods give more significant bases and fewer entries. |
| Pump periods | 8 | Candles a low must hold to become a base. A value at or above Base periods is cut to Base periods minus 1. |
| Pump from base (%) | 3 | How far, in percent, the high must rise above the base after it forms. |
| Base crack (%) | 3 | How far, in percent, a candle's low must fall below the base to fire. |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the 3% defaults did not fire once on BTC/USDT 1h or 4h in the data behind this page. Base crack 1 fires on a few dips, about as many on 4h as on 1h. Pump from base 1 with Base crack 1 fires on nearly three times as many dips on 1h as Base crack 1 alone.

**Tip:** the signal stays true on every candle whose low is past the Base crack line, even with Keep true 0. In the Base crack 1 test above, each dip made about 4 true candles, so cap the bot's active deals or one crash opens several deals.

## Trading setups for bots

### Classic base crack on 4h

- **Entry:** Deal start condition QFL Base Scanner with Base periods 36, Pump periods 8, Pump from base 3%, Base crack 3%, 4 hours.
- **Exit:** take profit 3%, about back to the base. DCA orders at 2%, 4% and 6% below the start order catch a crack that keeps going.
- **Settings:** Keep true 0. On coins whose daily range is 5% or more, raise Base crack to 5% or more.
- **Timeframe:** 4h. The 36 candles of the base then cover four times as much of the chart as on 1h.
- **When it fails:** in a trend change. A crack below a 4h base can be the start of a downtrend, and the DCA orders fill into it. In the chart below, the 3% crack never came: the deepest fall under the base was about 0.7%, so the bot stayed out.

![Annotated Gainium bot chart, BTC/USDT 4h, QFL defaults on 4h: an earlier base at 80,350, the current base at 79,750, and the last low only 0.7% under it, short of the 3% crack at 77,357](https://content.gainium.io/images/content/indicators/qfl__base-crack-4h.webp)

### Tight crack on 1h for BTC

- **Entry:** QFL Base Scanner with Pump from base **1%** and Base crack **1%**, 1 hour.
- **Exit:** take profit 1.5%, with DCA orders at 1% steps.
- **Settings:** Base periods 36, Pump periods 8, Keep true 0.
- **Timeframe:** 1h, on BTC or ETH. On smaller coins 1% is noise.
- **When it fails:** when the 1% crack is the start of a larger fall. In the chart below, the low reached 1.6% under the 80,450 base before turning up; a deeper fall would have filled every DCA order.

![Annotated Gainium bot chart, BTC/USDT 1h, QFL with Pump and Base crack at 1%: the 80,450 base, the 1% crack line at 79,646, and the last low 1.6% under the base](https://content.gainium.io/images/content/indicators/qfl__tight-crack-1h.webp)

## Using QFL in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **QFL Base Scanner** from the Chart category.

![QFL Base Scanner settings card in the Gainium bot form with Pump from base 3% and Base crack 3% ringed, Base periods 36, Pump periods 8, Interval 1 hour, Keep true 0](https://content.gainium.io/images/content/indicators/qfl__settings.webp)

The fields and their defaults:

- **Base periods:** 36, from 1 to 500. More periods give more significant bases and fewer entries.
- **Pump periods:** 8, from 1 to 200. The candles a low must hold to become a base. If it is not below Base periods, it is set to Base periods minus 1.
- **Pump from base (%):** 3. How far price must rise above the base after it forms.
- **Base crack (%):** 3. How far a candle's low must fall below the base to fire.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Keep true:** 0 extra bars.

QFL is one of the indicators a [Risk:Reward](https://gainium.io/help/risk-reward) bot can use to place its stop loss.

**Example configuration** (the 4h base crack above): Deal start condition Indicators, QFL Base Scanner with Base periods 36, Pump periods 8, Pump from base 3%, Base crack 3%, Interval 4 hours, Keep true 0. Take profit 3%, DCA orders at 2%, 4% and 6% below the start.

## Related indicators

- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): the pivot version of a base; crossing down support is the same event read as a breakdown.
- [Long Wick Detector](https://gainium.io/indicators/long-wick-detector): a long lower wick through a base is the panic QFL looks for.
- [ATH Drawdown](https://gainium.io/indicators/ath-drawdown): keeps QFL bots out of a coin that is already 50% below its high.

## FAQ

### What is a base in QFL?

A low that price bounced away from. In Gainium it is the lowest low of the last Base periods candles (36 by default) once no lower low has printed for the next Pump periods candles (8). The base stays until a newer one forms.

### When does the QFL indicator fire?

On a candle whose low is more than Base crack (3%) below the base, provided price rose more than Pump from base (3%) above the base after it formed. It is true on every candle that meets both conditions, so it can fire several bars in a row during a crash.

### What crack percentage should I use?

It depends on the pair's volatility and the interval. On BTC/USDT 4h the default 3% did not fire in the data behind this page: in the 4h chart below, the deepest fall under a base is about 0.7%. On 1h, a 1% crack does fire. For coins whose daily range is 5% or more, a crack of 5% or more keeps every ordinary dip from firing.

### Who is Quickfingers Luc?

A crypto trader who published the base-cracking method on his Steemit blog. Gainium's implementation follows the "QFL base scanner" TradingView script by rex_wolfe.
