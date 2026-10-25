---
id: 111
name: Supertrend Indicator
slug: supertrend
description: >-
  Learn how to use the Supertrend indicator in Gainium, create bot trading
  strategies, and optimize your trading performance effectively.
createdAt: '2024-10-05T11:32:00.136Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-05T11:32:02.834Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.026Z'
templateVersion: 2
tldr: >-
  Supertrend is a line that trails price at Multiplier × ATR: under the
  candles in an up trend, over them in a down trend. It flips when a candle
  closes through it. Gainium's SuperTrend condition defaults to Multiplier 3,
  ATR Length 10 on 1-hour candles and can test the trend state (Up trend,
  Down trend) or the flip itself (From down to up, From up to down). On
  BTC/USDT 4h, Multiplier 2 flips about 1.6 times as often as the default 3,
  and Multiplier 4 a little over half as often.
kind: native
catalogKeys:
  - ST
category: trend
aliases:
  - "Supertrend"
  - "SuperTrend"
  - "Super Trend"
  - "Supertrend indicator"
faq:
  - title: What are the best Supertrend settings for a crypto bot?
    details: >-
      Start with the defaults, Multiplier 3 and ATR Length 10, on 4-hour
      candles. On BTC/USDT, Multiplier 4 gives about 40% fewer up-flips and
      keeps a typical trend open for 56 bars instead of 30. On 1-hour candles
      the default flips up nearly four times as often as on 4-hour, which is
      too many for a flip-to-flip bot.
  - title: Does Supertrend repaint?
    details: >-
      Not on closed candles. While a candle is still open, price can cross the
      line and come back, so the colour can change and change back. Gainium
      evaluates the condition on closed candles of the Interval you set, so a
      flip that reverses before the close never reaches the bot.
  - title: What is the difference between Up trend and From down to up?
    details: >-
      Up trend is true on every closed candle while the line is under price,
      so it suits a filter. From down to up is true only on the candle where
      the line flips, so it suits an entry that should fire once per trend.
      Keep true stretches either one over extra candles.
  - title: Why does the bot's Supertrend differ from my TradingView chart?
    details: >-
      The formula and the defaults are the same as TradingView's built-in
      Supertrend. Differences come from the inputs: the bot reads candles of
      its own Interval field and of the bot's exchange, while your chart may
      show another timeframe or another exchange's BTC/USDT.
related:
  - atr
  - psar
  - adx
  - moving-averages
sources:
  - title: TradingView Help Center, Supertrend (history and formula)
    url: https://www.tradingview.com/support/solutions/43000634738-supertrend/
  - title: TradingView Pine Script reference, ta.supertrend
    url: https://www.tradingview.com/pine-script-reference/v5/
  - title: StockCharts ChartSchool, Average True Range (ATR)
    url: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp
  - title: Binance BTC/USDT 1h and 4h candles, computed with Gainium's indicator engine
---

Supertrend is a single line that trails price at a distance of a few ATRs: under the candles in an up trend, over them in a down trend. It flips to the other side when a candle closes through it. Bots use the flip as a trend entry or exit, and the up or down state as a filter for other conditions.

## What is Supertrend

Supertrend was created by the French trader Olivier Seban. It is built from the Average True Range (ATR), so its distance from price grows when candles get bigger and shrinks when they get smaller.

The calculation, on every closed candle:

- `hl2 = (high + low) / 2`, the candle's midpoint.
- `ATR` is the Average True Range over **ATR Length** candles, smoothed with Wilder's moving average (RMA).
- `basic upper = hl2 + Multiplier × ATR` and `basic lower = hl2 − Multiplier × ATR`.
- The lower band only moves up. It keeps its previous value unless the new basic lower band is higher, or the previous close fell below it. The upper band only moves down, by the mirror rule.
- The trend turns up when the close ends above the previous upper band. It turns down when the close ends below the previous lower band.
- The Supertrend line is the lower band in an up trend and the upper band in a down trend.

The defaults are **Multiplier 3** and **ATR Length 10**, both in Gainium and in TradingView's built-in Supertrend.

How to read it:

- **Green line under the candles:** up trend. The line rises with price and never moves down while the trend lasts, so it works as a trailing stop.
- **Red line over the candles:** down trend, the mirror image.
- **Distance:** three ATRs from the candle midpoint. At the right edge of the chart below, ATR(10) on BTC/USDT 4h is about $790, so the line sits roughly $2,400 from the midpoint.
- **Trend length:** on BTC/USDT 4h a typical trend of the default line lasts about 30 candles.

![Supertrend (10, 3) on BINANCE:BTCUSDT 4h, dark theme: a green line under price during a rally and red lines over price in the range that follows](https://content.gainium.io/images/content/indicators/supertrend__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Multiplier | 3 | ATRs between the candle midpoint and the line. A higher value sits further from price and flips less. |
| ATR Length | 10 | Candles in the ATR, smoothed with Wilder's average, 1 to 200. |
| Condition | Up trend | Up trend and Down trend are true on every candle of the trend. From down to up and From up to down are true only on the flip candle. |
| Interval | 1 hour | Candle size the line is calculated on, from 1 minute to 1 week. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Multiplier** sets the number of trades. On BTC/USDT 4h, Multiplier 2 flips up about 1.6 times as often as 3, and 4 a little over half as often as 3.

![Supertrend Multiplier 3 vs 4 on BINANCE:BTCUSDT 4h: with Multiplier 4 the line sits further from the candles and switches between green and red fewer times](https://content.gainium.io/images/content/indicators/supertrend__tip-multiplier.webp)

*Supertrend Multiplier 3 vs 4, BTC/USDT 4h: Multiplier 4 flips up a little over half as often as 3 on this chart.*

**Tip:** **ATR Length** barely changes the flip count: on the same 4h chart, Length 5 gives about 10% more up-flips than 10, and 20 about the same as 10. To trade less, raise the Multiplier instead.

**Tip:** Condition **Up trend** as the only start condition is true on every candle of the trend, so the bot can open a new deal right after each take profit until the line flips. Use **From down to up** for one deal per trend.

## Trading setups for bots

### Flip-to-flip trend follower

Enter when the line flips under price, close when it flips back over. A short bot on futures does the mirror: enter on From up to down, close on From down to up.

- **Entry:** SuperTrend, Condition **From down to up**, Interval 4 hours.
- **Exit:** a SuperTrend close condition set to **From up to down** on the same interval. The flip happens at the line, so the exit gives back roughly three ATRs from the high.
- **Settings:** Multiplier 3, ATR Length 10. Multiplier 4 trades about 40% less on BTC/USDT 4h, with a typical trend of 56 candles instead of 30.
- **Timeframe:** 4 hours or 1 day. On 1-hour candles the default flips up nearly four times as often, and most of those trends last under 48 candles.
- **When it fails:** in a range. In one stretch where BTC fell from about 111,500 to 80,900, the long flip-to-flip trades on 4h won about a third of the time and lost 25% in total, ignoring fees. Multiplier 4 won about 30% of its trades and lost 9.6%. The setup only pays when a few long trends cover the many small losses, like the rally in the chart below.

![Annotated Supertrend chart, BTC/USDT 4h: a flip up opens a deal at 64,200, the flip down closes it at 76,800 for +19.7%, and two short-lived flips after it are each a losing deal](https://content.gainium.io/images/content/indicators/supertrend__flip.webp)

### Buy dips only while the trend is up

Use the trend state as a filter and let a second indicator time the entry. Both conditions sit in one group with AND logic, so the deal starts only when both are true on the same candle.

- **Entry:** SuperTrend, Condition **Up trend**, Interval 4 hours, AND RSI (Length 14, 4 hours) crossing up 45.
- **Exit:** a 2% take profit, with DCA orders below the entry.
- **Settings:** SuperTrend at its defaults. On BTC/USDT 4h the pair fires about as often as the default line flips up. RSI(14) never crossed up 30 while Supertrend was up, so use 45, not 30.
- **Timeframe:** 4 hours for both conditions. The filter and the trigger should read the same candles.
- **When it fails:** late in a trend. Up trend stays true until the very candle of the flip, so the filter cannot tell a fresh trend from an old one. In the second entry on the chart below, this setup bought at 79,400, the line flipped down about 18 bars later, and price fell 5.5% before the take profit filled. Size the DCA orders for a drop of that depth.

![Annotated Supertrend and RSI chart, BTC/USDT 4h: entry 1 buys 77,900 in an up trend when RSI crosses 45 and hits a 2% take profit; entry 2 buys 79,400 just before the line flips down](https://content.gainium.io/images/content/indicators/supertrend__dip-filter.webp)

## Using SuperTrend in Gainium

1. Create a DCA bot and switch the form to **Manual**. Quick mode has no indicator conditions.
2. Set **Deal start condition** to **Indicators**. Gainium adds an RSI condition; click **Edit**, then **Change indicator**, and search for **SuperTrend**.
3. Set the fields and click **Done**. The bot form's chart draws the line on the pair you trade.

![Gainium indicator picker searched for SuperTrend, with the SuperTrend card ringed](https://content.gainium.io/images/content/indicators/supertrend__picker.webp)

The fields and their defaults:

- **Multiplier:** 3. The number of ATRs between the candle midpoint and the line.
- **ATR Length:** 10, from 1 to 200. The ATR lookback in candles.
- **Condition:** Up trend. The other options are Down trend, From down to up and From up to down. The two trend states are true on every candle of the trend; the two "From" options are true only on the flip candle.
- **Interval:** 1 hour. The candles the condition reads, independent of the chart you look at.
- **Keep true:** 0. Keeps the condition true for that many extra candles after it fires, so it can meet a second condition a few candles later.

The same condition works for starting deals, for DCA orders, as a take profit or stop loss close condition, and in the Bot Controller to start or stop a bot.

Example configuration for the first setup, a long BTC/USDT bot:

- Deal start: SuperTrend, Multiplier 3, ATR Length 10, Condition From down to up, Interval 4 hours, Keep true 0.
- Take profit type Technical indicators: SuperTrend, same settings, Condition From up to down.

![Gainium SuperTrend settings card configured with Multiplier 3, ATR Length 10, Condition From down to up and Interval 4 hours](https://content.gainium.io/images/content/indicators/supertrend__example.webp)

## Related indicators

- [Average True Range (ATR)](https://gainium.io/indicators/atr): the volatility input of Supertrend; read it to judge how far the line will sit from price.
- [Parabolic SAR](https://gainium.io/indicators/psar): another stop-and-reverse trailing line, which tightens with time instead of with volatility and flips about three times as often on 4h.
- [Average Directional Index (ADX)](https://gainium.io/indicators/adx): ADX above 25 filters out the ranges where Supertrend whipsaws.
- [Moving Averages](https://gainium.io/indicators/moving-averages): a 200-period average gives the higher-timeframe direction for a Supertrend entry.

## FAQ

### What are the best Supertrend settings for a crypto bot?

Start with the defaults, Multiplier 3 and ATR Length 10, on 4-hour candles. On BTC/USDT, Multiplier 4 gives about 40% fewer up-flips and keeps a typical trend open for 56 bars instead of 30. On 1-hour candles the default flips up nearly four times as often as on 4-hour, which is too many for a flip-to-flip bot.

### Does Supertrend repaint?

Not on closed candles. While a candle is still open, price can cross the line and come back, so the colour can change and change back. Gainium evaluates the condition on closed candles of the Interval you set, so a flip that reverses before the close never reaches the bot.

### What is the difference between Up trend and From down to up?

Up trend is true on every closed candle while the line is under price, so it suits a filter. From down to up is true only on the candle where the line flips, so it suits an entry that should fire once per trend. Keep true stretches either one over extra candles.

### Why does the bot's Supertrend differ from my TradingView chart?

The formula and the defaults are the same as TradingView's built-in Supertrend. Differences come from the inputs: the bot reads candles of its own Interval field and of the bot's exchange, while your chart may show another timeframe or another exchange's BTC/USDT.
