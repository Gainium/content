---
id: 78
name: Support and Resistance Indicator
slug: support-resistance-indicator
description: >-
  In this article, we explain what is the Support Resistance indicator and how
  it can be used in bot trading.
createdAt: '2023-04-14T16:14:20.777Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-15T03:56:43.227Z'
locale: en
categories:
  - technical-indicators
difficulty: advanced
tags:
  - indicator
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.026Z'
templateVersion: 2
tldr: >-
  The Support & Resistance indicator draws the latest pivot high as resistance
  and the latest pivot low as support. A pivot needs 15 bars on each side by
  default, so a level appears 15 bars after the turn and stays until a newer
  pivot replaces it. A bot condition fires when the close crosses up or down
  through either level: crossing up resistance for breakout entries, crossing
  down support for exits and stop losses.
kind: native
catalogKeys:
  - SR
category: structure
aliases:
  - "S/R"
  - "Support and Resistance"
  - "Support & Resistance"
faq:
  - title: How does Gainium calculate support and resistance?
    details: >-
      From pivots. Resistance is the latest bar whose high is above the highs
      of the 15 bars before it and the 15 bars after it. Support is the latest
      bar whose low is below the lows of the same window. Each level stays
      until a newer pivot replaces it.
  - title: Why does a level appear late on the chart?
    details: >-
      A pivot is only confirmed once its right bars have closed. With Right
      bars 15, a new level appears 15 bars after the high or low that made it,
      on any interval. Lower Right bars to see levels sooner; they will be
      weaker turns.
  - title: Which condition should I use for a breakout?
    details: >-
      Price crossing up with Value Resistance. It fires on the candle whose
      close moves from at or below the resistance level to above it. For a
      breakdown, use Price crossing down with Value Support.
  - title: Can I use support as a stop loss?
    details: >-
      Yes, two ways. Set the stop loss type to Indicators with Price crossing
      down Support, or use Support & Resistance in a Risk:Reward bot, which
      places the stop at the support level and sizes the position from it.
related:
  - market-structure
  - long-wick-detector
  - qfl
sources:
  - title: LuxAlgo, Support and Resistance Levels with Breaks, TradingView script (pivot levels with 15 left and right bars)
    url: https://www.tradingview.com/script/JDFoWQbL-Support-and-Resistance-Levels-with-Breaks-LuxAlgo/
  - title: Gainium, Risk:Reward
    url: https://gainium.io/help/risk-reward
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Support & Resistance indicator draws the latest pivot high as resistance and the latest pivot low as support. Traders use it to start a deal when the close breaks above resistance, and to close one when the close breaks below support.

## What is Support and Resistance

Support is a price where falling price turned up; resistance is a price where rising price turned down. Gainium finds them with pivots, the method of LuxAlgo's open-source "Support and Resistance Levels with Breaks" script:

- **Resistance:** the latest bar whose high is above the highs of the **Left bars** before it and the **Right bars** after it.
- **Support:** the latest bar whose low is below the lows of the same window.

Both windows are 15 bars by default. A pivot is confirmed only after its right bars close, so a level appears 15 bars after the turn. Each level holds its price until a newer pivot of the same kind replaces it. The chart shows the step: a dotted connector joins the old level to the new one.

The bot condition compares the candle close with a level. **Price crossing up** fires when the close goes from at or below the level to above it. **Price crossing down** fires on the reverse. Raising both bar counts to 30 keeps only turns that held for 30 bars each side; lowering them to 5 adds a level at most small swings.

![Gainium bot chart, BTC/USDT 4h, with Support & Resistance 15/15: the red resistance line stepping from 87,200 to 84,400 to 84,880 and the blue support line stepping between 82,400 and 79,750](https://content.gainium.io/images/content/indicators/support-resistance-indicator__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Condition | Price crossing down | Price crossing up: the previous close at or below the level and the latest close above it. Price crossing down is the reverse. |
| Value | Resistance | The level: Resistance, the latest pivot high, or Support, the latest pivot low. |
| Left bars | 15 | Bars before a pivot that it must stand out from. From 1 to 200. |
| Right bars | 15 | Bars after a pivot that it must stand out from. A new level appears this many bars late. From 1 to 200. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** Left and Right bars set how many levels you get. On BTC/USDT 1h, Price crossing up Resistance fires about twice as often with 5 bars on each side as with 15, and 30 bars halves it again. On 4h, 5 bars gives nearly three times as many breakouts as 15, and 30 gives slightly fewer than 15.

**Tip:** Right bars alone sets the delay. Left bars 15 with Right bars 5 confirms a level 5 bars after the turn instead of 15, and gives about 40% more breakouts on BTC/USDT 1h.

**Tip:** the default pair, Price crossing down Resistance, is not a breakout: it fires when price falls back under the latest high. On BTC/USDT 1h it fires about three quarters as often as the crossing up breakout.

## Trading setups for bots

### Resistance breakout on 1h

- **Entry:** Deal start condition Support & Resistance, **Price crossing up**, Value **Resistance**, 1 hour.
- **Exit:** take profit 1.5%, with a stop loss of 1.5–2% under the entry.
- **Settings:** Left bars 15, Right bars 15, Keep true 0.
- **Timeframe:** 1h. On 15m the 15-bar pivots are a quarter as wide as on 1h and catch small swings.
- **When it fails:** when the breakout reverses soon after. In the chart below, the close above 83,350 ran 1.7% to 84,880 and then gave all of it back.

![Annotated Gainium bot chart, BTC/USDT 1h: the close above the red resistance near 83,350 that starts the deal, and the top 1.7% higher at 84,880](https://content.gainium.io/images/content/indicators/support-resistance-indicator__breakout.webp)

### Support break as the exit

- **Entry:** any long entry.
- **Exit:** close condition (or stop loss type Indicators) Support & Resistance, **Price crossing down**, Value **Support**, 4 hours.
- **Settings:** Left bars 15, Right bars 15. On 4h the support is a low that held for 15 bars on each side, four times wider than the same setting on 1h.
- **Timeframe:** 4h exits for 1h or 4h entries.
- **When it fails:** on a wick through support. The condition reads closes, but a long-wick candle can close under the level and recover on the next bar, as at the right edge of the chart below.

![Annotated Gainium bot chart, BTC/USDT 4h: the 4h close below the blue support near 82,450 that closes the deal, and the same signal later at 80,600 before price recovered](https://content.gainium.io/images/content/indicators/support-resistance-indicator__support-break.webp)

## Using Support and Resistance in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **Support & Resistance** from the Chart category.

![Support & Resistance settings card in the Gainium bot form with Condition Price crossing up and Value Resistance ringed, Interval 4 hours, Left bars 15, Right bars 15, Keep true 0](https://content.gainium.io/images/content/indicators/support-resistance-indicator__settings.webp)

The fields and their defaults:

- **Interval:** 1 hour, from 1 minute to 1 week.
- **Condition:** Price crossing down. The other option is Price crossing up.
- **Value:** Resistance. The other option is Support. The default pair, crossing down resistance, fires when price falls back under a high; for a breakout, change it to crossing up.
- **Left bars:** 15, from 1 to 200.
- **Right bars:** 15, from 1 to 200. This is also how many bars late a new level appears.
- **Keep true:** 0 extra bars.

Support & Resistance is one of the indicators a [Risk:Reward](https://gainium.io/help/risk-reward) bot can use to place its stop loss at a support level and size the position from it.

**Example configuration** (the breakout above): Deal start condition Indicators, Support & Resistance with Interval 1 hour, Condition Price crossing up, Value Resistance, Left bars 15, Right bars 15, Keep true 0. Take profit 1.5%, stop loss 2%.

## Related indicators

- [Market Structure](https://gainium.io/indicators/market-structure): the same pivot levels, labelled HH/HL/LH/LL, plus BOS and CHoCH events.
- [Long Wick Detector](https://gainium.io/indicators/long-wick-detector): levels from rejection wicks instead of pivots, removed once a body closes through them.
- [QFL](https://gainium.io/indicators/qfl): buys a fall below a support base instead of selling it.

## FAQ

### How does Gainium calculate support and resistance?

From pivots. Resistance is the latest bar whose high is above the highs of the 15 bars before it and the 15 bars after it. Support is the latest bar whose low is below the lows of the same window. Each level stays until a newer pivot replaces it.

### Why does a level appear late on the chart?

A pivot is only confirmed once its right bars have closed. With Right bars 15, a new level appears 15 bars after the high or low that made it, on any interval. Lower Right bars to see levels sooner; they will be weaker turns.

### Which condition should I use for a breakout?

Price crossing up with Value Resistance. It fires on the candle whose close moves from at or below the resistance level to above it. For a breakdown, use Price crossing down with Value Support.

### Can I use support as a stop loss?

Yes, two ways. Set the stop loss type to Indicators with Price crossing down Support, or use Support & Resistance in a Risk:Reward bot, which places the stop at the support level and sizes the position from it.
