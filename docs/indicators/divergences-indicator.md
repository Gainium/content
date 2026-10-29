---
id: 129
name: Divergences Indicator
slug: divergences-indicator
description: >-
  Learn how to use the Divergence Indicator in Gainium for automated trading,
  detecting trend reversals, and momentum shifts with strategies and practical
  examples.
createdAt: '2024-10-07T04:35:50.955Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2024-10-07T04:36:49.453Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.008Z'
templateVersion: 2
tldr: >-
  A divergence is price and an oscillator disagreeing: price makes a lower
  low while the oscillator makes a higher low (bullish), or the reverse at a
  high (bearish). Gainium's Divergences condition checks up to nine
  oscillators at once and fires when at least Min number of them show the
  same type of divergence on the same candle. Defaults are 2 divergences, Any
  Bearish, all nine oscillators, on 1-hour candles. On BTC/USDT daily, two or
  more bearish divergences are rare, and price was lower six bars later after
  about five in six of them.
kind: native
catalogKeys:
  - DIV
category: composite
aliases:
  - "Divergences"
  - "Divergence"
  - "RSI Divergence"
  - "Bullish Divergence"
  - "Bearish Divergence"
  - "Hidden Divergence"
faq:
  - title: What is the difference between regular and hidden divergence?
    details: >-
      Regular divergence points to a reversal: price makes a lower low and the
      oscillator a higher low (bullish), or price a higher high and the
      oscillator a lower high (bearish). Hidden divergence points to
      continuation: price makes a higher low while the oscillator makes a
      lower low (hidden bullish), or the mirror at highs.
  - title: Can I trade RSI divergence only?
    details: >-
      Yes. Leave only Relative Strength Index (RSI) selected under
      Oscillators and set Min number of divergences to 1. The condition then
      fires on every RSI divergence of the chosen type.
  - title: Why does the signal come one candle after the low?
    details: >-
      A low only counts as a pivot once Pivot lookback right candles after it
      have closed higher on the oscillator. With the default of 1, the
      condition sees it one candle later; on 4-hour candles that is a
      four-hour delay. A larger value finds steadier pivots and signals later.
  - title: What Min number of divergences should I use?
    details: >-
      It trades frequency for agreement. On BTC/USDT 4h, a regular bullish
      divergence on at least one oscillator appears about three and a half
      times as often as on at least two, and about eight times as often as on
      at least three. More oscillators in agreement did not raise the win
      rate, so use 2 and judge the setup by its exit.
  - title: Which oscillator settings does the condition use?
    details: >-
      Fixed ones: RSI 14, MFI 14, the MACD histogram (12, 26, 9), Stochastic
      %D (14, 3, 1), CCI 10, Awesome Oscillator (5, 34), Williams %R 14,
      Ultimate Oscillator (7, 14, 28) and Momentum 10. You choose which ones
      count, not their lengths.
related:
  - rsi
  - macd
  - awesome-oscillator
  - oscillator-crossover
sources:
  - title: StockCharts ChartSchool, RSI divergences (J. Welles Wilder Jr.)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi
  - title: StockCharts ChartSchool, MACD divergences
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

A divergence is price and an oscillator disagreeing: price makes a new low, but RSI or MACD does not. Gainium's Divergences condition checks up to nine oscillators at once and fires when enough of them show the same divergence on the same candle. Bots use bullish divergences to time dip entries and bearish ones to close longs or pause a bot.

## What is a divergence

Divergence is one of the RSI signals in J. Welles Wilder Jr.'s 1978 book, and traders apply the same test to any oscillator. There are four types:

- **Regular bullish:** price makes a lower low, the oscillator makes a higher low. Selling is losing force.
- **Regular bearish:** price makes a higher high, the oscillator makes a lower high. Buying is losing force.
- **Hidden bullish:** price makes a higher low, the oscillator makes a lower low. Read as an up trend that continues.
- **Hidden bearish:** price makes a lower high, the oscillator makes a higher high. Read as a down trend that continues.

How Gainium detects them, on every closed candle and for each selected oscillator:

1. Find a **pivot** on the oscillator: a value lower (or higher) than the **Pivot lookback left** candles before it (default 3) and the **Pivot lookback right** candles after it (default 1). The pivot is confirmed Pivot lookback right candles after it forms.
2. Compare it with the oscillator's previous pivot, which must be between **Min of lookback range** and **Max of lookback range** candles earlier (default 1 to 60).
3. Compare the price lows (or highs) at the same two candles.
4. Count the oscillators that show each type on this candle. The condition is true when the count reaches **Min number of divergences**. "Any Bullish" means the regular count or the hidden count reaches it; the two are not added together.

The oscillators run with fixed settings: RSI 14, MFI 14, MACD histogram (12, 26, 9), Stochastic %D (14, 3, 1), CCI 10, Awesome Oscillator (5, 34), Williams %R 14, Ultimate Oscillator (7, 14, 28) and Momentum 10.

How often they appear: on BTC/USDT 4h, two or more oscillators show any bearish divergence almost three times as often as two or more show a regular bullish one. On 1-hour candles the default, Any Bearish with 2, fires about four times as often as on 4 hours.

![RSI (14) on BINANCE:BTCUSDT 4h, dark theme: a red arrow marks price making a lower low while a green arrow marks RSI making a higher low](https://content.gainium.io/images/content/indicators/divergences-indicator__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Min number of divergences | 2 | How many of the selected oscillators must show the divergence on the same candle, 1 to 9. |
| Type of divergence | Any Bearish | Regular (Bearish, Bullish), hidden, or Any. Any counts regular and hidden divergences separately and fires when either count reaches the minimum. |
| Oscillators | AO,CCI,MACD,MFI,MOM,RSI,Stoch,UO,WR | The oscillators checked, all nine by default. Each runs with fixed settings, for example RSI 14 and MACD 12, 26, 9. |
| Interval | 1 hour | Candle size of the oscillators and of price, from 1 minute to 1 week. |
| Pivot lookback left | 3 | Candles before a pivot that must be higher (for a low) or lower (for a high), 1 to 50. |
| Pivot lookback right | 1 | Candles after a pivot that must be higher or lower, 1 to 50. The pivot, and the signal, are confirmed this many candles after the low or high. |
| Min of lookback range | 1 | Fewest candles between the two pivots a divergence compares, 1 to 500. Must be below the max. |
| Max of lookback range | 60 | Most candles between the two pivots a divergence compares, 2 to 500. |
| Keep true | 0 | Extra candles the condition stays true after it fires. A divergence is true on one candle only. |

**Tip:** **Min number of divergences** can never be met when it is higher than the number of selected Oscillators. With only RSI selected, set it to 1. The field stops at 9, one for each oscillator.

**Tip:** Each step of **Min number of divergences** cuts the signals by 60 to 70%. With Any Bullish on BTC/USDT 4h, a minimum of 2 fires on about a quarter as many candles as 1, and a minimum of 4 on about a twentieth.

**Tip:** A pivot is confirmed **Pivot lookback right** candles after it forms, and the condition is true on that candle only. Set **Keep true** to 2 or 3 when it shares a group with a condition that tends to fire a few candles later, such as RSI crossing up through 30.

**Tip:** **Pivot lookback left** 5, **Pivot lookback right** 2 and **Max of lookback range** 30 keep only clearer pivots that sit close together. With Any Bullish and a minimum of 2 on BTC, ETH and SOL 1h, they fire about two thirds as often as the defaults (3, 1 and 60), and each signal comes one candle later.

## Trading setups for bots

### Bullish divergence as a dip entry

- **Entry:** Divergences, Min number of divergences **2**, Type **Any Bullish**, all nine oscillators, Interval 4 hours.
- **Exit:** a 1.5% take profit, with DCA orders below. The signal marks a low; it does not say how far the bounce goes.
- **Settings:** Min 2. With 1, regular divergences alone fire about three and a half times as often; with 3, under half as often, and no better.
- **Timeframe:** 4 hours. Any Bullish with 2 fires about two and a half times as often as regular Bullish with 2, because hidden divergences count too.
- **When it fails:** in a falling market, where every bounce shows a fresh divergence. About two thirds of the entries reached +1.5% within 18 bars, but a buy on any 4h candle did that almost as often. In the example on the chart, Momentum and the Ultimate Oscillator diverged at 79,420, and the take profit took about 66 bars and a 5.6% drawdown to fill. Size the DCA orders for that.

![Annotated BTC/USDT 4h chart with RSI: RSI, CCI and Williams %R diverge and a buy at 78,306 reaches +1.5% about 12 bars later; an earlier divergence on Momentum and the Ultimate Oscillator at 79,420 is followed by a 5.6% drop](https://content.gainium.io/images/content/indicators/divergences-indicator__bullish.webp)

### Daily bearish divergence to stop a long bot

On daily candles a bearish divergence is rare, and it has marked tops.

- **Entry:** none; this setup protects open longs. Divergences, Min **2**, Type **Any Bearish**, all oscillators, Interval **1 day**, used as a take profit condition (close the deal) or in the Bot Controller to stop the bot.
- **Exit:** restart the bot by hand, or with a second Bot Controller condition such as Divergences Any Bullish on 1 day.
- **Settings:** Min 2 on 1 day. On 4-hour candles the same condition fires about twelve times as often and stops being a warning.
- **Timeframe:** 1 day. It is the rarest signal on this page, and the signal days come in short clusters.
- **When it fails:** in a strong up trend, where the oscillators flatten while price keeps climbing. In the chart above, one signal fired at 75,150 and price was 4% higher six bars later. Across all signal days, price was lower six bars later after about five in six, and fell 12.8% in the 14 bars after the signal at 95,600.

![Annotated BTC/USDT 1D chart with RSI: bearish divergences before a 12.8% drop, before a longer decline, and before a 5.9% drop; one signal is followed by a 4% rise](https://content.gainium.io/images/content/indicators/divergences-indicator__bearish-1d.webp)

## Using Divergences in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **Divergences**.
3. Pick **Divergences**, set the fields, and click **Done**.

![Gainium indicator picker searched for Divergences, with the Divergences card ringed](https://content.gainium.io/images/content/indicators/divergences-indicator__picker.webp)

The fields and their defaults:

- **Min number of divergences:** 2, from 1 to 9. How many of the selected oscillators must show the divergence on the same candle.
- **Type of divergence:** Any Bearish. The options are Any Bearish, Bearish, Hidden Bearish, Any Bullish, Bullish and Hidden Bullish.
- **Oscillators:** all nine selected: Awesome Oscillator, CCI, MACD, MFI, Momentum, RSI, Stochastic, Ultimate Oscillator and Williams %R.
- **Interval:** 1 hour.
- **Pivot lookback left:** 3 candles, from 1 to 50.
- **Pivot lookback right:** 1 candle, from 1 to 50.
- **Min of lookback range:** 1 candle, from 1 to 500.
- **Max of lookback range:** 60 candles, from 2 to 500. Min must stay below Max, or the bot form will not save.
- **Keep true:** 0 extra candles. A divergence is true on one candle only, so Keep true 1 or 2 lets it meet a second condition that fires a little later.

![The pivot fields of the Gainium Divergences settings card with their defaults: Pivot lookback left 3, Pivot lookback right 1, Min of lookback range 1 and Max of lookback range 60 bars](https://content.gainium.io/images/content/indicators/divergences-indicator__pivots.webp)

The bot-form chart's divergence study uses the same four values, so its marks match the condition.

Divergences works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the first setup: Min number of divergences 2, Type of divergence Any Bullish, all oscillators, Interval 4 hours, Keep true 0.

![Gainium Divergences settings card with Min number of divergences 2, Type of divergence Any Bullish and Interval 4 hours](https://content.gainium.io/images/content/indicators/divergences-indicator__example.webp)

## Related indicators

- [RSI](https://gainium.io/indicators/rsi): the oscillator most traders read divergences on; select it alone for RSI-only divergences.
- [MACD](https://gainium.io/indicators/macd): its histogram is one of the nine oscillators; the MACD condition itself cannot test divergence.
- [Awesome Oscillator](https://gainium.io/indicators/awesome-oscillator): another of the nine, built from 5 and 34-period averages of the candle midpoint.
- [Oscillator Crossover](https://gainium.io/indicators/oscillator-crossover): a faster momentum turn to combine with a divergence using Keep true.
