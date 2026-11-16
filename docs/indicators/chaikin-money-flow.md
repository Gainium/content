---
id: 1060
name: Chaikin Money Flow (CMF)
slug: chaikin-money-flow
description: >-
  Use Chaikin Money Flow in Gainium bots: where each candle closed inside its
  range, weighted by volume and summed over 20 candles, from −1 to +1, as an
  entry or a filter.
createdAt: '2026-11-16T12:00:00.000Z'
updatedAt: '2026-11-16T12:00:00.000Z'
publishedAt: '2026-11-16T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - volume
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  Chaikin Money Flow (CMF) measures where candles closed inside their
  high-low range, weighted by volume, over 20 candles. It runs from −1 to +1:
  above 0 more volume closed near the highs, below 0 near the lows. Marc
  Chaikin built it from his Accumulation/Distribution Line. A bot can test CMF
  against a level: crossing up, crossing down, greater than or lower than. The
  default buys when CMF crosses up through 0 on 1-hour candles. A daily CMF
  over 0.05 also works as a filter for faster entries.
kind: native
catalogKeys:
  - CMF
category: volume
aliases:
  - "CMF"
  - "Chaikin Money Flow"
  - "Chaikin Money Flow Index"
  - "Money flow volume"
faq:
  - title: What does a CMF of 0.1 mean?
    details: >-
      Over the last 20 candles, the volume-weighted average close sat 10% of
      the way from the middle of each candle's range toward its high. Readings
      past 0.25 or under −0.25 are rare on BTC/USDT 4h: 90% of readings fall
      between about −0.17 and +0.26.
  - title: How is CMF different from MFI?
    details: >-
      MFI compares volume on candles whose typical price rose with volume on
      candles where it fell, and reads 0 to 100. CMF looks at where each
      candle closed inside its own range, so a candle that rose but closed
      near its low counts as selling. It reads −1 to +1, with 0 as the middle.
  - title: Why is CMF 0 on my pair when TradingView shows nothing?
    details: >-
      When no volume traded in the 20 candles, there is no money flow either
      way. TradingView leaves the value empty; Gainium returns 0 so the
      condition still has a number to test.
  - title: Can Gainium detect CMF divergences?
    details: >-
      Yes. Add the Divergences indicator and select Chaikin Money Flow (CMF)
      under Oscillators. It uses a CMF of length 20. CMF is not in the
      Divergences indicator's default set, so you have to add it.
related:
  - mfi
  - on-balance-volume
  - rsi
  - divergences-indicator
sources:
  - title: StockCharts ChartSchool, Chaikin Money Flow (CMF), Marc Chaikin
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/chaikin-money-flow-cmf
  - title: TradingView Help Center, Chaikin Money Flow (CMF)
    url: https://www.tradingview.com/support/solutions/43000501974-chaikin-money-flow-cmf/
  - title: Binance BTC/USDT 4h and 1d candles, computed with Gainium's indicator engine
---

Chaikin Money Flow (CMF) measures where candles closed inside their high-low range, weighted by volume, on a scale from −1 to +1. Traders read it above 0 as buying pressure and below 0 as selling pressure. In Gainium a bot can enter on CMF crossing a level, or use a daily CMF as a filter for faster entries.

## What is Chaikin Money Flow

Marc Chaikin built CMF from his Accumulation/Distribution Line. Gainium's line matches TradingView's built-in Chaikin Money Flow.

For each candle:

1. **Money flow multiplier** = ((close − low) − (high − close)) / (high − low). It is +1 for a close at the high, −1 at the low and 0 in the middle. A candle with no range counts as 0.
2. **Money flow volume** = multiplier × volume.

Then, over *n* candles, 20 by default:

**CMF = Σ money flow volume / Σ volume**

How to read it:

- **Above 0:** volume closed nearer the highs than the lows over the last 20 candles. On BTC/USDT 4h, CMF is above 0 on about 60% of candles.
- **Below 0:** volume closed nearer the lows.
- **Distance from 0:** 90% of BTC/USDT 4h readings fall between about −0.17 and +0.26, so 0.25 is already a strong reading.
- **The close inside the range is what counts, not the change.** A candle that gaps up and closes near its low adds to selling pressure.
- **No volume:** when the volume over the 20 candles sums to 0, Gainium returns 0. TradingView shows no value there.

![Chaikin Money Flow (20) on BINANCE:BTCUSDT 4h, dark theme: the green CMF line swings between about −0.2 and +0.25 around the dashed zero line while price falls](https://content.gainium.io/images/content/indicators/chaikin-money-flow__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 20 | Candles whose money flow volume and volume are summed, 1 to 1,000. |
| Interval | 1 hour | Candle size CMF is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Condition | Crossing up | Crossing up and crossing down fire on the candle where CMF passes Value. Greater than and Lower than hold on every candle on that side. |
| Value | 0 | The CMF level, from −1 to +1, in steps of 0.01. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Length** 10 gives about 1.5 times as many crosses of 0 as Length 20 on BTC/USDT 4h, and Length 40 about 0.7 times as many.

**Tip:** **Value** 0.05 with Greater than holds on about 46% of BTC/USDT 4h candles. Raise it to 0.1 or more when you want the condition true only on clear buying pressure.

**Tip:** **Interval** 1 day with Greater than 0.05 changes slowly. In the same group as a 4-hour entry, it acts as a trend filter: the entry can fire only while the daily money flow is positive.

## Trading setups for bots

### CMF crosses up through 0

The default condition: money flow turns from selling to buying.

- **Entry:** Chaikin Money Flow (CMF), Length **20**, Condition **Crossing up**, Value **0**, Interval 4 hours.
- **Exit:** take profit 2%.
- **Settings:** Length 20. On 4h, CMF crosses 0 often, and many crosses fall back below 0 on the next candles.
- **Timeframe:** 4 hours. On BTC/USDT, price reached +2% within 12 candles after about half the crosses, the same share as after any 4-hour candle. The cross on its own does not pick direction.
- **When it fails:** at the end of a rally, the candle that makes the high closes near its top and lifts CMF through 0. In the chart below, a cross at 84,540 came on the high, and price fell 4.3% within 12 candles.

In the chart below, a cross at 78,140 reached a high 3.9% above it two candles later.

![Annotated Chaikin Money Flow chart, BINANCE:BTCUSDT 4h: a cross up through 0 at 84,540 on the high, followed by a 4.3% drop, and a cross up at 78,140 that reached 3.9% two candles later](https://content.gainium.io/images/content/indicators/chaikin-money-flow__zero-cross.webp)

### Daily CMF as a filter for RSI dips

Buy 4-hour dips only while the daily money flow is positive.

- **Entry:** two conditions in the same group with AND. RSI(14) **Crossing up** 30 on 4 hours. And Chaikin Money Flow, Length 20, Condition **Greater than**, Value **0.05**, Interval **1 day**.
- **Exit:** take profit 2%.
- **Settings:** Value 0.05 on 1 day. The filter keeps about a quarter of the RSI crosses on BTC/USDT.
- **Timeframe:** 4 hours for the RSI, 1 day for CMF.
- **When it fails:** the filter picks dips in active markets, not safe ones. On BTC/USDT, price reached +2% within 12 candles after about 65% of the filtered RSI crosses, against 61% for all RSI crosses. But a 3% drop also came within 12 candles after about 60% of the filtered crosses, against 51% for all. Size the DCA orders for a 3% slide. Daily CMF also lags: in the chart below it rose above 0.05 only after price had already jumped from about 64,700 to 73,000.

In the chart below, daily CMF stayed under 0.05 through the slide on the right, so the 4-hour RSI cross at 74,372 did not open a deal. Price was about 8% lower four days later.

![Annotated Chaikin Money Flow chart, BINANCE:BTCUSDT 1D, with a dashed line at 0.05: CMF above 0.05 in a green box after the rally, and under 0.05 in a red box through the slide, where the RSI cross at 74,372 is blocked](https://content.gainium.io/images/content/indicators/chaikin-money-flow__filter.webp)

## Using Chaikin Money Flow in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or set the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit** on the condition, then **Change indicator**, search for **Chaikin** and pick **Chaikin Money Flow (CMF)** from the Volume category.

![The Select start indicator dialog in the Gainium bot form, searched for Chaikin, with the Chaikin Money Flow (CMF) card ringed under Volume](https://content.gainium.io/images/content/indicators/chaikin-money-flow__picker.webp)

The fields and their defaults:

- **Length:** 20, from 1 to 1,000.
- **Interval:** 1 hour.
- **Condition:** Crossing up. Or Crossing down, Greater than or Lower than.
- **Value:** 0, from −1 to +1.
- **Keep true:** 0 extra candles.

![The Chaikin Money Flow (CMF) settings card in the Gainium bot form with its defaults: Length 20, Interval 1 hour, Condition Crossing up, Value 0, Keep true 0](https://content.gainium.io/images/content/indicators/chaikin-money-flow__settings.webp)

CMF works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. For CMF divergences, add the Divergences indicator and select Chaikin Money Flow (CMF) under Oscillators.

Example configuration for the filter setup: RSI Length 14, Interval 4 hours, Condition Crossing up, Value 30; Chaikin Money Flow Length 20, Interval 1 day, Condition Greater than, Value 0.05, Keep true 0; take profit 2%.

## Related indicators

- [Money Flow Index (MFI)](https://gainium.io/indicators/mfi): volume weighted by the change in typical price, on a 0 to 100 scale.
- [On-Balance Volume (OBV)](https://gainium.io/indicators/on-balance-volume): a running volume total signed by the close's direction, compared with its own average.
- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): the timing condition in the filter setup.
- [Divergences](https://gainium.io/indicators/divergences-indicator): finds CMF divergences from price when CMF is selected as an oscillator.
