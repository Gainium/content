---
id: 1052
name: Anchored VWAP
slug: vwap
description: >-
  Use the anchored VWAP in Gainium bots: the volume-weighted average price since
  the start of the UTC day, week or month, with standard-deviation bands, and
  conditions on the close against the VWAP or a band.
createdAt: '2026-10-29T12:00:00.000Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2026-10-29T12:00:00.000Z'
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
  VWAP is the average price of every candle since the start of the day, week
  or month, weighted by volume. Gainium's Anchored VWAP restarts at 00:00 UTC
  (Day), Monday 00:00 UTC (Week) or the 1st of the month (Month) and draws
  standard-deviation bands around it. A bot can test the close against the
  VWAP or a band: crossing up, crossing down, greater than or lower than. The
  default buys when the 1-hour close crosses up the daily VWAP. A restart is
  never a crossing, and on 1-day candles the Day anchor has one candle per
  period, so use Week or Month there.
kind: native
catalogKeys:
  - VWAP
category: volume
aliases:
  - "VWAP"
  - "Anchored VWAP"
  - "Volume Weighted Average Price"
  - "Volume-weighted average price"
  - "VWAP bands"
faq:
  - title: Which price does Gainium's VWAP average?
    details: >-
      The typical price of each candle, (high + low + close) / 3, weighted by
      the candle's volume, from the first candle of the period. It is the same
      line as TradingView's built-in VWAP with Source hlc3 and the bands in
      Standard Deviation mode.
  - title: When does the VWAP restart?
    details: >-
      Day restarts at 00:00 UTC, Week on Monday at 00:00 UTC and Month on the
      1st at 00:00 UTC. The time zone is fixed to UTC. The first candle of a
      new period starts a new average, and its bands start at zero width.
  - title: Why does my VWAP condition never fire on the 1-day interval?
    details: >-
      With Anchor Day and Interval 1 day, every candle is its own period. The
      VWAP is that candle's typical price, the bands sit on it, and a crossing
      can never happen because the restart is not a crossing. Use Anchor Week
      or Month on daily candles.
  - title: Why does the lower band condition fire right after midnight UTC?
    details: >-
      The bands measure how far price has spread since the restart. In the
      first hours of the day that spread is tiny, so the bands hug the VWAP and
      a small dip closes under them. On BTC/USDT 1h, 43% of closes under the
      2 standard deviation band come in the first three hours of the UTC day.
      Add a Session Selector that skips those hours.
related:
  - moving-averages
  - bb
  - sessions
sources:
  - title: Wikipedia, Volume-weighted average price (definition; first benchmark use by James Elkins in 1984; Berkowitz, Logue and Noser, Journal of Finance, 1988)
    url: https://en.wikipedia.org/wiki/Volume-weighted_average_price
  - title: TradingView Help Center, Volume Weighted Average Price (VWAP), anchor periods and standard deviation bands
    url: https://www.tradingview.com/support/solutions/43000502018-volume-weighted-average-price-vwap/
  - title: Gainium, Sessions indicator (Session Selector)
    url: https://gainium.io/indicators/sessions
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

VWAP (volume-weighted average price) is the average price paid since the start of the day, week or month, with each candle weighted by its volume. Traders read the close above it as buyers in control for that period and use its standard-deviation bands as stretch levels. In Gainium a bot can buy when the close crosses the VWAP or closes outside a band.

## What is Anchored VWAP

VWAP started as an execution benchmark. The first trade measured against it is credited to James Elkins of the brokerage Abel Noser in 1984, and Berkowitz, Logue and Noser formalised it in 1988: an order filled below the day's VWAP bought cheaper than the average participant. Charting packages turned it into a line on the chart. Gainium's version matches TradingView's built-in VWAP with Source hlc3 and Standard Deviation bands.

For the candles since the anchor:

**VWAP = Σ(volume × typical price) / Σ volume**, with typical price = (high + low + close) / 3

**σ = √(Σ(volume × typical price²) / Σ volume − VWAP²)**

**Upper band = VWAP + Band width × σ**, **Lower band = VWAP − Band width × σ**

- **Anchor** sets where the sums restart: Day at 00:00 UTC, Week on Monday at 00:00 UTC, Month on the 1st at 00:00 UTC.
- **σ** is the volume-weighted standard deviation of the typical price since the anchor. It starts at 0 on the first candle of each period and widens as the period goes on.
- **Band width** is the number of σ between the VWAP and each band. The default is 1.

How to read it:

- **Close above the VWAP:** the period's buyers are on average in profit. On BTC/USDT 1h with the Day anchor, the close is above the VWAP on about half of the candles.
- **Early in a period the line moves fast.** After the restart it is the average of a few candles, so it follows price closely. Late in a week or month it barely moves.
- **The bands are narrow after a restart.** On BTC/USDT 1h, the median σ an hour after midnight UTC is 0.08% of price. By 23:00 UTC it is 0.64%, eight times wider.
- **A restart is not a crossing.** When the period restarts, the VWAP jumps to the new period's first candle. Gainium does not count that jump as price crossing the line.

Gainium never builds a VWAP from part of a period. When the candles a bot or a backtest starts with begin in the middle of a day, week or month, the condition stays false until the next period begins. The bot loads enough history to avoid that on intervals of 1 minute and up for Day, 5 minutes and up for Week, and 15 minutes and up for Month. On the bot-form chart the line and bands break at each restart: the reset candle is left empty, and the new period starts from the next one.

![VWAP with the default 1 standard deviation bands on BINANCE:BTCUSDT 1h, dark theme: the blue VWAP line and green bands restart every day at 00:00 UTC, pinch together at each restart and widen through the day](https://content.gainium.io/images/content/indicators/vwap__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Interval | 1 hour | Candle size VWAP is calculated on, from 1 minute to 1 week. Pick one with several candles per period. |
| Anchor | Day | Where the VWAP restarts. Day: 00:00 UTC. Week: Monday 00:00 UTC. Month: the 1st at 00:00 UTC. |
| Line | VWAP | The line the close is compared with: VWAP, Upper band or Lower band. |
| Band width | 1 | Distance of the bands from the VWAP in σ, 0.1 to 10. Shown only for Upper band and Lower band. |
| Condition | Price crossing up | Price crossing up and crossing down fire on the candle the close passes the line, inside one period. Price greater than and lower than hold on every candle on that side. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** **Anchor** Day on the 1 day interval makes every candle its own period. The crossing conditions then never fire, and Price greater than only says the close is above the candle's own midpoint. On daily candles, use Week or Month.

**Tip:** **Band width** 1 instead of 2 multiplies the band signals. On BTC/USDT 1h with the Day anchor, closes under the 1σ lower band are about 3.4 times as common as closes under the 2σ band.

**Tip:** With **Anchor** Day and **Line** Lower band, most signals right after midnight UTC come from narrow bands, not from a sell-off. On BTC/USDT 1h, 43% of closes under the 2σ band and 88% of closes under the 3σ band come in the first three hours of the UTC day.

**Tip:** **Condition** Price crossing up ignores the restart. On BTC/USDT 1h with the Day anchor, about one cross in nine that a plain count would see happens at the restart, and the bot skips it. On 4 hours it is about one in four.

## Trading setups for bots

### Buy the stretch under the daily lower band

Price that closes two σ under the day's VWAP is far from where most of the day's volume traded. This setup buys that stretch and sells on a small bounce.

- **Entry:** Anchored VWAP, Anchor **Day**, Line **Lower band**, Band width **2**, Condition **Price lower than**, Interval 1 hour. In the same group, with AND logic, a Session Selector with Session Custom 00:00–03:00, Time zone UTC, Rule **Out of session** and all seven Session Days, so the narrow bands after midnight cannot trigger it.
- **Exit:** take profit 0.5%. The VWAP sat a median 0.7% above the entry at these signals, so 0.5% sells short of the line.
- **Settings:** Band width 2. With 1, the condition fires on about 3.4 times as many candles and many of them are ordinary dips.
- **Timeframe:** 1 hour. On BTC/USDT, price touched the day's VWAP within 24 candles after about 70% of these entries, and the 0.5% take profit filled within 24 candles after about 79%.
- **When it fails:** on a trend day the close stays under the band for hours. Price fell another 2% within 24 candles after about a third of the entries, so size the DCA orders for a 2% slide. Without the session filter, the first candle of the day fires whenever it closes in the lower half of its range: on the right of the chart below that bought 81,106 at 00:00 UTC, and price was 1.7% lower two hours later.

In the chart below, the first close under the 2σ band after 05:00 bought at 80,608. Price dipped another 0.6% and then rose 0.4% above the entry, short of the 0.5% take profit, before the next day's slide.

![Annotated VWAP chart with 2 standard deviation bands, BINANCE:BTCUSDT 1h: closes under the lower band after 05:00 UTC buy at 80,608; at each 00:00 UTC restart the bands sit on the VWAP and red-ringed first candles fire, one at 81,106 before a 1.7% drop](https://content.gainium.io/images/content/indicators/vwap__lower-band.webp)

### Weekly VWAP crossing on 4-hour candles

The weekly VWAP is the average price of everyone who traded since Monday. A 4-hour close back above it says the week's buyers are back in profit.

- **Entry:** Anchored VWAP, Anchor **Week**, Line **VWAP**, Condition **Price crossing up**, Interval 4 hours.
- **Exit:** take profit 2%. On BTC/USDT 4h, price reached +2% within 12 candles after about half of these crosses.
- **Settings:** Anchor Week. With Anchor Day on 4 hours, a period is six candles, and the close fell back under the VWAP within three candles after about 72% of crosses, against about 52% for the weekly line.
- **Timeframe:** 4 hours. On 1 hour the same weekly line is crossed about twice as often.
- **When it fails:** when price chops around a flat weekly VWAP. About half of the crosses close back under the line within three candles. In the chart below, a cross at 82,641 closed back under it four hours later at 81,353. Use the take profit as the exit, or add a stop under the weekly lower band.

In the chart below, the close crossed up the weekly VWAP at 82,618, and the 2% take profit filled about a day later.

![Annotated weekly VWAP chart, BINANCE:BTCUSDT 4h: a cross up at 82,618 reaches the 2% take profit a day later; a cross up at 82,641 closes back under the VWAP four hours later at 81,353; a dashed line marks the Monday 00:00 UTC restart](https://content.gainium.io/images/content/indicators/vwap__weekly-cross.webp)

## Using Anchored VWAP in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or set the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit** on the condition, then **Change indicator**, search for **VWAP** and pick **Anchored VWAP** from the Volume category.

![The Select start indicator dialog in the Gainium bot form, searched for VWAP, with the Anchored VWAP card in the Volume category](https://content.gainium.io/images/content/indicators/vwap__picker.webp)

The fields and their defaults:

- **Interval:** 1 hour.
- **Anchor:** Day. Or Week or Month.
- **Line:** VWAP. Or Upper band or Lower band.
- **Band width:** 1, in σ, from 0.1 to 10. It appears when Line is a band.
- **Condition:** Price crossing up. Or Price crossing down, Price greater than or Price lower than.
- **Keep true:** 0 extra candles.

![The Anchored VWAP settings card in the Gainium bot form with its defaults: Interval 1 hour, Anchor Day, Line VWAP, Condition Price crossing up, Keep true 0](https://content.gainium.io/images/content/indicators/vwap__settings.webp)

The bot-form chart draws the VWAP and both bands. Each restart leaves one empty candle before the new period's line starts.

![The Gainium bot-form chart, BTC/USDT 1h, with VWAP day 1: the blue VWAP and green bands restart every day, with a gap at each restart](https://content.gainium.io/images/content/indicators/vwap__bot-chart.webp)

Anchored VWAP works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. The backtest draws it on every deal chart.

![A Gainium backtest of a long DCA bot on BTC/USDT 1h with an Anchored VWAP start condition: the deal list on the left and the deal chart with the VWAP and its bands](https://content.gainium.io/images/content/indicators/vwap__backtest.webp)

Example configuration for the weekly setup: Interval 4 hours, Anchor Week, Line VWAP, Condition Price crossing up, Keep true 0, take profit 2%.

## Related indicators

- [Moving Averages](https://gainium.io/indicators/moving-averages): VWMA weights by volume too, but over a rolling window instead of from an anchor.
- [Bollinger Bands](https://gainium.io/indicators/bb): standard-deviation bands around a 20-period average, which never restart.
- [Sessions](https://gainium.io/indicators/sessions): the Session Selector keeps a VWAP band condition out of the narrow first hours of the UTC day.
