---
id: 80
name: Money Flow Index (MFI)
slug: mfi
description: >-
  In this article, we explain what is the Money Flow Index (MFI) indicator and
  how it can be used in bot trading.
createdAt: '2023-04-15T00:21:46.079Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-15T04:17:04.524Z'
locale: en
categories:
  - technical-indicators
difficulty: advanced
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.016Z'
templateVersion: 2
tldr: >-
  The Money Flow Index (MFI) is a volume-weighted RSI: it compares the money
  that traded on up bars with the money on down bars over 14 bars, on a 0 to
  100 scale. Readings above 80 are overbought and below 20 oversold. Gene
  Quong and Avrum Soudack also traded its divergences and failure swings.
  Bots use MFI crossing back above 20 as a long entry and a bullish divergence
  confirmed by MFI over 50 as a swing entry. In Gainium the default is Length
  14 with a Value of 70, and it supports smoothing and percentiles.
kind: native
catalogKeys:
  - MFI
category: volume
aliases:
  - "MFI"
  - "Money Flow Index"
  - "Volume-weighted RSI"
faq:
  - title: How is MFI different from RSI?
    details: >-
      RSI uses only closing prices. MFI multiplies each bar's typical price by
      its volume, so a high-volume drop pulls it down more than a quiet one.
      The two often agree; when MFI is lower than RSI on a dip, the selling
      came on heavier volume.
  - title: Should I use 80/20 or 70/30 for MFI?
    details: >-
      80 and 20 are the classic levels. On BTC/USDT 4h MFI spends about 6% of
      its time under 20 and about 3% over 80, so 80/20 gives few signals per
      pair. 70/30 gives two to three times as many. Readings under 10 and
      over 90 are rarer still.
  - title: Does MFI work on pairs with unreliable volume?
    details: >-
      Less well. MFI reads the exchange's own volume for the pair. On thin
      pairs a few large trades make up most of the volume, and MFI jumps with
      them. Use the RSI on those pairs, or smooth the MFI line.
  - title: Can Gainium detect MFI divergences?
    details: >-
      Yes, with the Divergences indicator. Select only Money Flow Index (MFI)
      under Oscillators, set Min number of divergences to 1 and pick Bullish
      or Bearish. On the BTC/USDT daily chart it flags bullish and bearish
      MFI divergences about equally often, and both are rare.
related:
  - rsi
  - divergences-indicator
  - volume-oscillator
  - oscillator-crossover
sources:
  - title: Gene Quong and Avrum Soudack, via StockCharts ChartSchool, Money Flow Index (MFI)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/money-flow-index-mfi
  - title: TradingView Help Center, Money Flow (MFI)
    url: https://www.tradingview.com/support/solutions/43000502348-money-flow-mfi/
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Money Flow Index (MFI) is a volume-weighted RSI: it compares the money that traded on rising bars with the money on falling bars, on a 0 to 100 scale. Traders use it to buy when selling pressure eases after heavy volume, and to spot divergences between price and money flow. A bot can enter on MFI climbing back above 20, or on a bullish MFI divergence detected by Gainium.

## What is the Money Flow Index

Gene Quong and Avrum Soudack created the MFI. It applies the RSI formula to price multiplied by volume:

1. **Typical price (TP)** = (high + low + close) / 3.
2. **Raw money flow** = TP × volume.
3. **Positive money flow** = the sum of raw money flow on bars whose TP rose from the previous bar, over *n* bars. **Negative money flow** is the same for bars whose TP fell.
4. **Money ratio** = positive money flow / negative money flow.
5. **MFI** = 100 − 100 / (1 + money ratio).

*n* is 14 by default on TradingView and in Gainium.

How to read it:

- **Above 80 (overbought), below 20 (oversold):** the classic levels. On BTC/USDT 4h MFI spends about 3% of its time over 80 and about 6% under 20. StockCharts treats readings above 90 and below 10 as truly extreme.
- **In a strong trend** MFI can stay above 80 or below 20 while price keeps going.
- **Divergence:** price makes a lower low while MFI makes a higher low (bullish), or the opposite at highs (bearish).
- **Failure swing:** MFI rises above 80, falls back, fails to return above 80 and then breaks its own recent low. The mirror at 20 is bullish.
- **MFI against RSI:** both use the same scale. When MFI sits well below RSI on a dip, the selling came on heavy volume.

![Money Flow Index (14) on BINANCE:BTCUSDT 4h, dark theme: the purple MFI line swings between about 5 and 95, with dashed bands at 80 and 20](https://content.gainium.io/images/content/indicators/mfi__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and MFI is compared with its own Percentile over the last Lookback candles. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Length | 14 | Candles of money flow summed on each side, 1 to 200. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. |
| Value | 70 | The MFI level, 0 to 100. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** The default, Crossing down through **Value** 70 on 1 hour, fires about nine times as often on BTC/USDT as the oversold entry on this page. For that entry, use Crossing up 20 on 4 hours.

**Tip:** **Length** 7 triples the oversold signals. On BTC/USDT 4h, MFI(7) gives about three times as many crosses up through 20 as Length 14, and Length 21 about 40% as many.

![MFI Length 14 vs 7 on BINANCE:BTCUSDT 4h: the MFI(7) line in the lower panel swings to 20 and 80 far more often than the MFI(14) line above it](https://content.gainium.io/images/content/indicators/mfi__tip-length.webp)

*MFI Length 14 vs 7, BTC/USDT 4h: in this chart MFI(7) crosses 20 about 4.5× as often as MFI(14).*

**Tip:** **Value** 30 instead of 20 at Length 14 gives about two and a half times as many crosses up on 4h.

## Trading setups for bots

### MFI back above 20 for long DCA deals

- **Entry:** MFI(14) crossing up through 20.
- **Exit:** take profit 2%. An MFI exit at 80 is too far away: on 4h MFI crosses back under 80 a little less often than it crosses up through 20.
- **Settings:** Length 14, Interval 4 hours, Condition Crossing up, Value 20.
- **Timeframe:** 4 hours. On BTC/USDT, price traded 2% above the entry within 12 bars after about half the signals. In the second example on the chart it fired at 63,974, and price rose 9.4% in the next 8 bars.
- **When it fails:** a selloff where volume keeps rising. In the first example on the chart MFI crossed 20 at 78,850. Price fell to 60,000 about 24 bars later (−23.9%), and the 2% take profit was reached only after price had recovered the whole fall. Size DCA orders for a slide of that depth, or add RSI(14) lower than 35 in the same group so the bot only buys deeper dips.

![Annotated BINANCE:BTCUSDT 4h chart with MFI(14): a cross above 20 at 78,850 before the fall to 60,000, and a later cross at 63,974 before a 9.4% rise](https://content.gainium.io/images/content/indicators/mfi__oversold.webp)

### Bullish divergence confirmed by MFI over 50

- **Entry:** two conditions in the same group. The **Divergences** indicator with only Money Flow Index (MFI) selected, Type of divergence Bullish, Min number of divergences 1, Interval 1 day and Keep true 10. And MFI crossing up through 50 on 1 day. The deal starts when money flow turns positive within 10 daily bars of a flagged divergence.
- **Exit:** take profit 6 to 8%.
- **Settings:** Divergences: Oscillators Money Flow Index (MFI), Type of divergence Bullish, Min number of divergences 1, Interval 1 day, Keep true 10. MFI: Length 14, Interval 1 day, Condition Crossing up, Value 50.
- **Timeframe:** 1 day. Bullish MFI divergences are rare on the BTC/USDT daily chart, and a little over half of them pass the MFI 50 test. The best, in the chart above: entry six bars after the divergence at 73,025, and a high 12.7% above it within 20 bars.
- **When it fails:** without the confirmation, a divergence is an early guess. In the other example on the chart MFI flagged a bullish divergence at 88,347, and price fell 29% within ten bars. MFI never crossed 50 in that window, so this setup stayed out. Another confirmed entry, at 86,620, still lost 3.3% over 20 bars.

![Annotated BINANCE:BTCUSDT daily chart with MFI(14): a divergence at 88,347 that MFI never confirmed before a 29% fall, and a later divergence confirmed six bars afterwards at 73,025](https://content.gainium.io/images/content/indicators/mfi__divergence.webp)

## Using the Money Flow Index in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For exits, set the take profit or stop loss type to **Indicators**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Money Flow Index (MFI)**. It is listed under Volume.

![The Select start indicator dialog in the Gainium bot form, searched for MFI, with Money Flow Index (MFI) ringed under Volume](https://content.gainium.io/images/content/indicators/mfi__picker.webp)

The fields and their defaults:

- **Use percentile:** off. When on, the condition fires at a percentile of MFI's last **Lookback** bars (default 150) instead of a fixed value; **Percentile** defaults to 80. See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Length:** 14, from 1 to 200.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA smooth the MFI line; **Smoothing length** defaults to 14. **Compare** chooses between *Smoothed line vs value* (default) and *Line vs smoothed line*. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 70, from 0 to 100. With Between, an **Upper value** appears.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

![The MFI settings card in the Gainium bot form with its defaults: Use percentile off, Length 14, Interval 1 hour, Smoothing None, Condition Crossing down, Value 70, Keep true 0](https://content.gainium.io/images/content/indicators/mfi__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the MFI pane below price](https://content.gainium.io/images/content/indicators/mfi__bot-chart.webp)

**Example configuration** (the oversold setup): Deal start condition Indicators, MFI with Use percentile off, Length 14, Interval 4 hours, Smoothing None, Condition Crossing up, Value 20, Keep true 0. Take profit 2%, with DCA orders below the entry.

## Related indicators

- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): the same formula without volume; a gap between the two shows whether volume backed the move.
- [Divergences](https://gainium.io/indicators/divergences-indicator): detects MFI divergences, one of the three signals Quong and Soudack used.
- [Volume Oscillator](https://gainium.io/indicators/volume-oscillator): volume alone, to check whether an MFI move came on rising or falling volume.
- [Oscillator Crossover](https://gainium.io/indicators/oscillator-crossover): triggers when MFI crosses RSI, CCI or the Volume Oscillator.
