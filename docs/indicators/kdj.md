---
id: 1053
name: KDJ Indicator
slug: kdj
description: >-
  Use the KDJ indicator in Gainium bots: the Stochastic's K and D lines plus J =
  3K − 2D, with conditions on any line against another line or a level and an
  optional zone filter.
createdAt: '2026-10-29T12:00:00.000Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2026-10-29T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - momentum
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  KDJ is a Stochastic with a third line. K and D show where the close sits in
  the high-low range of the last 9 candles, smoothed twice, and J = 3K − 2D
  runs ahead of them and can leave the 0 to 100 range. Gainium's KDJ condition
  tests K, D or J against another line or a fixed value, by crossing up,
  crossing down, greater than or lower than, with the Stochastic's zone filter.
  The default fires when K crosses up D anywhere on 1-hour candles. On BTC/USDT
  1h, J crosses up through 0 about a quarter as often as K crosses D.
kind: native
catalogKeys:
  - KDJ
category: momentum
aliases:
  - "KDJ"
  - "KDJ Indicator"
  - "Stochastic KDJ"
  - "J line"
faq:
  - title: What do K, D and J mean?
    details: >-
      K is a smoothed reading of where the close sits in the range of the last
      Length candles, from 0 at the lowest low to 100 at the highest high. D is
      K smoothed again. J = 3K − 2D, three times K's lead over D added to D, so
      it moves first and can go above 100 or below 0.
  - title: Is a J cross of D an earlier signal than a K cross of D?
    details: >-
      No. J − D is exactly 3 × (K − D), so J crosses D on the same candles as K
      does. J gets ahead of the other lines when you compare it with a fixed
      value, such as J crossing up 0 or down 100.
  - title: How is KDJ different from the Stochastic Oscillator?
    details: >-
      Both start from the same raw reading. KDJ smooths it with a slower
      average (each new value counts one third with the default 3), adds the J
      line, and defaults to 9 candles instead of 14. On BTC/USDT 1h,
      Stochastic (14, 1, 3) gives about 2.4 times as many K and D crosses as
      KDJ (9, 3, 3).
  - title: Does Gainium's KDJ match TradingView?
    details: >-
      It matches the open-source TradingView script KDJ Indicator by
      iamaltcoin when both smoothing lengths equal its single signal length,
      3 by default. Gainium shows no value for the first 63 candles of
      history, so the starting point never moves the numbers.
related:
  - stoch
  - stochrsi
  - williams-r
  - rsi
sources:
  - title: StockCharts ChartSchool, Stochastic Oscillator (Fast, Slow and Full), George Lane's %K and %D
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/stochastic-oscillator-fast-slow-and-full
  - title: TradingView community script, KDJ Indicator by iamaltcoin (open source; RSV, K and D smoothing and J = 3K − 2D, default 9 and 3)
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

KDJ is the Stochastic Oscillator with a third line, J, that runs ahead of the other two. Traders use K crossing D near the bottom of the range as a long entry and J's dips under 0 as an oversold signal. In Gainium a bot can test any of the three lines against another line or a fixed value.

## What is the KDJ indicator

KDJ comes from George Lane's Stochastic Oscillator of the 1950s and is the version Asian charting packages ship. It is built in three steps over *n* candles (**Length**, 9 by default):

1. **RSV** = 100 × (Close − Lowest low of *n*) / (Highest high of *n* − Lowest low of *n*). It is the Stochastic's raw %K: 0 when the close is at the bottom of the range, 100 at the top.
2. **K** = (RSV + (*m₁* − 1) × previous K) / *m₁*, and **D** = (K + (*m₂* − 1) × previous D) / *m₂*. *m₁* is **Smooth K** and *m₂* is **Smooth D**, both 3 by default. With 3, each new value counts one third.
3. **J** = 3 × K − 2 × D.

Gainium matches the open-source TradingView script KDJ Indicator by iamaltcoin to two decimals when Smooth K and Smooth D both equal the script's signal length. That script starts K and D at 0. Gainium starts them at 50 and shows no value until that starting point has faded below a millionth, which takes 63 candles with the defaults. When the high and low of the window are equal, Gainium keeps the previous RSV instead of leaving a gap.

How to read it:

- **K and D under 20:** the close has been near the bottom of the 9-candle range. **Over 80:** near the top.
- **K crossing D:** K turning up through D says the closes have started rising inside the range.
- **J leads and overshoots.** It is not clamped. On BTC/USDT 1h, J is above 100 on about 5% of candles and below 0 on about 4%.
- **J crosses D only when K does.** J − D = 3 × (K − D), so the three lines cross at the same candle. J is useful against a fixed value, not against D.

![KDJ Indicator (9, 3) by iamaltcoin on BINANCE:BTCUSDT 1h, dark theme: the orange K, green D and magenta J lines under price, with J swinging past 100 and below 0 while K and D stay inside the range](https://content.gainium.io/images/content/indicators/kdj__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 9 | Candles whose highest high and lowest low frame the close (RSV), 1 to 500. |
| Interval | 1 hour | Candle size KDJ is calculated on, from 1 minute to 1 week. |
| Smooth K | 3 | Smoothing of RSV into K, 1 to 100. Each new value counts 1 / Smooth K. |
| Smooth D | 3 | Smoothing of K into D, 1 to 100. |
| Line | k | The line the condition tests: K, D or J. |
| Condition | crossing up | crossing up and crossing down fire on the candle where the line passes what it is compared to. greater than and lower than hold on every candle on that side. |
| Compared to | d | One of the two other lines, or Custom value for a fixed level. It never offers the line chosen in Line. |
| Value | 20 | The fixed level, shown only with Custom value. It is not clamped, so J can be compared with 0 or 100. |
| Zone | Anywhere | Where both compared lines must be, on the cross candle and the one before: Lower (under Lower band), Upper (over Upper band), Lower&Upper (either) or Anywhere. Hidden with Custom value. |
| Lower band | 20 | Zone Lower and Lower&Upper: both lines must be strictly under this level. |
| Upper band | 80 | Zone Upper and Lower&Upper: both lines must be strictly over this level. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Zone** Lower with a **Lower band** of 20 keeps few crosses. On BTC/USDT 1h, about one K-crosses-up-D in 27 has both lines under 20; with a band of 30 it is about one in five.

**Tip:** **Line** J with **Compared to** Custom value and **Value** 0 gives an oversold signal that fires about a quarter as often as K crossing D anywhere on BTC/USDT 1h, and about a third more often than K crossing D with Zone Lower and a band of 30.

**Tip:** **Interval** 1 hour instead of 4 hours gives about four times as many K and D crosses on BTC/USDT.

## Trading setups for bots

### J hook up from under 0

J dips under 0 when K drops fast below D near the bottom of the range. The cross back up through 0 is the first sign the drop is slowing.

- **Entry:** KDJ, Line **J**, Compared to **Custom value**, Value **0**, Condition **crossing up**, Interval 1 hour.
- **Exit:** take profit 1%.
- **Settings:** Length 9, Smooth K 3, Smooth D 3.
- **Timeframe:** 1 hour. On 4 hours the rule fires about a quarter as often. On BTC/USDT 1h, price reached the 1% take profit within 24 candles after about 57% of signals.
- **When it fails:** in a slide, J crosses 0 more than once. Price also fell 1% within 24 candles after about 62% of signals, often before it rose. Give the deal DCA orders for at least a 1% drop. In the chart below, a cross at 80,328 rose 0.8% at best and was 1.2% under the entry the next day.

In the chart below, J crossed up through 0 at 80,860, and the 1% take profit filled three hours later.

![Annotated BINANCE:BTCUSDT 1h chart with KDJ: J crosses up 0 at 80,860 and the 1% take profit fills 3 hours later; an earlier J cross up 0 at 80,328 peaks 0.8% higher and ends 1.2% under the entry the next day](https://content.gainium.io/images/content/indicators/kdj__j-zero.webp)

### K and D cross in the lower zone

The zone filter keeps only the crosses that happen near the bottom of the range.

- **Entry:** KDJ, Line **K**, Condition **crossing up**, Compared to **D**, Zone **Lower**, Lower band **30**, Interval 4 hours. Both lines must be under 30 on the cross candle and the one before.
- **Exit:** take profit 1.5%.
- **Settings:** Length 9, Smooth K 3, Smooth D 3. A band of 20 keeps about a fifth of the crosses that 30 keeps.
- **Timeframe:** 4 hours. On BTC/USDT, price reached +1.5% within 12 candles after about 58% of these crosses.
- **When it fails:** the zone makes the signal rarer, not more reliable. Every K-crosses-D on 4 hours reached +1.5% within 12 candles about as often, at about 60%. In a slide the lines cross again and again under 30: in the chart below, crosses at 81,692 and 80,489 came during a fall of 3% from the first.

In the chart below, K crossed up D with both under 30 at 81,776, and the 1.5% take profit filled 16 hours later.

![Annotated BINANCE:BTCUSDT 4h chart with KDJ and a line at 30: K crosses up D under 30 at 81,776 and the 1.5% take profit fills 16 hours later; two later crosses at 81,692 and 80,489 come during a 3% slide](https://content.gainium.io/images/content/indicators/kdj__zone-cross.webp)

## Using the KDJ indicator in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or set the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit** on the condition, then **Change indicator**, search for **KDJ** and pick **KDJ Indicator** from the Momentum category.

![The Select start indicator dialog in the Gainium bot form, searched for KDJ, with the KDJ Indicator card in the Momentum category](https://content.gainium.io/images/content/indicators/kdj__picker.webp)

The fields and their defaults:

- **Length:** 9, from 1 to 500.
- **Interval:** 1 hour.
- **Smooth K:** 3, from 1 to 100.
- **Smooth D:** 3, from 1 to 100.
- **Line:** K. Or D or J.
- **Condition:** crossing up. Or crossing down, greater than or lower than.
- **Compared to:** D. Or the other remaining line, or Custom value.
- **Value:** 20. Shown with Custom value.
- **Zone:** Anywhere. Or Lower, Upper or Lower&Upper, which show **Lower band** (20) and **Upper band** (80). Hidden with Custom value.
- **Keep true:** 0 extra candles.

![The KDJ settings card in the Gainium bot form with its defaults: Length 9, Interval 1 hour, Smooth K 3, Smooth D 3, Line K, Condition crossing up, Compared to D, Zone Anywhere, Keep true 0](https://content.gainium.io/images/content/indicators/kdj__settings.webp)

The bot-form chart draws K, D and J in a pane under price.

![The Gainium bot-form chart, BTC/USDT 1h, with KDJ 9 3 3: the blue K, orange D and purple J lines in a pane under price](https://content.gainium.io/images/content/indicators/kdj__bot-chart.webp)

KDJ works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. The backtest draws it on every deal chart.

![A Gainium backtest of a long DCA bot on BTC/USDT 1h with a KDJ start condition: the deal list on the left and the deal chart with the KDJ pane](https://content.gainium.io/images/content/indicators/kdj__backtest.webp)

Example configuration for the first setup: Length 9, Interval 1 hour, Smooth K 3, Smooth D 3, Line J, Condition crossing up, Compared to Custom value, Value 0, Keep true 0, take profit 1%.

## Related indicators

- [Stochastic Oscillator](https://gainium.io/indicators/stoch): the same raw reading with simple-average smoothing, a 14-candle default and no J line.
- [Stochastic RSI](https://gainium.io/indicators/stochrsi): the Stochastic formula run on RSI instead of price.
- [Williams %R](https://gainium.io/indicators/williams-r): the raw reading upside down, from −100 to 0, without smoothing.
- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): a slower oversold signal from average gains and losses.
