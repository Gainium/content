---
id: 77
name: Stochastic RSI
slug: stochrsi
description: >-
  In this article, we explain what is the Stoch RSI indicator and how it can be
  used in bot trading.
createdAt: '2023-04-14T15:37:48.812Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-15T04:28:11.100Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.025Z'
templateVersion: 2
tldr: >-
  Stochastic RSI applies the Stochastic formula to RSI values: it shows where
  the current RSI sits between its lowest and highest reading of the last 14 bars,
  on a 0 to 100 scale. It is much faster than RSI. On BTC/USDT 4h its K line
  spends about a quarter of its bars under 20 and another quarter over 80.
  Bots use the K over D cross under 20 for short-term entries and as
  a trigger for DCA orders. In Gainium it has the same K, D and Zone fields as
  the Stochastic, plus an RSI Length.
kind: native
catalogKeys:
  - StochRSI
category: momentum
aliases:
  - "StochRSI"
  - "Stoch RSI"
  - "Stochastic RSI"
faq:
  - title: What is the difference between Stochastic RSI and RSI?
    details: >-
      RSI compares average gains with average losses. Stochastic RSI ranks the
      current RSI inside its own range of the last 14 bars, so a small RSI move
      from 45 to 40 can take Stochastic RSI from 50 to 0. That makes it reach
      20 and 80 over and over on 1-hour charts, where RSI rarely leaves 30 to
      70.
  - title: What do K and D mean in Stochastic RSI?
    details: >-
      K is the raw Stochastic RSI smoothed by Smooth K (3 bars by default). D
      is a moving average of K over Smooth D bars (also 3). The usual trigger
      is K crossing D, filtered by the Zone setting.
  - title: Why does Stochastic RSI sit at 0 or 100 for many bars?
    details: >-
      When RSI makes a new 14-bar low on every bar, the formula returns 0 each
      time, and the opposite at highs. On BTC/USDT 1h, K can stay under 1 for
      up to 7 bars in a row. A flat line at 0 is a trend, not a buy signal; the
      cross up out of it is the signal.
  - title: Which settings match TradingView's Stoch RSI?
    details: >-
      TradingView's defaults are K 3, D 3, RSI length 14 and Stochastic length
      14 on the close. In Gainium that is Length 14, RSI Length 14, Smooth K 3
      and Smooth D 3, which are the defaults.
related:
  - rsi
  - stoch
  - oscillator-crossover
sources:
  - title: Tushar Chande and Stanley Kroll, The New Technical Trader (1994), via StockCharts ChartSchool, StochRSI
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/stochrsi
  - title: TradingView Help Center, Stochastic RSI (STOCH RSI)
    url: https://www.tradingview.com/support/solutions/43000502333-stochastic-rsi-stoch-rsi/
  - title: Binance BTC/USDT 15m, 1h and 4h candles, computed with Gainium's indicator engine
---

Stochastic RSI (StochRSI) shows where the current RSI sits between its lowest and highest value of the last 14 bars, on a 0 to 100 scale. Traders use it for short-term timing, because it reaches its extremes many times more often than RSI does. In a bot it works as a fast entry trigger or as the signal that places DCA orders on a turn instead of at a fixed distance.

## What is Stochastic RSI

Tushar Chande and Stanley Kroll introduced StochRSI in *The New Technical Trader* (1994). Their reason: RSI can stay between 20 and 80 for long periods without ever reaching an extreme. The formula:

1. **RSI** of the close over the RSI length, 14 by default.
2. **StochRSI** = 100 × (RSI − lowest RSI of *n* bars) / (highest RSI of *n* bars − lowest RSI of *n* bars). *n* is the stochastic length, 14 by default. Chande and Kroll plotted it from 0 to 1; TradingView and Gainium scale it to 0 to 100.
3. **K** = a simple moving average of StochRSI over 3 bars.
4. **D** = a simple moving average of K over 3 bars.

TradingView's defaults are K 3, D 3, RSI length 14 and stochastic length 14. Gainium's defaults are the same.

How to read it:

- **Under 20:** RSI is near the bottom of its recent range. **Over 80:** near the top. On BTC/USDT 4h, K spends about a quarter of its bars under 20 and another quarter over 80.
- **K crossing D** out of a zone is the trigger most bots use.
- **Pinned at 0 or 100:** RSI is making a new 14-bar low (or high) on every bar. That is a trend, not a reversal.
- It is fast because it measures RSI against itself. A drop of RSI from 45 to 40 can be enough to take StochRSI from 50 to 0.

![Stochastic RSI (3, 3, 14, 14) on BINANCE:BTCUSDT 4h, dark theme: the blue K line and orange D line travel from 0 to 100 and back many times across the chart, with dashed bands at 80 and 20](https://content.gainium.io/images/content/indicators/stochrsi__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 14 | Candles of RSI history for the stochastic range, 1 to 200. |
| RSI Length | 14 | The length of the RSI that the stochastic formula is applied to, 1 to 200. |
| Interval | 1 hour | Candle size the oscillator is calculated on, from 1 minute to 1 week. |
| First Variable | K | The line that crosses: K or D. |
| Condition | crossing down | crossing up and crossing down fire on the cross candle; greater than and lower than hold on every candle on that side. |
| Second Variable | D | What the first line is compared with: the other line, or Add Custom Value for a fixed level. |
| Enter Value | 1 | The fixed level, shown only with Add Custom Value. It starts at 1, so type the level you want. |
| Smooth D | 3 | Candles in the average of K that makes D. |
| Smooth K | 3 | Candles in the average of raw Stochastic RSI that makes K. |
| Zone | Lower | Where K and D must both be, on the cross candle and the candle before, for the cross to count: Lower, Upper, Lower&Upper or Anywhere. Hidden with Add Custom Value. |
| Lower band | 20 | Zone Lower and Lower&Upper: K and D must stay under this level. |
| Upper band | 80 | Zone Upper and Lower&Upper: K and D must stay over this level. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Upper band** 80 keeps only the crosses near the top of the range. Lowering it to 20 lets about twice as many K-down-D crosses through the Upper zone check on BTC/USDT 4h, half of them from the middle of the range, so leave it at 80 for a short entry or an exit.

**Tip:** **Enter Value** starts at 1. With Add Custom Value, K crossing up through 1 is the moment K leaves the floor at 0. On BTC/USDT 1h it fires a little under half as often as K crossing up through 20.

**Tip:** **Length** and **RSI Length** change the count less than Interval does. On 1h, the Lower zone cross under 20 fires about 13% less often at 7 and 7 than at 14 and 14. Moving to 4 hours at the defaults cuts it to under a third.

## Trading setups for bots

### Fast scalp entry on 15 minutes

- **Entry:** K crossing up D with Zone Lower and a Lower band of 20.
- **Exit:** take profit 0.5 to 0.8%. A 15-minute StochRSI cross is a small turn, and the targets should be small too.
- **Settings:** Length 14, RSI Length 14, Interval 15 minutes, First Variable K, Condition crossing up, Second Variable D, Smooth D 3, Smooth K 3, Zone Lower, Lower band 20.
- **Timeframe:** 15 minutes. It fires about four times as often as the same rule on 1 hour. Price was higher 16 bars later after about half the signals, no better than a coin flip.
- **When it fails:** when the 1-hour trend is down, each 15-minute cross is a pause in the slide. In the example on the chart, the rule fired at 84,275 and price fell 1.9% in the next 14 bars. A second condition such as 1-hour RSI greater than 45 keeps the bot out of those slides.

![Annotated BINANCE:BTCUSDT 15m chart with Stochastic RSI: a cross at 82,539 followed by a 0.8% rise, and a cross at 84,275 followed by a 1.9% drop](https://content.gainium.io/images/content/indicators/stochrsi__scalp.webp)

### DCA orders on oversold turns

- **Entry:** any start condition. This setup decides when the DCA orders fill.
- **Exit:** take profit 1.5% from the average price.
- **Settings:** DCA type Indicators, with a StochRSI DCA indicator: Interval 1 hour, First Variable K, Condition crossing up, Second Variable D, Zone Lower, Lower band 20. Set **Minimum % from last filled order** to 1, so the bot cannot buy twice at nearly the same price.
- **Timeframe:** 1 hour. The lower-zone cross fires about three and a half times as often as on 4 hours, so DCA orders rarely wait long once the minimum distance is reached.
- **When it fails:** in a fast drop StochRSI sits at 0 and only crosses up once the selling pauses. Price may be 3% lower by then. In the chart above, the deal started at 77,677. The DCA order filled at 76,512, while the low of that day was 74,968.

![Annotated BINANCE:BTCUSDT 1h chart with Stochastic RSI: the deal start at 77,677, the DCA order on the next lower-zone cross at 76,512, and the take profit at 78,251](https://content.gainium.io/images/content/indicators/stochrsi__dca-trigger.webp)

## Using Stochastic RSI in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**. For exits, set the take profit or stop loss type to **Indicators**. For DCA orders, set the DCA type to **Indicators** and click **Add DCA Indicator**.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Stochastic RSI (StochRSI)**.

![The Select start indicator dialog in the Gainium bot form, searched for Stochastic RSI, with Stochastic RSI (StochRSI) ringed](https://content.gainium.io/images/content/indicators/stochrsi__picker.webp)

The fields and their defaults:

- **Length:** 14. The stochastic lookback over RSI values, 1 to 200.
- **RSI Length:** 14. The RSI period fed into the stochastic, 1 to 200.
- **Interval:** 1 hour, from 1 minute to 1 week.
- **First Variable:** K. The line that does the crossing: K or D.
- **Condition:** crossing down. The options are crossing up, crossing down, greater than and lower than.
- **Second Variable:** D, or **Add Custom Value** to compare with a fixed level typed in **Enter Value** (default 1).
- **Smooth D:** 3. **Smooth K:** 3.
- **Zone:** Lower. The cross counts only when both lines were under the **Lower band** (20) on the signal bar and the bar before. Upper tests over the **Upper band** (80), Lower&Upper accepts either, Anywhere accepts every cross. Each band keeps the value you typed when you switch Zone. Zone is hidden with Add Custom Value.
- **Keep true:** 0. Extra bars the condition stays true after it fires.

StochRSI has no smoothing or percentile options in Gainium.

![The Stochastic RSI settings card in the Gainium bot form with its defaults: Length 14, RSI Length 14, Interval 1 hour, First Variable K, Condition crossing down, Second Variable D, Smooth D 3, Smooth K 3, Zone Lower, Lower band 20, Keep true 0](https://content.gainium.io/images/content/indicators/stochrsi__settings.webp)

![The Gainium bot chart on BTC/USDT 1h with the Stochastic RSI pane below price](https://content.gainium.io/images/content/indicators/stochrsi__bot-chart.webp)

**Example configuration** (the scalp setup): Deal start condition Indicators, StochRSI with Length 14, RSI Length 14, Interval 15 minutes, First Variable K, Condition crossing up, Second Variable D, Smooth D 3, Smooth K 3, Zone Lower, Lower band 20, Keep true 0. In the same group, RSI with Length 14, Interval 1 hour, Condition Greater than, Value 45. Take profit 0.6%.

## Related indicators

- [Relative Strength Index (RSI)](https://gainium.io/indicators/rsi): the input of StochRSI, and the slower filter to put next to it in the same group.
- [Stochastic](https://gainium.io/indicators/stoch): the same formula applied to price, with the same K, D and Zone fields.
- [Oscillator Crossover](https://gainium.io/indicators/oscillator-crossover): crosses between two different oscillators, for when one StochRSI cross is too noisy.
