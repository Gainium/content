---
id: 75
name: Combined Ratings (CR)
slug: tradingview-technical-ratings
description: >-
  In this article, we explain what is the Tradingview Technical Ratings
  indicator and how it can be used in bot trading.
createdAt: '2023-04-11T17:54:14.611Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2023-04-14T07:56:21.020Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - trading
  - technical
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.028Z'
templateVersion: 2
tldr: >-
  Combined Ratings is Gainium's version of TradingView's Technical Ratings:
  28 indicators each vote +1, 0 or −1, and the sum, from −28 to +28, becomes
  Strong Buy, Buy, Neutral, Sell or Strong Sell. Check level (15 by default)
  sets the score for the Strong ratings. The bot computes it from candles of
  its own Interval; nothing is fetched from TradingView. Defaults are Strong
  Buy, On entry signal, 1-hour candles. On BTC/USDT daily, the bars after a
  Sell rating lost about four times what the bars after a Buy rating gained,
  ignoring fees, so the daily rating works as an on/off switch.
kind: native
catalogKeys:
  - TV
category: composite
aliases:
  - "Combined Ratings"
  - "CR"
  - "TradingView Technical Ratings"
  - "TV Rating"
  - "Technical Ratings"
faq:
  - title: Is this the same rating TradingView shows?
    details: >-
      It is built the same way, from moving averages and oscillators, but it
      is scored differently. TradingView averages two groups into a value
      from −1 to +1 and calls ±0.5 strong. Gainium adds 28 votes into a score
      from −28 to +28 and calls Check level (15) strong. The two can
      disagree on the same candle, so judge the bot by its own condition, not
      by TradingView's widget.
  - title: What is the difference between On entry signal and On every signal?
    details: >-
      On every signal is true on every candle that has the chosen rating. On
      entry signal is true only on the candle where the score arrives at that
      rating from zero or the other side: from 0 or below to Buy, for
      example. For Strong Buy it needs a jump from 0 or below to the Check
      level within one candle, which is rare: on BTC/USDT 4h a fresh Buy
      happens about six times as often.
  - title: What does Check level change?
    details: >-
      The score needed for Strong Buy or Strong Sell. With 15, Strong Buy
      needs 15 of the 28 votes net positive; on BTC/USDT 4h the score is at
      15 or more on about 13% of candles. A lower level makes
      Strong ratings more frequent and Buy and Sell rarer.
  - title: Which timeframe works best?
    details: >-
      The rating is built from averages up to 200 periods, so it describes
      trend more than timing. On BTC/USDT, a fresh Buy rating on 4-hour
      candles comes nearly three times as often as the daily rating
      switches side, so use 1 day for a switch and 4 hours for entries.
related:
  - moving-averages
  - rsi
  - adx
  - macd
sources:
  - title: TradingView Help Center, Technical Ratings
    url: https://www.tradingview.com/support/solutions/43000614331-technical-ratings/
  - title: Binance BTC/USDT 4h and 1d candles, computed with Gainium's indicator engine
---

Combined Ratings scores the market with 28 indicators at once and reports one word: Strong Buy, Buy, Neutral, Sell or Strong Sell. Gainium modelled it on TradingView's Technical Ratings and computes it inside the bot. Bots use a fresh Buy rating as an entry, and the daily rating as an on/off switch.

## What is Combined Ratings

TradingView's Technical Ratings combine moving-average and oscillator signals into one recommendation. Gainium's Combined Ratings follow the same idea with their own scoring: every closed candle, 28 votes of +1, 0 or −1 are added up.

The 28 votes:

- **14 moving averages:** +1 if the close is above, −1 if below, for SMA and EMA of 5, 10, 20, 30, 50, 100 and 200 periods.
- **3 more trend lines:** close against VWMA 20, HMA 9 and the Ichimoku base line (9, 26, 52).
- **RSI 14:** −1 above 70, +1 below 30, else 0.
- **Stochastic %K (14, 3, 3)** and **Stochastic RSI %K (14, 14, 3, 3):** −1 above 80, +1 below 20.
- **CCI 20:** −1 above 100, +1 below −100.
- **Williams %R 14:** −1 above −20, +1 below −80.
- **ADX 14:** with ADX above 20, +1 when +DI crosses above −DI, −1 when it crosses below.
- **Awesome Oscillator (5, 34):** +1 above 0 and rising, −1 below 0 and falling.
- **Momentum 10:** +1 rising, −1 falling.
- **MACD histogram (12, 26, 9):** +1 rising, −1 otherwise.
- **Bull/Bear Power 30:** +1 above 0, −1 otherwise.
- **Ultimate Oscillator (7, 14, 28):** +1 above 70, −1 below 30.

The score runs from −28 to +28. With **Check level** *L* (15 by default): Strong Buy at *L* or more, Buy from 1 to *L* − 1, Neutral at exactly 0, Sell from −1 to −(*L* − 1), Strong Sell at −*L* or less.

How to read it: half the votes are moving averages, so the rating mostly says where price sits against averages up to 200 periods. It reacts slowly and stays on one side for many candles. On BTC/USDT 4h the score is Strong Buy on about 13% of candles, Buy on 33%, Sell on 34% and Strong Sell on 17%.

![TradingView's own Technical Ratings on BINANCE:BTCUSDT 1D, dark theme: red bars through most of the decline to 60,000 and blue bars from the breakout that followed; Gainium's Combined Ratings use the same building blocks with a different score](https://content.gainium.io/images/content/indicators/tradingview-technical-ratings__tv.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Signal | Strong Buy | The rating that makes the condition true. Both Buy accepts Buy and Strong Buy; Both Sell accepts Sell and Strong Sell. |
| Trigger | On entry signal | On entry signal: true only when the rating crosses over from the other side, from a score of 0 or below for buy ratings and 0 or above for sell ratings. On every signal: true on every candle with that rating. |
| Check level | 15 | The score, out of ±28, at which Buy becomes Strong Buy and Sell becomes Strong Sell. The field accepts 1 to 28. |
| Interval | 1 hour | Candle size of all 28 votes, from 1 minute to 1 week. |
| Keep true | 0 | Extra candles the condition stays true after it fires, so it can meet a slower condition in the same group. |

**Tip:** With **Trigger** On entry signal, Strong Buy needs the score to jump from 0 or below to Check level or more within one candle. On BTC/USDT 4h, Check level 10 gives about 2.3 times as many of those jumps as 15, and 8 about three times as many.

**Tip:** **Check level** goes up to 28, the highest score the 28 votes can give. At 28, Strong Buy needs every vote positive. At 1, every positive score counts as Strong Buy and Buy never fires.

## Trading setups for bots

### Fresh Strong Buy as a momentum entry

- **Entry:** Combined Ratings, Signal **Strong Buy**, Trigger **On entry signal**, Check level 15, Interval 4 hours. It fires only when the score jumps from 0 or below to 15 or more within one candle.
- **Exit:** a 1.5% take profit, with DCA orders below.
- **Settings:** Check level 15. Signal **Buy** with the same trigger fires far more often, about six times as often as Strong Buy.
- **Timeframe:** 4 hours.
- **When it fails:** at the end of a rally, which is where a jump to Strong Buy happens. On BTC/USDT 4h, about half (55%) of the Strong Buy entries reached +1.5% within 18 bars; a buy on any 4h candle did that 64% of the time. The fresh Buy entry did slightly better, about two thirds (67%). In the chart above, Strong Buy showed near 84,000 about 12 bars before price fell to 79,200.

![Annotated Gainium bot-form chart with Combined Ratings, BTC/USDT 4h on a Bybit paper account: Strong Buy labels near 83,500 and, later, near 84,000, each followed by a drop](https://content.gainium.io/images/content/indicators/tradingview-technical-ratings__strong-buy.webp)

### Daily rating as an on/off switch

Run a long bot only while the daily rating is on the buy side.

- **Entry:** in the Bot Controller, start the bot on Combined Ratings, Signal **Both Buy**, Trigger **On every signal**, Interval **1 day**; stop it on **Both Sell** with the same settings. The bot's own start condition times the deals.
- **Exit:** the stop condition stops new deals; close open deals with your take profit or a stop loss.
- **Settings:** Check level 15. Both Buy and Both Sell ignore the Strong/normal split, so the switch reads only which side of 0 the score is on.
- **Timeframe:** 1 day.
- **When it fails:** in ranges, where the score hovers near 0 and the switch flips back and forth. It still separates the market: on BTC/USDT the daily bars after a Sell or Strong Sell rating lost about four times what the bars after a Buy or Strong Buy rating gained, ignoring fees. The two long Sell runs in the chart covered drops from 92,600 to 68,800 and from 79,100 to 62,600.

![Annotated BTC/USDT 1D chart with TradingView's Technical Ratings below: boxes mark two long Gainium Combined Ratings Sell periods and a later Buy period](https://content.gainium.io/images/content/indicators/tradingview-technical-ratings__daily-switch.webp)

## Using Combined Ratings in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, click **Edit**, then **Change indicator**, and search for **Combined**. For the switch, add it in the Bot Controller instead.
3. Pick **Combined Ratings (TradingView)**, set the fields, and click **Done**.

![Gainium indicator picker searched for Combined, with the Combined Ratings (TradingView) card ringed](https://content.gainium.io/images/content/indicators/tradingview-technical-ratings__picker.webp)

The fields and their defaults:

- **Signal:** Strong Buy. The options are Strong Buy, Buy, Both Buy, Strong Sell, Sell and Both Sell. "Both" accepts the strong and the normal rating.
- **Trigger:** On entry signal. The other option is On every signal.
- **Check level:** 15, from 1 to 28. The score for the Strong ratings, out of 28.
- **Interval:** 1 hour.
- **Keep true:** 0 extra candles.

Combined Ratings works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller.

Example configuration for the first setup: Signal Strong Buy, Trigger On entry signal, Check level 15, Interval 4 hours, Keep true 0.

![Gainium Combined Ratings settings card with Signal Strong Buy, Trigger On entry signal, Check level 15 and Interval 4 hours](https://content.gainium.io/images/content/indicators/tradingview-technical-ratings__example.webp)

## Related indicators

- [Moving Averages](https://gainium.io/indicators/moving-averages): 17 of the 28 votes are price against an average; one 200-period average gives a similar trend switch with fewer flips.
- [RSI](https://gainium.io/indicators/rsi): one of the votes, and a timing condition to pair with the daily switch.
- [ADX](https://gainium.io/indicators/adx): another vote; on its own it tells you whether the trend the rating describes has force.
- [MACD](https://gainium.io/indicators/macd): the histogram vote, available as its own condition with a Value.
