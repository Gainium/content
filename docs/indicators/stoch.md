---
id: 76
name: Stochastic
slug: stoch
description: >-
  In this article, we explain what is the Stochastic indicator and how it can be
  used in bot trading.
createdAt: '2023-04-12T15:38:23.339Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-15T04:24:27.349Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.025Z'
templateVersion: 2
tldr: >-
  The Stochastic Oscillator shows where the close sits inside the high-low
  range of the last 14 bars, from 0 (at the low) to 100 (at the high). It has
  two lines: K, the raw reading, and D, its 3-bar average. Bots use the cross
  of K over D while both lines are under 20 as a long entry, and the cross
  down over 80 as an exit or short entry. In Gainium the Zone setting makes
  the bot ignore crosses outside those bands. On BTC/USDT 1h the lower-zone
  cross fires about four times as often as on 4h, so it suits busy short-term
  bots more than swing trades.
kind: native
catalogKeys:
  - Stoch
category: momentum
aliases:
  - "Stoch"
  - "Stochastic"
  - "Stochastic Oscillator"
  - "Stochastic %K %D"
faq:
  - title: What do K and D mean in the Stochastic?
    details: >-
      K is the position of the close in the range of the last Length bars,
      from 0 at the lowest low to 100 at the highest high, optionally smoothed
      by Smooth K. D is a moving average of K over Smooth D bars, 3 by
      default. A K cross over D is the usual trigger.
  - title: What does the Zone setting do?
    details: >-
      It filters where a cross may happen. With Zone Lower and a Lower band of
      20, a K and D cross only counts when both lines were under 20 on the
      signal bar and the bar before. Upper applies the same test above the
      Upper band, Lower&Upper accepts either, and Anywhere accepts every cross.
  - title: Can I trigger on K crossing a fixed level instead of D?
    details: >-
      Yes. Set Second Variable to Add Custom Value and type the level in Enter
      Value, for example K crossing up 20. The Zone fields are hidden in that
      mode, because the level already says where the cross happens.
  - title: Should I use the Stochastic or the RSI?
    details: >-
      The Stochastic reacts faster: on BTC/USDT 4h its K line spends about 19%
      of its bars under 20, while RSI(14) spends about 5% under 30. Use the
      Stochastic for short-term deals in a range, and RSI when you want fewer
      and more stretched entries.
related:
  - rsi
  - stochrsi
  - williams-r
  - divergences-indicator
sources:
  - title: StockCharts ChartSchool, Stochastic Oscillator (Fast, Slow and Full)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/stochastic-oscillator-fast-slow-and-full
  - title: TradingView Help Center, Stochastic (STOCH)
    url: https://www.tradingview.com/support/solutions/43000502332-stochastic-stoch/
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Stochastic Oscillator measures where the latest close sits inside the high-low range of the last 14 bars, from 0 at the low to 100 at the high. Traders use the cross of its fast line over its slow line near those extremes to time entries in a range. In Gainium you can tell the bot to accept a cross only when both lines are in the zone you choose.

## What is the Stochastic Oscillator

George Lane developed the Stochastic Oscillator in the late 1950s. It has two lines:

- **%K** = 100 × (Close − Lowest low of *n* bars) / (Highest high of *n* bars − Lowest low of *n* bars). *n* is the lookback, 14 by default. A close at the top of the range gives 100, at the bottom 0.
- **%K smoothing:** an optional simple moving average of %K. With smoothing 1 you get the "fast" stochastic; with 3 you get the "slow" one.
- **%D** = a simple moving average of %K, 3 bars by default. It is the signal line.

TradingView's default is %K length 14, %K smoothing 1 and %D smoothing 3. Gainium's defaults are the same.

How to read it:

- **Over 80:** the close is near the top of the 14-bar range. **Under 20:** near the bottom. These are positions in a range, not predictions. In a strong move the close stays near one edge and the lines stay pinned.
- **K crossing D:** K turning up through D under 20 says the closes have started moving up from the low of the range. The opposite cross over 80 says they are slipping from the high.
- **It moves fast.** On BTC/USDT 4h, K spends about four times as many bars under 20 as RSI(14) spends under 30: about 19% of bars against 5%.
- **Divergence:** Lane treated a divergence between %D and price as the main signal. A lower low in price with a higher low in %D is bullish.

![Stochastic (14, 1, 3) on BINANCE:BTCUSDT 4h, dark theme: the blue K line and orange D line swing between 0 and 100 many times across the chart, with dashed bands at 80 and 20](https://content.gainium.io/images/content/indicators/stoch__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 14 | Candles in the high-low range of %K, 1 to 200. |
| Interval | 1 hour | Candle size the oscillator is calculated on, from 1 minute to 1 week. |
| First Variable | K | The line that crosses: K or D. |
| Condition | crossing down | crossing up and crossing down fire on the cross candle; greater than and lower than hold on every candle on that side. |
| Second Variable | D | What the first line is compared with: the other line, or Add Custom Value for a fixed level. |
| Enter Value | 1 | The fixed level, shown only with Add Custom Value. It starts at 1, so type the level you want. |
| Smooth D | 3 | Candles in the average of K that makes D. |
| Smooth K | 1 | Candles in the average of raw %K. 1 gives the fast stochastic, 3 the slow one. |
| Zone | Lower | Where K and D must both be, on the cross candle and the candle before, for the cross to count: Lower, Upper, Lower&Upper or Anywhere. Hidden with Add Custom Value. |
| Lower band | 20 | Zone Lower and Lower&Upper: K and D must stay under this level. |
| Upper band | 80 | Zone Upper and Lower&Upper: K and D must stay over this level. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Upper band** 80 keeps only the crosses near the top of the range. Lowering it to 20 lets about five times as many K-down-D crosses through the Upper zone check on BTC/USDT 4h, most of them from the middle of the range, so leave it at 80 for a short entry or an exit.

**Tip:** **Enter Value** starts at 1. With Second Variable set to Add Custom Value, K crossing up through 1 on BTC/USDT 1h fires about a twelfth as often as a cross up through 20, and never with Smooth K 3. Type the level you mean, such as 20.

**Tip:** **Smooth K** 3 instead of 1 cuts K crossing up D anywhere on the 1-hour chart by about 40%. It barely changes the crosses in the Lower zone under 20 (about 4% fewer), because the zone check already drops most of the noise.

## Trading setups for bots

### Lower-zone cross for short long deals

- **Entry:** K crossing up D, with Zone Lower and a Lower band of 20. The bot ignores crosses higher up.
- **Exit:** take profit 1 to 1.5%. Lower-zone crosses on 1 hour often reach that within 24 bars when price is ranging.
- **Settings:** Length 14, Interval 1 hour, First Variable K, Condition crossing up, Second Variable D, Smooth D 3, Smooth K 1, Zone Lower, Lower band 20.
- **Timeframe:** 1 hour. On 4 hours the same rule fires about a quarter as often.
- **When it fails:** in a slide, the lines stay under 20 and cross up again and again. In the example on the chart, the rule fired four times in 14 bars while price fell 3.2%. Space the DCA orders so they can absorb a 3% slide.

![Annotated BINANCE:BTCUSDT 1h chart with Stochastic (14, 1, 3): four lower-zone crosses in a row during a 3.2% drop, and a later cross at 81,442 followed by a 3.4% rise within 8 bars](https://content.gainium.io/images/content/indicators/stoch__lower-zone.webp)

### Upper-zone cross for a short DCA bot

- **Entry:** K crossing down D with Zone Upper and an Upper band of 80. On a futures account this opens a short deal. On a spot long bot, use the same condition as the take profit.
- **Exit:** take profit 2% on the short, or a lower-zone cross up as the close condition.
- **Settings:** Length 14, Interval 4 hours, First Variable K, Condition crossing down, Second Variable D, Smooth D 3, Smooth K 1, Zone Upper, Upper band 80.
- **Timeframe:** 4 hours. On BTC/USDT it fires about as often as the lower-zone cross on the same chart.
- **When it fails:** in an uptrend the close keeps printing near the top of the range, so the lines dip from 90 to 80 and turn up again. In the chart above, one cross fired at 69,116, and price rose 5.3% in the next 10 bars.

![Annotated BINANCE:BTCUSDT 4h chart with Stochastic (14, 1, 3): an upper-zone cross at 77,889 before a 4.6% drop, and a cross at 69,116 that price ran over by 5.3%](https://content.gainium.io/images/content/indicators/stoch__upper-zone.webp)

## Using the Stochastic Oscillator in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or set the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Stochastic Oscillator (Stoch)**.

![The Select start indicator dialog in the Gainium bot form, searched for Stoch, with Stochastic Oscillator (Stoch) ringed](https://content.gainium.io/images/content/indicators/stoch__picker.webp)

The fields and their defaults:

- **Length:** 14. The *n* of %K, 1 to 200.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **First Variable:** K. The line that does the crossing: K or D.
- **Condition:** crossing down. The options are crossing up, crossing down, greater than and lower than.
- **Second Variable:** D. What the first line is compared with: the other line, or **Add Custom Value** to compare with a fixed level.
- **Enter Value:** 1. Shown only with Add Custom Value: the level, for example 20.
- **Smooth D:** 3. The moving average that turns K into D.
- **Smooth K:** 1. Smoothing of K itself. 1 means none (fast stochastic); 3 gives the slow stochastic.
- **Zone:** Lower. Where both lines must be, on the signal bar and the bar before, for the cross to count. Lower checks under **Lower band** (20), Upper checks over **Upper band** (80), Lower&Upper accepts either band, and Anywhere has no check. Each band keeps the value you typed when you switch Zone. Zone is hidden with Add Custom Value.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

The Stochastic has no smoothing or percentile options in Gainium.

![The Stochastic settings card in the Gainium bot form with its defaults: Length 14, Interval 1 hour, First Variable K, Condition crossing down, Second Variable D, Smooth D 3, Smooth K 1, Zone Lower, Lower band 20, Keep true 0](https://content.gainium.io/images/content/indicators/stoch__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the Stochastic pane below price](https://content.gainium.io/images/content/indicators/stoch__bot-chart.webp)

**Example configuration** (the lower-zone setup): Deal start condition Indicators, Stochastic with Length 14, Interval 1 hour, First Variable K, Condition crossing up, Second Variable D, Smooth D 3, Smooth K 1, Zone Lower, Lower band 20, Keep true 0. Take profit 1.2%.

## Related indicators

- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): slower to reach its extremes, a filter that keeps Stochastic entries to the deeper dips.
- [Stochastic RSI](https://gainium.io/indicators/stochrsi): the same formula applied to RSI instead of price, with the same K, D and Zone fields in Gainium.
- [Williams %R](https://gainium.io/indicators/williams-r): the raw %K on an inverted 0 to −100 scale.
- [Divergences](https://gainium.io/indicators/divergences-indicator): detects Stochastic divergences, the signal Lane valued most.

## FAQ

### What do K and D mean in the Stochastic?

K is the position of the close in the range of the last Length bars, from 0 at the lowest low to 100 at the highest high, optionally smoothed by Smooth K. D is a moving average of K over Smooth D bars, 3 by default. A K cross over D is the usual trigger.

### What does the Zone setting do?

It filters where a cross may happen. With Zone Lower and a Lower band of 20, a K and D cross only counts when both lines were under 20 on the signal bar and the bar before. Upper applies the same test above the Upper band, Lower&Upper accepts either, and Anywhere accepts every cross.

### Can I trigger on K crossing a fixed level instead of D?

Yes. Set Second Variable to **Add Custom Value** and type the level in **Enter Value**, for example K crossing up 20. The Zone fields are hidden in that mode, because the level already says where the cross happens.

### Should I use the Stochastic or the RSI?

The Stochastic reacts faster: on BTC/USDT 4h its K line spends about 19% of its bars under 20, while RSI(14) spends about 5% under 30. Use the Stochastic for short-term deals in a range, and [RSI](https://gainium.io/indicators/rsi) when you want fewer and more stretched entries.
