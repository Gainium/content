---
id: 67
name: Average Directional Index (ADX)
slug: adx
description: >-
  In this article, we explain what is the ADX indicator and how it can be used
  in bot trading.
createdAt: '2023-04-05T14:48:28.247Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-12T04:57:26.585Z'
locale: en
categories:
  - technical-indicators
difficulty: advanced
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:29.984Z'
templateVersion: 2
tldr: >-
  The Average Directional Index (ADX) measures how strongly price is trending,
  on a 0 to 100 scale, without saying in which direction. Readings over 25
  mean a trend, readings under 20 mean a range. Gainium's ADX condition
  defaults to Length 14 on 1-hour candles, crossing down 20. Its DMI mode
  tests the direction instead: +DI against −DI, the two lines ADX is built
  from. On BTC/USDT 4h, ADX(14) sits above 25 on about half of the candles and
  below 20 on a little over a quarter of them.
kind: native
catalogKeys:
  - ADX
category: trend
aliases:
  - "ADX"
  - "Average Directional Index"
  - "DMI"
  - "Directional Movement Index"
  - "+DI"
  - "-DI"
  - "−DI"
faq:
  - title: What ADX value means a strong trend?
    details: >-
      Wilder's rule of thumb is above 25 for a trend and below 20 for no
      trend. On BTC/USDT 4h, ADX(14) is above 25 on about half of candles and
      below 20 on a little over a quarter. Readings over 50 are rare and come
      late in a move: the rally from 64,000 to 78,000 shown on this page
      pushed it to about 69, near the top of the run.
  - title: Does ADX tell me if the trend is up or down?
    details: >-
      No. ADX rises in a strong sell-off exactly as it does in a strong rally.
      Direction comes from the +DI and −DI lines. Set Mode to DMI to test them:
      +DI above −DI means the up moves have been larger. Add a second ADX
      condition in ADX mode when you also want a minimum trend strength.
  - title: What ADX settings should a crypto bot use?
    details: >-
      Keep Length 14 and choose the Interval for the trades you want. On
      BTC/USDT, ADX(14) crosses up 25 about four and a half times as often on
      1-hour candles as on 4-hour, and about five times as often on 4-hour as
      on daily candles. Shorter lengths react faster but cross 25 on single
      wide candles.
  - title: Why is my ADX falling while price keeps rising?
    details: >-
      ADX measures how one-sided recent candles are, not how far price has
      gone. When a rally continues with smaller, overlapping candles, ADX
      falls. Traders read that as a trend losing force, not as a sell signal.
related:
  - supertrend
  - bb
  - moving-averages
  - atr
sources:
  - title: J. Welles Wilder Jr., New Concepts in Technical Trading Systems (1978), via StockCharts ChartSchool, Average Directional Index (ADX)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-directional-index-adx
  - title: TradingView Pine Script reference, ta.dmi
    url: https://www.tradingview.com/pine-script-reference/v5/
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Average Directional Index (ADX) measures how strongly price is trending, on a 0 to 100 scale, and says nothing about the direction. Bots use it as a switch: trend logic when ADX is above 25, range logic when it is below 20.

## What is ADX

J. Welles Wilder Jr. published the ADX in 1978, in *New Concepts in Technical Trading Systems*, as part of his Directional Movement System. It is built in four steps over *n* candles (Gainium's **Length**, 14 by default):

1. **Directional movement.** `+DM = high − previous high` and `−DM = previous low − low`. Only the larger of the two counts on each candle, and only if it is positive; the other is 0.
2. **Smoothing.** `+DM`, `−DM` and the True Range are each smoothed with Wilder's moving average over *n* candles.
3. **Directional indicators.** `+DI = 100 × smoothed +DM / smoothed TR` and `−DI = 100 × smoothed −DM / smoothed TR`.
4. **ADX.** `DX = 100 × |+DI − −DI| / (+DI + −DI)`, and ADX is the Wilder average of DX over *n* candles.

Gainium uses one Length for both smoothings. TradingView's built-in ADX shows them as two inputs, "ADX Smoothing" and "DI Length", both 14, so the defaults give the same line.

How to read it:

- **Under 20:** no trend. Candles overlap and +DI and −DI are close together.
- **20 to 25:** undecided. A cross of 25 from below is the usual "trend started" signal.
- **25 to 50:** a trend. On BTC/USDT 4h, ADX(14) spends about half its time above 25.
- **Over 50:** a strong, late-stage move. The rally from 64,000 to 78,000 in the chart below pushed 4h ADX to about 69.
- **Falling ADX** means the move is losing force, whichever way it is going.

ADX lags. With Length 14 on 4-hour candles it needs about 6 to 12 one-sided candles before it crosses 25.

**DMI mode.** Wilder's +DI and −DI from step 3 carry the direction ADX throws away. Set **Mode** to **DMI (+DI vs −DI)** and the condition compares them instead of testing ADX: +DI crossing above −DI, +DI crossing below −DI, +DI above −DI or +DI below −DI. The lines use the same Length. In DMI mode there is no Value, and percentile and smoothing are off, because the DI lines are read as they are. TradingView draws the same three lines as its built-in Directional Movement Index.

- **+DI above −DI:** the up moves have been larger than the down moves over the last Length candles.
- **The cross is fast and noisy.** On BTC/USDT 4h, +DI crosses above −DI about twice as often as ADX crosses up through 25, and about two crosses in five reverse within three candles.

![Average Directional Index (14) on BINANCE:BTCUSDT 4h, dark theme: ADX jumps from about 25 to 69 during a breakout and drops to about 10 in the range that follows](https://content.gainium.io/images/content/indicators/adx__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Percentile | Off | Off: the condition tests the fixed Value. On: Value hides and ADX is compared with its own Threshold rank over the last Lookback candles. Hidden in DMI mode. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Threshold | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Mode | — | Empty or ADX: the trend-strength line against Value. DMI (+DI vs −DI): +DI against −DI, the direction of the trend. Both use Length. |
| Length | 14 | The n of both the directional smoothing and the ADX average. TradingView splits it into DI Length and ADX Smoothing. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | — | On: a moving average is put on the ADX line, and the condition tests the smoothed line. Hidden in DMI mode. |
| Average | none | The smoothing average: SMA, EMA, WMA, DEMA, TEMA, HMA or RMA. |
| Length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. In DMI mode the options read +DI crossing above, crossing below, above or below −DI. |
| Value | 20 | The ADX level, 0 to 100. Over 25 is a trend, under 20 a range. Hidden in DMI mode. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** The default, **Condition** Crossing down with Value 20, fires when a trend fades into a range, often on BTC/USDT 1h. For breakouts, use Crossing up 25 on 4 hours, which fires about a quarter as often.

**Tip:** **Length** 7 doubles the breakout signals. On BTC/USDT 4h, ADX(7) gives about twice as many crosses up through 25 as Length 14, and Length 21 about half as many.

**Tip:** Between with **Value** 20 and **Upper value** 25 is true in the undecided zone. ADX(14) on 4h sits there on about a fifth of candles. The bounds are strict: a reading of exactly 20 or 25 is outside.

**Tip:** **Mode** DMI on 1 hour fires about four times as often as on 4 hours. On BTC/USDT, +DI crosses above −DI about 4.2 times as often on 1h candles as on 4h.

## Trading setups for bots

### Trend breakout with a direction filter

ADX confirms that a move has force. A second condition says which way.

- **Entry:** ADX, Condition **Crossing up**, Value **25**, Interval 4 hours, AND SuperTrend **Up trend** on 4 hours, in one group with AND logic. For a short bot, use SuperTrend Down trend.
- **Exit:** a take profit of 3–5%, or close the deal when SuperTrend flips From up to down.
- **Settings:** Length 14. The cross of 25 is the default trigger; 20 fires earlier and more often.
- **Timeframe:** 4 hours. On BTC/USDT, ADX(14) crosses up 25 about four and a half times as often on 1h as on 4h.
- **When it fails:** without the direction filter. In the chart below, ADX crossed 25 twice while BTC was falling inside its range, so a long-only bot would have bought two down-moves. With the SuperTrend filter, both were skipped, and the later cross bought 68,550, with price 5% higher about six bars later.

![Annotated ADX chart, BTC/USDT 4h: ADX crossing 25 with Supertrend up buys 68,550 during the breakout; two earlier crosses fire while price falls](https://content.gainium.io/images/content/indicators/adx__breakout.webp)

### Range buying when ADX is low

When ADX is under 20, price tends to swing between its bands instead of running away. That is the moment for a mean-reversion entry.

- **Entry:** ADX **Lower than 20**, Interval 4 hours, AND Bollinger Bands (20, 2) **Crossing up** the **Lower** band, Interval 4 hours.
- **Exit:** a 1.5% take profit. At the BTC/USDT entries measured for this setup, the middle band sat 0.4–1.0% above the entry, so the take profit needs a move just past it.
- **Settings:** ADX Length 14; Bollinger Bands SMA 20 with 2 standard deviations.
- **Timeframe:** 4 hours. The pair is rare on BTC/USDT 4h: ADX under 20 and a lower-band cross line up on only a handful of candles.
- **When it fails:** a low ADX is also what a market looks like just before it breaks out. In the chart below, one entry bought 79,400 with ADX at 13.5. About 24 bars later ADX crossed 25 on the way down, and price fell 5.5% before the take profit filled. Add a stop loss or DCA orders sized for that move.

![Annotated Bollinger Bands and ADX chart, BTC/USDT 4h: with ADX near 15, a close back above the lower band buys 83,370 for +1.5%; the same signal earlier is followed by a breakdown](https://content.gainium.io/images/content/indicators/adx__range.webp)

### +DI crossing above −DI with an ADX floor

DMI mode gives the direction, and a second ADX condition asks for a minimum of trend strength before the cross counts.

- **Entry:** ADX, Mode **DMI (+DI vs −DI)**, Condition **+DI crossing above −DI**, Length 14, Interval 4 hours. In the same group with AND logic, a second ADX condition: Mode ADX, Condition **Greater than**, Value **20**, Interval 4 hours. For a short bot, use +DI crossing below −DI.
- **Exit:** take profit 2%, or close the deal on ADX in DMI mode with +DI crossing below −DI.
- **Settings:** Length 14 on both conditions. The ADX floor of 20 keeps about half of the DI crosses on BTC/USDT 4h.
- **Timeframe:** 4 hours. On 1 hour the DI lines cross about four times as often, and more of the crosses are noise.
- **When it fails:** in a range the DI lines braid, and about two crosses in five reverse within three candles. The ADX floor does not fix that: on BTC/USDT 4h, price reached +2% within 12 candles after about 44% of the filtered crosses and fell 2% within the same 12 candles after about 53%. Without the floor the figures are about 46% and 50%. In the chart below, a cross at 83,909 with ADX above 20 fell 3.4%, and a cross at 82,717 reversed four hours later. Size the DCA orders for a 3% move against the deal.

In the chart below, +DI crossed above −DI with ADX at 29, and the bot bought 82,618. The 2% take profit filled about a day later.

![Annotated Directional Movement Index chart, BINANCE:BTCUSDT 4h: +DI (blue) crosses above −DI (orange) with ADX at 29 and buys 82,618, the 2% take profit fills a day later; two earlier crosses with ADX above 20, at 83,909 and 82,717, fall back](https://content.gainium.io/images/content/indicators/adx__dmi-cross.webp)

## Using ADX in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **ADX**.
3. Pick **Average Directional Index (ADX)**, set the fields, and click **Done**.

![Gainium indicator picker searched for ADX, with the Average Directional Index card ringed](https://content.gainium.io/images/content/indicators/adx__picker.webp)

The fields and their defaults:

- **Percentile:** off. When on, the condition compares ADX with its own percentile level instead of a fixed Value. **Lookback** 150 candles and **Threshold** 80 appear with it. See [indicator percentiles](https://gainium.io/help/indicator-percentiles).
- **Mode:** ADX. Or **DMI (+DI vs −DI)**, which compares the directional lines. Choosing DMI turns percentile and smoothing off and changes Between to Crossing up.
- **Length:** 14.
- **Interval:** 1 hour.
- **Smoothing:** off. When on, choose the **Average** (SMA, EMA, WMA, DEMA, TEMA, HMA or RMA) and its **Length** (14). **Compare** decides whether the smoothed line is tested against Value, or the raw ADX against its smoothed line. See [indicator smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing down, Crossing up, Greater than, Lower than and Between. In DMI mode they are +DI crossing below −DI, +DI crossing above −DI, +DI above −DI and +DI below −DI.
- **Value:** 20. With Between, an **Upper value** field appears, and ADX must stay above Value and below Upper value. DMI mode has no Value.
- **Keep true:** 0 extra candles.

![Gainium ADX settings card in DMI mode: Mode DMI (+DI vs −DI), Length 14, Interval 1 hour, Condition +DI crossing below −DI, Keep true 0](https://content.gainium.io/images/content/indicators/adx__dmi-settings.webp)

ADX works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. In the Bot Controller you can stop a range bot when ADX crosses up 25 and start it again when ADX falls back under 20.

For the DMI setup: ADX with Mode DMI (+DI vs −DI), Length 14, Interval 4 hours, Condition +DI crossing above −DI, Keep true 0; and a second ADX with Mode ADX, Length 14, Interval 4 hours, Condition Greater than, Value 20.

Example configuration for the breakout setup, as the first condition of the group:

- ADX: Percentile off, Mode ADX, Length 14, Interval 4 hours, Smoothing off, Condition Crossing up, Value 25, Keep true 0.
- Second condition, same group, AND: SuperTrend, Condition Up trend, Interval 4 hours.

![Gainium ADX settings card configured with Length 14, Interval 4 hours, Condition Crossing up and Value 25](https://content.gainium.io/images/content/indicators/adx__example.webp)

## Related indicators

- [Supertrend](https://gainium.io/indicators/supertrend): supplies the direction ADX lacks, as an Up trend or Down trend filter.
- [Bollinger Bands](https://gainium.io/indicators/bb): the band touches for range entries while ADX is under 20.
- [Moving Averages](https://gainium.io/indicators/moving-averages): price above a 50 or 200 average is a simpler direction filter for an ADX breakout.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): shares the True Range input; ATR says how big candles are, ADX how one-sided.
