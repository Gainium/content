---
id: 74
name: Relative Strength Index (RSI)
slug: rsi
description: >-
  In this article, we explain what is the RSI indicator and how it can be used
  in bot trading.
createdAt: '2023-04-11T17:49:23.152Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-14T07:29:26.368Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.024Z'
templateVersion: 2
tldr: >-
  The Relative Strength Index (RSI) compares average gains with average losses
  over a lookback and plots the result from 0 to 100. Readings under 30 mean
  sellers dominated recent bars, readings over 70 mean buyers did. In Gainium
  the RSI is the default indicator condition, with Length 7 on 1-hour candles.
  On BTC/USDT 4h, RSI(7) gives about three times as many crosses up through
  30 as Wilder's RSI(14), so the length decides how many deals a long DCA bot
  starts. You can also
  smooth the RSI, compare it with its own moving average, or test it as a
  percentile of its recent range.
kind: native
catalogKeys:
  - RSI
category: momentum
aliases:
  - "RSI"
  - "Relative Strength Index"
  - "RSI indicator"
  - "Wilder RSI"
faq:
  - title: What RSI length should I use for a crypto bot?
    details: >-
      Gainium starts at Length 7, which reaches the extremes far more often
      than Wilder's 14. On BTC/USDT 4h, RSI(7) crosses up through 30 about
      three times as often as RSI(14). Use 14 when you want fewer, more
      stretched signals per pair, and 7 when the bot needs more deals and its
      DCA orders can absorb the extra bad entries.
  - title: Is RSI under 30 a buy signal on its own?
    details: >-
      Not reliably. On BTC/USDT 4h, price was higher six bars later after only
      about half of RSI(14)'s crosses up through 30. The signal finds
      stretched moments; the bot's DCA orders and take profit do the rest.
  - title: How is RSI different from Stochastic RSI?
    details: >-
      RSI measures gains against losses. Stochastic RSI takes the RSI and
      shows where it sits inside its own high-low range, so it swings from 0
      to 100 in a few bars. On BTC/USDT 4h, Stochastic RSI spends about half
      its time under 20 or over 80; RSI(14) spends about 10% of its time
      under 30 or over 70.
  - title: Can a Gainium bot trade RSI divergences?
    details: >-
      Yes, through the separate Divergences indicator. Select only RSI under
      Oscillators, set Min number of divergences to 1 and pick Bullish or
      Bearish. The RSI condition itself only tests levels and crosses.
  - title: Why does my bot's RSI differ from the one on my TradingView chart?
    details: >-
      Check three settings. Gainium defaults to Length 7 and TradingView to
      14. The bot reads the candles of its Interval field, not of the chart
      you are looking at. With Smoothing on, the bot tests the smoothed line,
      which TradingView only draws if you add it.
related:
  - stochrsi
  - divergences-indicator
  - macd
  - mfi
sources:
  - title: J. Welles Wilder Jr., New Concepts in Technical Trading Systems (1978)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi
  - title: StockCharts ChartSchool, Relative Strength Index (RSI)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi
  - title: TradingView Help Center, Relative Strength Index (RSI)
    url: https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/
  - title: Gainium, Indicator Smoothing
    url: https://gainium.io/help/indicator-smoothing
  - title: Gainium, Indicator Percentiles
    url: https://gainium.io/help/indicator-percentiles
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

The Relative Strength Index (RSI) compares the size of recent gains with recent losses on a 0 to 100 scale. Traders use it to buy after a sell-off and to sell into a rally: the most common bot rule is RSI crossing up through 30. In Gainium it is the indicator a bot adds first when you switch its start condition to Indicators.

## What is RSI

J. Welles Wilder Jr. published the RSI in 1978, in *New Concepts in Technical Trading Systems*. It is calculated from closing prices in four steps:

1. **Change** = this bar's close minus the previous close. A positive change is a *gain*, a negative one is a *loss* (taken as a positive number). The other side counts as 0 on that bar.
2. **Average gain** and **average loss** over *n* bars use Wilder's smoothing: the first value is a simple average of *n* bars, then each new value is `(previous average × (n − 1) + current value) / n`.
3. **RS** = average gain / average loss.
4. **RSI** = 100 − 100 / (1 + RS).

Wilder used *n* = 14 with levels at 70 and 30. That is still TradingView's default. Gainium's default is Length 7, which reacts faster.

How to read it:

- **Under 30 (oversold):** losses outweighed gains over the lookback. On BTC/USDT 4h, RSI(14) spends about 5% of its candles under 30 and about as many over 70.
- **Over 70 (overbought):** gains dominated. In a strong trend RSI can stay over 70 for dozens of candles, so a reading of 75 alone is not a reason to sell.
- **50 line:** above 50, average gains exceed average losses. Crosses of 50 mark the bias, not a turning point.
- **Divergence:** price makes a lower low while RSI makes a higher low (bullish), or the opposite at highs (bearish). The selling or buying is getting weaker.
- **Length changes everything.** RSI(7) on BTC/USDT 4h spends about two and a half times as many candles under 30 as RSI(14).

![RSI(14) on BINANCE:BTCUSDT 4h, dark theme: the purple RSI line moves between roughly 20 and 90, with the 70 and 30 bands and TradingView's yellow moving average of the RSI](https://content.gainium.io/images/content/indicators/rsi__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Use percentile | Off | Off: the condition tests the fixed Value. On: Value hides and RSI is compared with its own Percentile over the last Lookback candles. |
| Lookback | 150 | Candles of the line's own history the percentile is taken from. Percentile mode only. |
| Percentile | 80 | The rank in that history used as the level: 80 is a level that only 20% of readings exceeded. Percentile mode only. |
| Length | 7 | The n of Wilder's average, 1 to 1,000. TradingView's default is 14. |
| Interval | 1 hour | Candle size the indicator is calculated on, from 1 minute to 1 week. It does not follow the chart you are looking at. |
| Smoothing | None | A moving average put on the line. With smoothing on, the condition tests the smoothed line. |
| Smoothing length | 14 | Candles in the smoothing average, 1 to 1,000. |
| Compare | Smoothed line vs value | Smoothed line vs value tests the smoothed line against Value. Line vs smoothed line tests the raw line against its own average; Value hides and Between is never true. |
| Condition | Crossing down | Crossing up and Crossing down fire on the one candle where the line passes Value. Greater than and Lower than hold on every candle on that side. Between holds while the line is inside Value and Upper value. |
| Value | 70 | The RSI level, 0 to 100. |
| Upper value | — | Between only: the second bound. The line must be strictly between the two. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Length** 7, Gainium's default, crosses the extremes about three times as often as TradingView's 14. On BTC/USDT 4h, RSI(7) gives about three times as many crosses up through 30 as RSI(14).

![RSI Length 14 vs 7 on BINANCE:BTCUSDT 4h: the RSI(7) line in the lower panel crosses the 30 band many more times than the RSI(14) line in the upper panel](https://content.gainium.io/images/content/indicators/rsi__tip-length.webp)

*RSI Length 14 vs 7, BTC/USDT 4h: in this chart RSI(7) crosses 30 about seven times as often as RSI(14).*

**Tip:** The default condition, Crossing down through **Value** 70 on 1 hour, is an exit-style signal. With Length 7 it fires more than ten times as often as the 4-hour oversold entry below. For a dip entry, set Condition to Crossing up and Value to 30.

**Tip:** **Use percentile** with Percentile 10 and Crossing up lets the oversold level follow the market. On BTC/USDT 4h, RSI(14) crossing up through its own 10th percentile of 150 candles fires about two and a half times as often as a cross of a fixed 30.

**Tip:** **Smoothing** SMA 14 with Compare *Smoothed line vs value* tests a much slower line. On 4h, smoothed RSI(14) crosses up through 30 about an eighth as often as the raw RSI(14). For turns, use *Line vs smoothed line*.

## Trading setups for bots

### Oversold bounce for a long DCA bot

- **Entry:** RSI(14) crossing up through 30 starts a deal. The cross, not "RSI under 30", so the bot waits for the first bar where selling eases.
- **Exit:** a fixed take profit of 1.5 to 2%. Keep the DCA orders: they carry the deals that keep falling after the signal.
- **Settings:** Length 14, Interval 4 hours, Condition Crossing up, Value 30, Keep true 0.
- **Timeframe:** 4 hours. On 1 hour the same rule fires about five times as often.
- **When it fails:** in a steady downtrend RSI crosses up through 30, rolls over and price keeps falling. Price was higher six bars later after only about half the signals, and a 2% take profit was reached within 12 bars about half the time.

![Annotated BINANCE:BTCUSDT 4h chart with RSI(14): signal 1 crosses up through 30 at 61,701 and reaches a 2% take profit two bars later; signal 2 at 61,078 first drops to 58,115 and takes about 48 bars to reach the take profit](https://content.gainium.io/images/content/indicators/rsi__oversold-bounce.webp)

### RSI turning up through its own average

- **Entry:** two RSI conditions in the same group, so both must hold. The first is RSI(14) crossing up through its 14-bar SMA. The second is RSI(14) lower than 40, so the turn only counts while momentum is still weak.
- **Exit:** a take profit of about 1.5% on 1-hour deals, or the overbought exit below.
- **Settings:** condition 1: Length 14, Smoothing SMA, Smoothing length 14, Compare *Line vs smoothed line*, Condition Crossing up. Condition 2: Length 14, Smoothing None, Condition Lower than, Value 40. Both on the same Interval.
- **Timeframe:** 1 hour. On 4 hours the same two conditions fire about a sixth as often.
- **When it fails:** a turn of the RSI is not a turn of price. When RSI crosses its average during a slide, the next leg down takes the deal under water. In the example on the chart, the rule fired at 81,640 and price fell 2.3% to 79,800 within 12 bars.

![Annotated BINANCE:BTCUSDT 1h chart with RSI(14) and its 14-bar average: a cross at 37 that is 2.5% higher 17 bars later, and a cross at 33 that drops 2.3% first](https://content.gainium.io/images/content/indicators/rsi__ma-turn.webp)

### Overbought exit on the daily chart

- **Entry:** any. This is an exit rule for long deals that you hold through a trend.
- **Exit:** set the take profit to Indicators with daily RSI(14) crossing down through 70. The deal closes on the first daily close back under 70.
- **Settings:** Length 14, Interval 1 day, Condition Crossing down, Value 70.
- **Timeframe:** 1 day. It is rare: about one exit for every six entries of the 4-hour oversold bounce above.
- **When it fails:** in a trending market RSI drops under 70, price pauses and then goes higher. In the chart above, one exit closed at 77,682 before price went on to 87,395. The same rule also closed at 95,605, well before price fell to 70,580.

![Annotated BINANCE:BTCUSDT daily chart with RSI(14): a cross down through 70 at 95,605 before a 26% fall, and a later cross that exits early before price rises to 87,395](https://content.gainium.io/images/content/indicators/rsi__overbought-exit.webp)

## Using RSI in Gainium

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. To use RSI for an exit, set the take profit or stop loss type to **Indicators** instead. For DCA orders, set the DCA type to **Indicators** and click **Add DCA Indicator**.
3. Click **Edit** on the condition. If another indicator is selected, click **Change indicator** and pick **Relative Strength Index (RSI)**.

![The Select start indicator dialog in the Gainium bot form, searched for RSI, with Relative Strength Index (RSI) ringed](https://content.gainium.io/images/content/indicators/rsi__picker.webp)

The settings card holds these fields. The defaults are what a new condition starts with:

- **Use percentile:** off. When on, the condition tests where the RSI ranks against its last **Lookback** bars (default 150) instead of a fixed value, and fires at the **Percentile** you set (default 80). See [Indicator Percentiles](https://gainium.io/help/indicator-percentiles).
- **Length:** 7. The *n* of the formula, 1 to 1,000.
- **Interval:** 1 hour. The candle size the RSI is calculated on, from 1 minute to 1 week. It does not have to match the bot's chart.
- **Smoothing:** None. SMA, EMA, WMA, DEMA, TEMA, HMA or RMA put a moving average on the RSI line. **Smoothing length** defaults to 14.
- **Compare:** *Smoothed line vs value* (default) tests the smoothed RSI against Value. *Line vs smoothed line* tests the RSI against its own average; Value is hidden and Between is not offered. See [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 70, from 0 to 100. With Between, an **Upper value** appears and the RSI must stay between the two.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires. Raise it when this RSI condition shares a group with a slower one that needs a few bars to agree.

![The RSI settings card in the Gainium bot form with its defaults: Use percentile off, Length 7, Interval 1 hour, Smoothing None, Condition Crossing down, Value 70, Keep true 0](https://content.gainium.io/images/content/indicators/rsi__settings.webp)

When you click **Done**, the bot chart adds an RSI pane with the condition's level drawn as a dashed line. With smoothing on, the smoothed line is drawn in orange next to the purple RSI.

![The Gainium bot chart on BTC/USDT 1h with the RSI 7 pane below price and the dashed line at the condition's value of 70](https://content.gainium.io/images/content/indicators/rsi__bot-chart.webp)

**Example configuration** (the oversold bounce above): Deal start condition Indicators, RSI with Use percentile off, Length 14, Interval 4 hours, Smoothing None, Condition Crossing up, Value 30, Keep true 0. Take profit 1.5%, with DCA orders below the entry.

## Related indicators

- [Stochastic RSI](https://gainium.io/indicators/stochrsi): applies the stochastic formula to RSI, for entries that need many more signals.
- [Divergences](https://gainium.io/indicators/divergences-indicator): detects RSI divergences inside the bot, which the RSI condition cannot do.
- [MACD](https://gainium.io/indicators/macd): a trend filter in the same group as an RSI entry, so the bot buys dips only while MACD is above its signal line.
- [Money Flow Index (MFI)](https://gainium.io/indicators/mfi): the same 0 to 100 scale, with volume in the formula.
