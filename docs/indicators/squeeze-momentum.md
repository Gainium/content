---
id: 1056
name: Squeeze Momentum
slug: squeeze-momentum
description: >-
  Use LazyBear's Squeeze Momentum in Gainium bots: Bollinger Bands inside the
  Keltner Channels mark a squeeze, a momentum histogram gives the direction,
  and a bot can trade when the squeeze fires.
createdAt: '2026-10-29T12:00:00.000Z'
updatedAt: '2026-10-29T13:00:00.000Z'
publishedAt: '2026-10-29T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - volatility
  - momentum
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  Squeeze Momentum is LazyBear's version of John Carter's TTM Squeeze. A
  squeeze is on while the Bollinger Bands (20, 1.5) sit inside the Keltner
  Channels (20, 1.5 ATR); it fires on the first candle after that. A momentum
  histogram, a linear regression of price against the middle of its range,
  shows the direction. A bot condition combines the squeeze state (fired, in,
  out or any) with the momentum (positive, negative, rising, falling, crossing
  zero or any). The default Bollinger multiplier, 1.5, matches the chart
  TradingView shows; 2 is LazyBear's corrected version and Carter's original.
kind: native
catalogKeys:
  - SQZ
category: volatility
aliases:
  - "Squeeze Momentum"
  - "Squeeze Momentum Indicator"
  - "SQZMOM_LB"
  - "LazyBear Squeeze"
  - "TTM Squeeze"
  - "Squeeze"
faq:
  - title: Does it match the Squeeze Momentum chart on TradingView?
    details: >-
      Yes, with the default settings. The script TradingView shows uses its
      KC multiplier for the Bollinger Bands too, so its BB MultFactor input
      changes nothing, and Gainium's default BB multiplier is the same 1.5.
      If you change KC multiplier, set BB multiplier to the same value to keep
      matching that chart. Set BB multiplier 2 for LazyBear's corrected
      version, which TradingView does not show.
  - title: What does Squeeze fired mean?
    details: >-
      The candle before was in a squeeze (Bollinger Bands inside the Keltner
      Channels) and this candle is not. It is true on that one candle, so it
      fires once per squeeze.
  - title: What do the colours of the histogram mean?
    details: >-
      Bright green: momentum above zero and rising. Dark green: above zero and
      falling. Bright red: below zero and falling. Dark red: below zero and
      rising. The crosses on the zero line are orange in a squeeze and grey
      out of it.
  - title: Can I use it without the squeeze?
    details: >-
      Yes. Set Squeeze to Any and pick a momentum rule, for example Crossing up,
      to trade the histogram crossing zero. Squeeze and Momentum cannot both be
      Any, because that condition would always be true.
related:
  - bb
  - keltner-channel
  - bbw
sources:
  - title: LazyBear, Squeeze Momentum Indicator [LazyBear] (TradingView script, 2014; derived from John Carter's TTM Squeeze in Mastering the Trade, chapter 11)
    url: https://www.tradingview.com/script/nqQ1DT5a-Squeeze-Momentum-Indicator-LazyBear/
  - title: LazyBear, the corrected source with the Bollinger multiplier input fixed (Pastebin)
    url: https://pastebin.com/UCpcX8d7
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

Squeeze Momentum marks the stretches when Bollinger Bands contract inside the Keltner Channels, and a momentum histogram shows which way price is leaning. Traders wait for the squeeze to end, when volatility expands, and trade in the direction of the momentum. In Gainium a bot can start a deal when the squeeze fires, or on any momentum rule with or without a squeeze.

## What is Squeeze Momentum

John Carter described the TTM Squeeze in his book Mastering the Trade. LazyBear published Squeeze Momentum, his open version of it, on TradingView in 2014. It compares two bands around the same 20-candle average:

**Bollinger Bands = SMA(close, 20) ± 1.5 × standard deviation(close, 20)**

**Keltner Channels = SMA(close, 20) ± 1.5 × SMA(true range, 20)**

- **In a squeeze:** the lower Bollinger Band is above the lower Keltner Channel and the upper band is below the upper channel. Price is quieter than its usual range.
- **Out of a squeeze:** both Bollinger Bands are outside the channels.
- **Fired:** the candle before was in a squeeze and this one is not.

The momentum is the end point of a 20-candle linear regression of:

**close − ((highest high + lowest low) / 2 + SMA(close, 20)) / 2**, with the highest high and lowest low over the last 20 candles.

It is above zero when price sits above the middle of its recent range and its average, and below zero when it sits under them.

How to read it:

- **Squeezes are the usual state.** On BTC/USDT 1h the default settings are in a squeeze on about 60% of candles, and a median squeeze lasts 14 candles.
- **About half of the fires point up.** On BTC/USDT 1h, momentum is above zero on about 54% of the candles where the squeeze fires.
- **A fire means movement, not direction.** After a fire with positive momentum on BTC/USDT 4h, price moved 1.5% above the entry within 24 candles after about 73% of fires, and 1.5% below it after about 71%.

**The default matches TradingView's chart.** The Squeeze Momentum script TradingView displays uses its KC multiplier, 1.5, for the Bollinger Bands too, so its BB MultFactor input changes nothing. Gainium's default **BB multiplier** is the same 1.5. On 7,196 BTC/USDT 1h candles, Gainium and TradingView showed the same squeeze on every candle, and the squeeze fired with positive momentum on the same 124 candles. LazyBear posted a corrected source separately, in which the Bollinger multiplier is its own input, and John Carter's TTM Squeeze uses 2 standard deviations. Set **BB multiplier** to 2 for that version.

![Squeeze Momentum Indicator by LazyBear on BINANCE:BTCUSDT 4h, dark theme: the momentum histogram in green above zero and red below it, with grey crosses on the zero line out of a squeeze and dark crosses in one](https://content.gainium.io/images/content/indicators/squeeze-momentum__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| BB length | 20 | Candles of the Bollinger Bands. |
| BB multiplier | 1.5 | Width of the Bollinger Bands in standard deviations. 1.5 (the default) matches the Squeeze Momentum chart TradingView shows; 2 is LazyBear's corrected version. |
| KC length | 20 | Candles of the Keltner Channels, also the length of the momentum. |
| KC multiplier | 1.5 | Width of the Keltner Channels as a multiple of the average true range. |
| Interval | 1 hour | Candle size the squeeze and the momentum are calculated on, from 1 minute to 1 week. |
| Squeeze | Squeeze fired | In a squeeze: the Bollinger Bands are inside the Keltner Channels. Fired: the squeeze ended on this candle (the candle before was in one). Out of a squeeze: the bands are outside the channels. |
| Momentum | Positive | The momentum histogram: above or below zero, higher or lower than on the candle before, or crossing zero. Both Squeeze and Momentum must hold; they cannot both be Any. |
| Keep true | 0 | This condition will remain true for a number of extra bars. Default is 0, which means it will be true only on the bar that triggered the condition. |

**Tip:** **BB multiplier** 2 instead of 1.5 puts BTC/USDT 1h in a squeeze on about 35% of candles instead of 60%. Squeezes last half as long, with a median of 7 candles, and fire about 16% more often.

**Tip:** **Squeeze** Squeeze fired is true on one candle per squeeze. In a squeeze is true on every candle of it, so with Momentum Positive a bot can open deal after deal while the squeeze lasts. Use In a squeeze with a crossing rule, or with a limit on open deals.

**Tip:** **Momentum** Crossing up with Squeeze Any fires on every zero crossing of the histogram. On BTC/USDT 1h that is about 1.6 times as often as Squeeze fired with Positive.

## Trading setups for bots

### Buy when the squeeze fires up

- **Entry:** Squeeze Momentum, Squeeze **Squeeze fired**, Momentum **Positive**, default lengths and multipliers, Interval 4 hours.
- **Exit:** take profit 1.5%, with a stop loss of 1.5% to 2%.
- **Settings:** the defaults, BB multiplier 1.5. With 2 the 4h squeezes fire about 6% more often, and price moved 1.5% below the entry after more of those fires (about 76%) than 1.5% above it (about 70%).
- **Timeframe:** 4 hours. Price moved 1.5% above the entry within 24 candles after about 73% of the 4h fires, against 51% on 1h.
- **When it fails:** when the breakout reverses. Price also moved 1.5% below the entry within 24 candles after about 71% of the 4h fires, so the move after a fire runs both ways. Keep the stop loss, or add a trend filter such as the Moving Averages trend filter.

In the chart below, the first grey cross after a run of orange ones came with momentum already above zero. The squeeze fired there, and price climbed about 1% over the next day.

![Annotated Gainium bot chart, BTC/USDT 1h, with Squeeze Momentum: orange crosses on the zero line during a squeeze, the first grey cross with a green histogram bar ringed where the squeeze fires up, and a vertical line through the price candle](https://content.gainium.io/images/content/indicators/squeeze-momentum__fired.webp)

### Enter early: momentum crosses up inside the squeeze

- **Entry:** Squeeze Momentum, **BB multiplier** 2, Squeeze **In a squeeze**, Momentum **Crossing up**, Interval 4 hours.
- **Exit:** take profit 1.5%, with a stop loss of 1.5% to 2%.
- **Settings:** BB multiplier 2, the other fields at their defaults. With 2 the squeezes are shorter, so a crossing inside one comes closer to the fire. The condition is true only on the candle the histogram crosses zero, so it opens one deal per crossing.
- **Timeframe:** 4 hours. After about 73% of these entries on BTC/USDT 4h, the squeeze later fired with positive momentum; on 1h it was about 66%. With the default 1.5 it was about 58% on 4h.
- **When it fails:** when the squeeze fires down. The entry comes before the breakout, so about a quarter of the 4h entries were early longs into a fall. Price moved 1.5% below the entry within 24 candles after about 71% of them.

In the chart below, with the default 1.5, momentum crossed up zero while the crosses were still orange, five candles before the squeeze fired. With BB multiplier 2 the same squeeze fired two candles earlier.

![Annotated Gainium bot chart, BTC/USDT 1h, with Squeeze Momentum: the first green histogram bar after a red stretch is ringed while the zero-line crosses are still orange, five candles before the squeeze fires](https://content.gainium.io/images/content/indicators/squeeze-momentum__cross-up.webp)

## Using Squeeze Momentum in Gainium

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit**, then **Change indicator**, search for **Squeeze** and pick **Squeeze Momentum** from the Volatility category.

![The Select start indicator dialog in the Gainium bot form, searched for Squeeze, with the Squeeze Momentum card in the Volatility category](https://content.gainium.io/images/content/indicators/squeeze-momentum__picker.webp)

The fields and their defaults:

- **BB length:** 20, from 2 to 500.
- **BB multiplier:** 1.5, from 0.1 to 10, in steps of 0.1.
- **KC length:** 20, from 2 to 500. It is also the momentum length.
- **KC multiplier:** 1.5, from 0.1 to 10.
- **Interval:** 1 hour.
- **Squeeze:** Squeeze fired. Or In a squeeze, Out of a squeeze or Any.
- **Momentum:** Positive. Or Negative, Rising, Falling, Crossing up, Crossing down or Any.
- **Keep true:** 0 extra candles.

![The Squeeze Momentum settings card in the Gainium bot form with its defaults: BB length 20, BB multiplier 1.5, KC length 20, KC multiplier 1.5, Interval 1 hour, Squeeze fired, Momentum Positive, Keep true 0](https://content.gainium.io/images/content/indicators/squeeze-momentum__settings.webp)

The bot-form chart draws the histogram in LazyBear's four colours and puts a cross on the zero line for every candle: orange in a squeeze, grey out of one, and blue when neither holds. LazyBear's original draws the in-squeeze crosses black, which does not show on a dark chart.

![The Gainium bot-form chart, BTC/USDT 1h, with Squeeze 20 1.5 20 1.5: the momentum histogram in bright and dark green and red, with orange and grey crosses on the zero line](https://content.gainium.io/images/content/indicators/squeeze-momentum__bot-chart.webp)

Squeeze Momentum works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. The backtest draws it on every deal chart.

Example configuration for the first setup: BB length 20, BB multiplier 1.5, KC length 20, KC multiplier 1.5, Interval 4 hours, Squeeze fired, Momentum Positive, Keep true 0, take profit 1.5%.

## Related indicators

- [Bollinger Bands](https://gainium.io/indicators/bb): the inner bands of the squeeze.
- [Keltner Channel](https://gainium.io/indicators/keltner-channel): the outer channels the bands are compared with.
- [Bollinger Bands Width](https://gainium.io/indicators/bbw): another way to find a squeeze, from how narrow the bands are.
