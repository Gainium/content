---
id: 126
name: Keltner Channel %B
slug: keltner-channel-b
description: >-
  Learn how to use the Keltner Channel %B in Gainium for automated trading
  strategies, detecting breakouts, and identifying overbought/oversold
  conditions.
createdAt: '2024-10-06T13:25:45.603Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-06T13:28:31.664Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.014Z'
tldr: >-
  Keltner Channel %B says where the close sits inside the Keltner Channel: 0
  at the lower band, 0.5 at the EMA, 1 at the upper band, below 0 or above 1
  outside. It is Bollinger's %B formula applied to Keltner bands. Bots use it
  to buy low in the channel and exit high in it, or to enter breakouts above
  1. In Gainium it adds percentile mode, smoothing and Between to the Keltner
  Channel. Its Value starts at 0, the lower band.
templateVersion: 2
kind: native
catalogKeys:
  - KCPB
category: momentum
aliases:
  - KC %B
  - KC%B
  - Keltner Channel %B
  - Keltner %B
faq:
  - title: Why does my KC %B condition never trigger?
    details: >-
      Check that the Value is on the %B scale. %B runs from about 0 to 1:
      BTC/USDT 4h stays between about −0.3 and 1.7. A condition saved with a
      Value such as 80, the old default, never fires. Set Value to a number on
      that scale, such as 0.1 or 1.
  - title: What is the difference between KC %B and BB %B?
    details: >-
      The formula is the same; the bands differ. KC %B uses ATR-based Keltner
      bands around an EMA, BB %B uses standard-deviation bands around an SMA.
      Keltner bands are smoother, so KC %B moves more steadily.
  - title: Is KC %B crossing up 1 the same as price crossing the upper band?
    details: >-
      Yes, with the same channel settings. %B is useful when you want one Value
      for many pairs, a level between the bands such as 0.1 or 0.9, percentile
      mode or smoothing.
  - title: What are the Gainium defaults?
    details: >-
      MA Type EMA, Range type ATR, Range length 20, Length 7, ATR Multiplier 2,
      Interval 1 hour, Condition Crossing down, Value 0, Keep true 0. A 7-bar
      EMA follows price more closely than the usual 20, so the channel reacts
      faster.
related:
  - keltner-channel
  - bollinger-bands-b
  - atr
sources:
  - title: StockCharts ChartSchool, Keltner Channels (EMA and ATR form)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/keltner-channels
  - title: TradingView Help Center, Bollinger Bands %b (the %B formula)
    url: https://www.tradingview.com/support/solutions/43000501971-bollinger-bands-b-b/
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Keltner Channel %B says where the close sits inside the Keltner Channel, as one number from about 0 at the lower band to 1 at the upper band. Bots use it to buy low in the channel and sell high in it, and to enter breakouts when it goes above 1.

## What is Keltner Channel %B

Keltner Channel %B applies John Bollinger's %B formula to Keltner bands instead of Bollinger Bands:

**KC %B = (Close − Lower band) / (Upper band − Lower band)**

- **Close** is the candle's closing price.
- **Upper and lower bands** are the Keltner Channel: an EMA of the close plus and minus a multiple of ATR. See [Keltner Channel](https://gainium.io/indicators/keltner-channel).

If the bands have no width, Gainium returns 0.5. In Gainium the channel defaults to Length 7, ATR Multiplier 2 and an ATR of 20 bars, so the middle line reacts faster than the usual 20-period EMA.

How to read it:

- **0** is the lower band, **0.5** the EMA, **1** the upper band.
- **Below 0 or above 1** means the close is outside the channel. BTC/USDT 4h %B (with a 20 EMA and ATR 10) stays between about −0.3 and 1.7.
- **One scale for every pair.** A Value of 0.1 means "near the lower band" on BTC and on a small coin alike.

![The Gainium bot chart on BTC/USDT 1h (Bybit paper account) with the KC %B pane below price, using Gainium's defaults (EMA 7, multiplier 2, ATR 20) and a dashed line at 1: %B swings between about 0 and 1, touching 1.17 at its high and 0.01 at its low](https://content.gainium.io/images/content/indicators/keltner-channel-b__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | On: Value is hidden and the condition compares the line with its own percentile level over the last Lookback bars. |
| Lookback | 150 | Bars the percentile level is taken from. Percentile mode only. |
| Percentile | 80 | Which percentile of those bars is the level: 80 is higher than 80% of them, 20 lower than 80% of them. Percentile mode only. |
| MA Type | EMA | The middle line: EMA or SMA. |
| Range type | ATR | What sets the band width: ATR over Range length, True Range of the current bar alone, or Range, a smoothed average of high minus low over Length. |
| Range length | 20 | The ATR period. Shown with Range type ATR only. |
| Length | 7 | The period of the middle line's moving average. |
| ATR Multiplier | 2 | How far each band sits from the middle line, in multiples of the range. From 0.1 to 10. |
| Interval | 1 hour | The candle size %B is calculated on, from 1 minute to 1 week. |
| Smoothing | None | Moving average applied to the indicator line. With smoothing on, the condition uses the smoothed line. |
| Smoothing length | 14 | Bars in the smoothing average. Shown when Smoothing is on. |
| Compare | Smoothed line vs value | Smoothed line vs value: the condition tests the smoothed line against Value. Line vs smoothed line: the condition tests the indicator against its own moving average, a momentum-turn signal. Percentile mode always compares against a value. |
| Condition | Crossing down | How %B is compared with Value: Crossing up, Crossing down, Greater than, Lower than, or Between Value and Upper value. Percentile mode drops Between. |
| Value | 0 | The threshold on the %B scale: 0 is the lower band, 1 the upper band. |
| Upper value | — | Between: the value must stay above Value and below this. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the default Value 0 with Crossing down fires when the close drops below the lower band. Raise it to 0.1 to catch the dip a little earlier, inside the channel. Keep Value on the 0 to 1 scale: BTC/USDT 1h %B stays between about −0.2 and 2.2, so a Value such as 80 never fires.

**Tip:** the default Length 7 with Range length 20 keeps %B near the middle, because a 7-bar EMA follows price closely. On BTC/USDT 4h, 90% of readings sit between 0.24 and 0.86. With Length 20 and Range length 10, TradingView's Keltner defaults, crossing down 0.1 fires about five times as often.

**Tip:** Use percentile adapts the level to whichever lengths you pick. With the default lengths and Percentile 90, %B crossing up its own 90th percentile fires about eight times as often on BTC/USDT 4h as crossing down a fixed 0.1. Percentile starts at 80; 90 picks a rarer level.

## Trading setups for bots

The charts below use TradingView's Keltner Channels with a 20 EMA, multiplier 2 and ATR 10. Set the same Length and Range length in Gainium to reproduce them.

### Buy at %B 0.1, sell at 0.9

A level inside the channel catches the dip before price closes outside it, which the Keltner Channel condition can't express.

- **Entry:** %B crossing down 0.1.
- **Exit:** %B crossing up 0.9, as an indicator take profit.
- **Settings:** KC %B with MA Type EMA, Range type ATR, Range length 10, Length 20, ATR Multiplier 2, Interval 4 hours, Condition Crossing down, Value 0.1. Take profit type Indicators: KC %B, same settings, Condition Crossing up, Value 0.9. Two DCA orders 1.5% apart.
- **Timeframe:** 4h. The exit at 0.9 needs a full swing across the channel, so trades last many bars.
- **When it fails:** when the swing never comes. In one deal opened at 83,740, price dropped 4.7% and %B took about 80 bars to reach 0.9. The deal closed 1% up, but the capital was tied up the whole time.

Example, in the chart below: %B crosses down 0.1 at 77,250. Price dips 1.6% more, then %B crosses up 0.9 at 78,982, 2.2% above the entry.

![Annotated chart of Keltner Channels on BINANCE:BTCUSDT 4h: the close near the lower band at 77,250 where %B crosses down 0.1, and the close near the upper band at 78,982 where %B crosses up 0.9](https://content.gainium.io/images/content/indicators/keltner-channel-b__reentry.webp)

### Breakout above 1, exit at 0.5

%B above 1 is a close above the upper band; back under 0.5 is a close under the EMA.

- **Entry:** %B crossing up 1.
- **Exit:** %B crossing down 0.5.
- **Settings:** KC %B with EMA, ATR 10, Length 20, Multiplier 2, Interval 4 hours, Condition Crossing up, Value 1. Take profit type Indicators: KC %B, Condition Crossing down, Value 0.5. A 4% stop loss.
- **Timeframe:** 4h or 1 day.
- **When it fails:** in a range. On BTC/USDT 4h about two in three signals lost 1% to 3%, ignoring fees; the winners came in strong runs, like the one in the chart below.

In the chart below, %B crosses up 1 at 80,726 and falls back under 0.5 at 83,996, 4.1% higher. A bot that allows more than one deal would also have bought the second cross, at 84,887, and lost 1%.

![Annotated chart of Keltner Channels on BINANCE:BTCUSDT 4h: the close above the upper band at 80,726, the second one at 84,887, and the close back under the EMA at 83,996](https://content.gainium.io/images/content/indicators/keltner-channel-b__breakout.webp)

## Using Keltner Channel %B in Gainium

KC %B can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot from the Bot Controller.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators**.
3. Click **Edit**, then **Change indicator**, and pick **Keltner Channel %B (KC%B)**.

The settings card starts with these defaults:

- **Use percentile:** off. When on, Value is replaced by %B's own percentile level over the last **Lookback** bars (default 150) at the **Percentile** you set (default 80). See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **MA Type:** EMA, or SMA.
- **Range type:** ATR, True Range or Range, as in the Keltner Channel.
- **Range length:** 20. The ATR period, shown only with Range type ATR.
- **Length:** 7. The period of the middle line.
- **ATR Multiplier:** 2, from 0.1 to 10.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. A moving average of the %B line (SMA, EMA, WMA, DEMA, TEMA, HMA or RMA), **Smoothing length** 14, and **Compare**. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 0, the lower band. Crossing down 0 fires when the close drops out of the channel at the bottom. Values step by 0.01.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The KC %B settings card in the Gainium bot form with its defaults: Use percentile off, MA Type EMA, Range type ATR, Range length 20, Length 7, ATR Multiplier 2, Interval 1 hour, Smoothing None, Condition Crossing down, Value 0 (ringed), Keep true 0](https://content.gainium.io/images/content/indicators/keltner-channel-b__settings.webp)

When you click **Done**, the bot chart adds a KC %B pane with the Value drawn as a dashed line. If the pane scales far past 1 and the %B line sits flat at the bottom, the Value is off the %B scale and needs changing.

**Example configuration** (the dip buy): Deal start condition Indicators, KC %B with Use percentile off, MA Type EMA, Range type ATR, Range length 10, Length 20, ATR Multiplier 2, Interval 4 hours, Smoothing None, Condition Crossing down, Value 0.1, Keep true 0. Take profit type Indicators, KC %B with the same settings, Condition Crossing up, Value 0.9. Two DCA orders 1.5% apart.

## Related indicators

- [Keltner Channel](https://gainium.io/indicators/keltner-channel): the channel itself, for conditions on one band.
- [Bollinger Bands %B](https://gainium.io/indicators/bollinger-bands-b): the same formula on standard-deviation bands, which react faster to single wide candles.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): the width unit of the Keltner bands.
