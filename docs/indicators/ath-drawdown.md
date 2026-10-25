---
id: 127
name: All Time High (ATH) Drawdown Indicator
slug: ath-drawdown
description: >-
  Use ATH Drawdown in Gainium to avoid long trades near all-time highs and short
  trades when the price is too low. Learn to configure it with effective
  strategies.
createdAt: '2024-10-07T03:57:14.882Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-07T03:57:16.632Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:29.989Z'
templateVersion: 2
tldr: >-
  ATH Drawdown is how far the current candle's low sits below the highest high
  of the last Lookback candles, in percent: 0 at the high, -25 when price is
  25% under it. In Gainium you type the Value as a positive number, so Lower
  than 10 means more than 10% below the high and Greater than 10 means within
  10% of it. The defaults are Lookback 100, 1-hour candles, Crossing down,
  Value 10. Long bots use it to skip entries near the top; short bots use it
  to skip entries after a deep fall.
kind: native
catalogKeys:
  - ATH
category: volatility
aliases:
  - "ATH Drawdown"
  - "All Time High Drawdown"
  - "ATH DD"
faq:
  - title: Is it the real all-time high?
    details: >-
      No. It is the highest high of the last Lookback candles: 100 by default.
      On 1-day candles that is the highest high of the last 100 daily candles.
      For a longer memory, raise Lookback or use a longer interval.
  - title: Why is the drawdown negative but the Value positive?
    details: >-
      The indicator plots 0 at the high and negative numbers below it. The
      Value field takes the distance as a positive percentage, and the engine
      compares the drawdown with minus that number. Value 10 is the -10 line.
      With Between, Upper value is read the same way.
  - title: What do Lower than and Greater than mean here?
    details: >-
      Lower than 10 is true when the low is more than 10% below the high.
      Greater than 10 is true when it is within 10% of the high. Crossing
      down 10 fires when price falls through the 10% line, crossing up when
      it climbs back above it.
  - title: Does it use the close or the low?
    details: >-
      The current candle's low, divided by the highest high of the lookback.
      A long lower wick can make the condition true for one candle even if
      the close is back above the line.
related:
  - qfl
  - price-change-indicator
  - moving-averages
sources:
  - title: Investopedia, Drawdown
    url: https://www.investopedia.com/terms/d/drawdown.asp
  - title: Binance BTC/USDT 1h and 1d candles, computed with Gainium's indicator engine
---

ATH Drawdown is how far the current price sits below the highest high of the last Lookback candles, in percent. Traders use it as a filter: long bots skip entries within a few percent of the high, and short bots skip entries after price has already fallen far.

## What is ATH Drawdown

Drawdown is the fall from a peak. Gainium's ATH Drawdown measures it from a rolling high, not the coin's lifetime high:

**Drawdown = (current low ÷ highest high of the last Lookback candles − 1) × 100**

- **Current low:** the low of the latest candle.
- **Highest high:** the highest high of the last **Lookback** candles, 100 by default, including the current one.

The result is 0 when the low touches the high and negative below it: -25 means the low is 25% under the 100-candle high. Lookback counts candles of the chosen interval, so 100 candles on 1h cover a far shorter stretch of the chart than 100 candles on 1 day.

You type **Value** as a positive number. The engine compares the drawdown with minus that number, so Value 10 is the -10 line:

- **Lower than 10:** more than 10% below the high.
- **Greater than 10:** within 10% of the high.
- **Crossing down 10:** price falls through the 10% line.
- **Crossing up 10:** price climbs back within 10% of the high.

On the bot chart, ATH Drawdown has its own pane from 0 down to -100, with a dotted line at the condition's level.

![Gainium bot chart, BTC/USDT 1-day, with ATH Drawdown 100: price rising from 62,000 to 87,000 above, and the drawdown pane below moving from about -23 at the left to between 0 and about -10 for the rest of the chart](https://content.gainium.io/images/content/indicators/ath-drawdown__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Lookback | 100 | Candles the highest high is taken from, the current one included. |
| Interval | 1 hour | The candle size the indicator is calculated on, from 1 minute to 1 week. |
| Condition | Crossing down | How the drawdown is compared with the level: Crossing down, Crossing up, Greater than, Lower than, or Between Value and Upper value. |
| Value | 10 | Percent below the high, typed as a positive number. The engine compares the drawdown with minus this number. |
| Upper value | — | Between: the other end of the range, also typed as a positive percentage below the high. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the engine compares the drawdown with minus Value, so Value 10 and Value −10 are the same −10 line. On BTC/USDT 1d with Lookback 100, Lower than 10 was true on about a third of the candles in the chart above.

**Tip:** with Between, type both bounds as percentages below the high. Value 10 and Upper value 20 is true while the low sits 10% to 20% under the high. The order of the two numbers does not matter, and a minus sign on either one is ignored, so Upper value −20 gives the same range.

**Tip:** Lookback counts candles, so a 1 hour Interval needs a far larger Lookback to see the same high as 1 day. In the BTC/USDT data behind this page, the 1h low never sat more than 7.6% under its 100-candle high, so Lower than 10 on 1 hour was never true. On 1 day, Lookback 30 was never true either, while Lookback 100 was true on about a third of the candles.

## Trading setups for bots

### Long only after a 10% pullback

- **Entry:** your usual entry indicator in an AND group with ATH Drawdown, Lookback **100**, **1 day**, Condition **Lower than**, Value **10**. The bot only buys when the low is more than 10% under the 100-candle high.
- **Exit:** the bot's normal take profit.
- **Settings:** Keep true 0.
- **Timeframe:** 1d for the filter, any interval for the entry indicator.
- **When it fails:** in a strong uptrend. In the chart below, once BTC came back within about 10% of its 100-candle high it stayed there for the rest of the chart, so a bot with this filter opened almost no deals in that stretch.

![Annotated Gainium bot chart, BTC/USDT 1-day: the early stretch where the drawdown sat near -23% and Lower than 10 was true, and the candle where price came back within 10% of the high and the filter turned false](https://content.gainium.io/images/content/indicators/ath-drawdown__pullback-filter.webp)

### Short only near the high

- **Entry:** a short bot whose entry indicator sits in an AND group with ATH Drawdown, Lookback **100**, **1 day**, Condition **Greater than**, Value **5**. The bot only shorts within 5% of the 100-candle high.
- **Exit:** take profit 4–5%, about back to the -10 line.
- **Settings:** Keep true 0.
- **Timeframe:** 1d filter.
- **When it fails:** in a breakout. Within 5% of the high is also where a new high starts; in the chart below, price jumped from about 80,000 to 86,000 in one daily candle and held near the top for more than a dozen candles after it.

![Annotated Gainium bot chart, BTC/USDT 1-day: the drawdown pane within about 5% of the 100-candle high at the right of the chart, and the range price held at the top after the breakout candle](https://content.gainium.io/images/content/indicators/ath-drawdown__near-high.webp)

## Using ATH Drawdown in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type for an exit.
3. Click **Edit**, then **Change indicator**, and pick **ATH Drawdown** from the Volatility category.

![ATH Drawdown settings card in the Gainium bot form with Condition Lower than and Value 10 ringed, Lookback 100, Interval 1 day, Keep true 0](https://content.gainium.io/images/content/indicators/ath-drawdown__settings.webp)

The fields and their defaults:

- **Lookback:** 100 candles for the highest high.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Condition:** Crossing down. Also Crossing up, Greater than, Lower than and Between.
- **Value:** 10, as a positive percentage below the high. A condition saved without a Value also runs with 10.
- **Upper value:** shown only with Between, typed the same way as Value.
- **Keep true:** 0 extra bars.

**Example configuration** (the pullback filter above): Deal start condition Indicators, RSI(14) on 1 hour Crossing up 30, AND ATH Drawdown with Lookback 100, Interval 1 day, Condition Lower than, Value 10, Keep true 0.

## Related indicators

- [QFL](https://gainium.io/indicators/qfl): dip buying from a base; ATH Drawdown keeps it out of coins already far below their high.
- [Price Change](https://gainium.io/indicators/price-change-indicator): the size of the latest move, where ATH Drawdown is the distance from the peak.
- [Moving Averages](https://gainium.io/indicators/moving-averages): a trend filter that does not stay closed through a steady uptrend.
