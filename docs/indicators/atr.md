---
id: 130
name: Average True Range (ATR)
slug: atr
description: >-
  Use the ATR indicator in Gainium for automated trading, volatility detection,
  and risk management with detailed strategies and practical examples.
createdAt: '2024-10-07T04:47:52.993Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-07T04:47:54.793Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.990Z'
tldr: >-
  The Average True Range (ATR) is how far price moves in an average bar, in
  price units, with gaps counted. J. Welles Wilder Jr. published it in 1978;
  the default length is 14. It says nothing about direction. In Gainium you
  can use it as a condition (deal start, DCA, close, bot start/stop), as the
  stop source in Risk:Reward, and as the distance unit for Dynamic ATR/ADR
  take profit, stop loss and DCA spacing.
templateVersion: 2
kind: native
catalogKeys:
  - ATR
category: volatility
aliases:
  - ATR
  - Average True Range
  - ATR indicator
  - Wilder ATR
faq:
  - title: Is ATR a percentage?
    details: >-
      No. ATR is in the pair's price units. On BTC/USDT 4h a reading of about
      750 is 0.9% of price. A Value that fits BTC is meaningless on a $0.10
      coin, so read ATR on your own pair before you set a threshold.
  - title: Does a rising ATR mean price will go up?
    details: >-
      No. ATR measures the size of bars, not their direction. It rises in sharp
      sell-offs as much as in rallies. Pair it with a trend or momentum
      condition when direction matters.
  - title: What is the difference between ATR and ADR?
    details: >-
      ATR averages the true range, which includes gaps from the previous close,
      with Wilder's smoothing, on any interval. Gainium's ADR is a simple
      average of high minus low on daily candles only.
  - title: Is the ATR take profit recalculated while the deal is open?
    details: >-
      No. With Dynamic ATR/ADR, the bot reads ATR once when the deal opens and
      keeps that value for the deal. The take profit moves only because it is
      measured from the average price, which changes when DCA orders fill.
related:
  - adr
  - keltner-channel
  - supertrend
  - bbw
sources:
  - title: J. Welles Wilder Jr., New Concepts in Technical Trading Systems (1978), origin of true range and ATR
    url: https://en.wikipedia.org/wiki/Average_true_range
  - title: StockCharts ChartSchool, Average True Range (ATR) and Average True Range Percent
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp
  - title: TradingView Help Center, Average True Range (ATR)
    url: https://www.tradingview.com/support/solutions/43000501823-average-true-range-atr/
  - title: Gainium, DCA Mode (Scaled DCA on ATR or ADR)
    url: https://gainium.io/help/dca-mode
  - title: Gainium, Risk:Reward
    url: https://gainium.io/help/risk-reward
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

The Average True Range (ATR) is how far price moves in an average bar, measured in price units. Traders use it to size distances: take profits, stops and the gaps between DCA orders that widen when the market gets busy. It says nothing about direction.

## What is Average True Range (ATR)

J. Welles Wilder Jr. introduced ATR in *New Concepts in Technical Trading Systems* in 1978. It starts from the **true range** of each bar:

**TR = max(High − Low, |High − previous Close|, |Low − previous Close|)**

- **High** and **Low** are the bar's extremes.
- **previous Close** is the close of the bar before. It brings gaps into the measure: a bar that opens far from the last close has a true range larger than its own high-low.

ATR is Wilder's moving average of TR over *n* bars:

**ATR = (previous ATR × (n − 1) + TR) / n**

The default *n* is 14, on Wilder's book, on TradingView and in Gainium. Each new bar moves ATR by 1/14 of the gap between the new true range and the previous ATR, so one big candle lifts it for many bars.

How to read it:

- **The number is in price units.** In the chart below, BTC/USDT 4h ATR(14) runs from about 280 to 1,440, with a middle reading near 770. Its last reading, 751, is 0.9% of price.
- **High ATR means wide bars.** It peaks at 1,442 about a dozen bars into a run from 64,000 to 77,000.
- **Low ATR means a quiet market.** Its low, 280, comes shortly before that run starts. A long stretch of low ATR often ends with one wide bar.
- **No direction.** ATR rises in crashes as much as in rallies.

![Average True Range (14) on BINANCE:BTCUSDT 4h, dark theme: price above, the ATR pane below rising from under 400 in a quiet stretch to a peak near 1,440 during a breakout and reading 750.86 at the end](https://content.gainium.io/images/content/indicators/atr__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Length | 14 | Bars in Wilder's average of the true range. A shorter Length reacts faster to one wide bar. |
| Interval | 1 hour | The candle size ATR is calculated on, from 1 minute to 1 week. |
| Condition | Crossing down | How ATR is compared with Value: Crossing up, Crossing down, Greater than, Lower than, or Between Value and Upper value. |
| Value | 70 | The threshold, in the pair's price units. |
| Upper value | — | Between: the value must stay above Value and below this. |
| Keep true | 0 | Extra bars the condition stays true after it fires. 0 means only the bar that triggered it. |

**Tip:** the default Value of 70 is far below BTC/USDT's range. Its 1h ATR(14) mostly sits between about 60 and 1,040, near 350 in the middle, so Crossing down 70 almost never fires. Set Value from your own pair's chart.

**Tip:** Length 7 makes spike signals about three times as common. On BTC/USDT 4h, ATR crossing up 1,100 fires about three times as often with Length 7 as with 14, and Length 28 fires only about a fifth as often as 14.

![ATR Length 14 vs 7 on BINANCE:BTCUSDT 4h: the same candles in both panels, with the Length 7 ATR below reaching about 1,800 at the breakout against about 1,440 for Length 14, and swinging more on every wide bar](https://content.gainium.io/images/content/indicators/atr__tip-length.webp)

*ATR Length 14 (top) vs 7 (bottom), BTC/USDT 4h: Length 7 crosses the 1,100 line about 3× as often, counting both directions.*

**Tip:** Between with an empty Upper value is never true; the engine needs both numbers. On BTC/USDT 4h, Between 500 and 1,100 held on 79% of bars with Length 14 and on 87% with Length 28, so a longer Length makes the filter block fewer deals.

## Trading setups for bots

### Start deals only in a normal-volatility window

ATR works as a filter: it keeps a dip-buying bot out of dead markets, where take profits are slow to fill, and out of crash candles, where safety orders fill in a row.

- **Entry:** your usual entry signal, plus ATR(14) on 4h **Between** 500 and 1,100. Both conditions must be true.
- **Exit:** unchanged. The filter only decides when deals may open.
- **Settings:** ATR Length 14, Interval 4 hours, Condition Between, Value 500, Upper value 1,100. The band is the 10th to 90th percentile of the BTC/USDT 4h ATR readings in the chart below. Read ATR on your own pair and set the band around its middle 80%.
- **Timeframe:** ATR on 4h or 1 day. Shorter intervals swing with every news candle and make the filter flicker.
- **When it fails:** ATR is in dollars. When BTC/USDT moves from 64,000 to 80,000, 500 goes from 0.8% to 0.6% of price. Recheck the band after every large move in price, or the filter drifts out of date.

In the chart below the band blocks new deals twice: while ATR sits below 500 in the quiet stretch before the breakout, and while the breakout pushes it above 1,100.

![Annotated chart of ATR(14) on BINANCE:BTCUSDT 4h with lines at 500 and 1,100: the quiet stretch with ATR below 500 and the breakout with ATR above 1,100 are marked as the periods when the filter blocks new deals](https://content.gainium.io/images/content/indicators/atr__volatility-window.webp)

### Take profit and stop loss at ATR multiples

With **Dynamic ATR/ADR**, the bot places the take profit a number of ATRs above the deal's average price, and the stop loss a number of ATRs below it. Quiet markets get close targets. Busy markets get wide ones.

- **Entry:** any start condition.
- **Exit:** take profit = average price + 2 × ATR(14, 4h). Stop loss = average price − 1.5 × ATR(14, 4h).
- **Settings:** Take profit type Dynamic ATR/ADR with ATR, Length 14, Interval 4 hours, Multiplier 2. Stop loss type Dynamic ATR/ADR with ATR, Length 14, Interval 4 hours, Multiplier 1.5.
- **Timeframe:** 4h ATR suits swing deals that stay open over many 4h bars. Use 1h ATR for short deals.
- **When it fails:** ATR is read once, when the deal opens. A deal opened right after a spike keeps that wide reading: at the ATR peak in the first chart, 2 × ATR was 2,884, or 3.7%. In a choppy range a 1.5 ATR stop is close enough to get hit on noise; the deals opened in the choppy range at the right edge of the first chart hit it.

Example, in the chart below: a long opened at the close of a 4h bar at 81,355, with ATR at 771. The take profit sat at 82,897 and the stop at 80,199. Price reached the take profit about nine bars later.

![Annotated chart of BINANCE:BTCUSDT 4h with ATR(14) below: entry at 81,355, take profit at 82,897 (2 × ATR 771 above) and stop at 80,199 (1.5 × ATR below), and the bar that reached the take profit](https://content.gainium.io/images/content/indicators/atr__dynamic-tp-sl.webp)

### Space DCA orders by ATR

**Base scaling on ATR** puts each DCA order a number of ATRs below the previous one, so the ladder is tight in calm markets and wide in busy ones.

- **Entry:** any start condition. The first DCA order sits 1 × ATR below the entry price, the next 1 × ATR below that, and from the third on each gap is multiplied by Step scale.
- **Exit:** take profit 1.5% above the average price.
- **Settings:** DCA type Scaled, Base scaling on ATR, ATR Length 14, Interval 4 hours, Multiplier 1. Three DCA orders, Step scale 1.2, equal order sizes.
- **Timeframe:** 4h ATR. With ATR near 700, the three orders span about 2,240, or 2.8% on BTC. A 1h ATR on the same pair is about 40% of the 4h one, so the ladder is less than half as deep.
- **When it fails:** the ladder is as deep as the market was busy when the deal opened. Open after a quiet stretch and the whole ladder can sit inside one bad candle. Check the depth against a past crash before you run it live.

Example, in the chart below: a deal opened at 79,277 with ATR at 696. The DCA orders sat at 78,581, 77,885 and 77,050, and all three filled. The average fell to 78,198, and the 1.5% take profit at 79,371 filled on the bounce.

![Annotated chart of BINANCE:BTCUSDT 4h with ATR(14) below: entry at 79,277, three DCA orders spaced by ATR 696 at 78,581, 77,885 and 77,050, the average price at 78,198 and the take profit at 79,371 filled on the bounce](https://content.gainium.io/images/content/indicators/atr__dca-spacing.webp)

## Using Average True Range (ATR) in Gainium

ATR shows up in four places in the bot form.

**As a condition.** It can start deals, place DCA orders (DCA type Indicators), close deals, and start or stop the bot.

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. The bot adds an RSI condition. For an exit, set the take profit or stop loss type to **Indicators** instead.
3. Click **Edit** on the condition, then **Change indicator**, and pick **Average True Range (ATR)**.

The settings card starts with these defaults:

- **Length:** 14. The *n* of Wilder's average.
- **Interval:** 1 hour. The candle size ATR is calculated on, from 1 minute to 1 week.
- **Condition:** Crossing down. The options are Crossing up, Crossing down, Greater than, Lower than and Between.
- **Value:** 70, in the pair's price units. On BTC/USDT, 70 is far below any 1h reading, so change it. With Between, an **Upper value** appears.
- **Keep true:** 0. The number of extra bars the condition stays true after it fires.

![The ATR settings card in the Gainium bot form with its defaults: Length 14, Interval 1 hour, Condition Crossing down, Value 70 (ringed, in price units), Keep true 0](https://content.gainium.io/images/content/indicators/atr__settings.webp)

**As a Dynamic ATR/ADR take profit or stop loss.** Set **Take profit type** (or the stop loss type) to **Dynamic ATR/ADR**. The bot adds an ATR with Length 14, Interval 1 hour and **Multiplier** 1. The interval can't go below 1 hour. The take profit sits at the average price plus ATR × Multiplier; the stop sits the same distance below. **When indicators trigger close by** picks a limit or a market order.

![The Gainium take profit section set to Dynamic ATR/ADR, with the ATR card open showing Length 14, Interval 1 hour and the Multiplier field ringed at 1](https://content.gainium.io/images/content/indicators/atr__dynamic-tp-form.webp)

**As DCA spacing.** In the DCA section, keep DCA type **Scaled** and set **Base scaling on** to **ATR**. The **ATR indicator** card has Length 14, Interval 1 hour and Multiplier 1. More detail is in [DCA Mode](https://gainium.io/help/dca-mode).

![The Gainium DCA section with Base scaling on set to ATR and the ATR indicator card below it: Length 14, Interval 1 hour, Multiplier 1](https://content.gainium.io/images/content/indicators/atr__dca-form.webp)

**As a Risk:Reward stop.** Risk:Reward can take ATR as its stop source and puts the stop one ATR below the entry for a long. It then sizes the position so a hit stop loses the amount you set. See [Risk:Reward](https://gainium.io/help/risk-reward).

**Example configuration** (the dynamic exit above): Deal start condition of your choice. Take profit type Dynamic ATR/ADR: ATR, Length 14, Interval 4 hours, Multiplier 2. Stop loss type Dynamic ATR/ADR: ATR, Length 14, Interval 4 hours, Multiplier 1.5.

## Related indicators

- [Average Daily Range (ADR)](https://gainium.io/indicators/adr): the same idea on daily candles only, without gaps or Wilder smoothing.
- [Keltner Channel](https://gainium.io/indicators/keltner-channel): bands drawn 2 ATRs above and below an EMA.
- [Supertrend](https://gainium.io/indicators/supertrend): a trailing line set a multiple of ATR away from price.
- [Bollinger Band Width (BBW)](https://gainium.io/indicators/bbw): volatility as a ratio of price, so one threshold works across pairs.
