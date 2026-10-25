---
id: 135
name: Average Position Price (AVP) Indicator
slug: avp
description: >-
  Use the Average Position Price (AVP) indicator in Gainium to optimize bot
  trading strategies with effective entry and exit conditions.
createdAt: '2024-10-11T05:07:19.359Z'
updatedAt: '2026-10-25T00:00:00.000Z'
publishedAt: '2024-10-11T05:10:52.309Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:29.993Z'
tldr: >-
  Average Position Price (AVP) is a Gainium exit condition that tests a deal's
  unrealized profit against its average entry price, net of an estimated
  round-trip fee. It only exists in the take profit and stop loss sections:
  close the deal when unrealized PnL is greater than, or lower than, a
  percentage (2% by default). Combined with AND it works as a profit floor
  under another exit signal; alone in its own group it closes the deal by
  itself. Because it follows the average, it moves with every DCA fill.
templateVersion: 2
kind: native
catalogKeys:
  - UNPNL
category: composite
aliases:
  - AVP
  - Average Position Price
  - Average Entry Price
  - Unrealized PnL indicator
faq:
  - title: Can AVP start a deal?
    details: >-
      No. AVP needs an open deal, so it only appears when the take profit or
      stop loss type is Indicators. It is not offered as a start condition, for
      DCA orders or in the Bot Controller.
  - title: Is the AVP percentage before or after fees?
    details: >-
      After an estimate. The bot subtracts twice the pair's taker fee from the
      move away from the average price, 0.2% when the fee is 0.1%. Set 2% and
      the deal closes when price is about 2.2% above the average.
  - title: How is AVP different from a 2% take profit?
    details: >-
      A percentage take profit is an order placed in advance. AVP is a
      condition the bot checks, and you can combine it with other indicators
      with AND or OR, which a fixed take profit can't do.
  - title: Why did my AVP stop not fire after the price fell?
    details: >-
      The level follows the average price. Every DCA fill lowers the average,
      so the loss measured from it shrinks and the stop moves down with it.
related:
  - rsi
  - atr
  - adr
sources:
  - title: Gainium, DCA Mode (how DCA orders change the average price)
    url: https://gainium.io/help/dca-mode
  - title: Gainium, Multiple Take Profit Targets
    url: https://gainium.io/help/multiple-take-profit-targets
  - title: Binance BTC/USDT 1h candles, computed with Gainium's indicator engine
---

Average Position Price (AVP) is a Gainium exit condition that compares a deal's unrealized profit with a percentage, measured from the deal's average entry price. Traders use it to put a profit floor under an indicator exit, or a loss cap that moves down as DCA orders fill.

## What is Average Position Price (AVP)

AVP is a Gainium condition, not a chart indicator. It starts from the deal's average position price:

**Average price = Σ (fill price × quantity) / Σ quantity**, over the deal's filled buy orders: the base order and every DCA order. For a short deal, over its sell orders.

The condition tests unrealized PnL against that average:

**Unrealized PnL % = (Price − Average price) / Average price × 100 − 2 × taker fee**

- **Price** is the latest price of the pair.
- **Average price** is the formula above. It changes every time a DCA order fills.
- **2 × taker fee** is the estimated cost of entering and leaving. With a 0.1% fee, the bot subtracts 0.2 percentage points.

For a short deal the sign flips: the deal is in profit when price is below the average.

How to read it: with **Greater than 2**, a long deal closes once price is about 2.2% above its average. With **Lower than −4**, it closes once price is about 3.8% below it. Both levels move every time a DCA order fills.

![Annotated chart of BINANCE:BTCUSDT 1h for an example deal: entry at 84,490, three DCA fills 1.5% apart, and the average price stepping down from 84,490 to 83,856, 83,222 and 82,589 as each order fills](https://content.gainium.io/images/content/indicators/avp__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Condition | Greater than | Greater than closes at or above a profit level; Lower than closes at or below a loss level. |
| Unrealized PnL % | 2 | The level, in percent from the average price, after twice the taker fee is taken off. Use a negative number for a loss. |

**Tip:** Unrealized PnL % 2 closes about 2.2% above the average price, not 2%. The engine subtracts twice your taker fee before it compares, and uses 0.1% when it does not know the fee. On a 0.075% taker fee the close sits at 2.15%.

**Tip:** Lower than −4 fires when price is about 3.8% under the average with a 0.1% taker fee, because the fee deduction moves a loss level closer too.

**Tip:** the bot reads only the first AVP condition in the take profit section and the first in the stop loss section. A second AVP with another Unrealized PnL % in the same section is ignored, so put a floor in take profit and a cap in stop loss.

## Trading setups for bots

### RSI exit with a profit floor

An RSI exit closes the deal on momentum, but it can fire at a loss after DCA fills. AVP in the same group keeps it from closing until the deal is in profit.

- **Entry:** any start condition, with one DCA order 1.5% below the entry.
- **Exit:** RSI(14, 1h) crossing down 70 AND AVP greater than 1%.
- **Settings:** Take profit type Indicators, one group with two conditions joined by AND. RSI: Length 14, Interval 1 hour, Condition Crossing down, Value 70. AVP: Condition Greater than, Unrealized PnL % 1.
- **Timeframe:** the RSI's 1h interval sets the pace. AVP has no interval; the bot checks it on every price update.
- **When it fails:** the floor can hold a deal through a reversal. If RSI crosses down 70 below the floor and price then falls, the deal waits for the next RSI cross, which can be many bars away.

Example on BTC/USDT 1h, in the chart below: a deal opened at 83,996. RSI crossed down 70 at 84,883, only 0.9% up after fees, so AVP held the deal open. The DCA order at 82,736 then filled and pulled the average to 83,366. RSI crossed down 70 again at 84,638, 1.3% above the average, and the deal closed.

![Annotated chart of BINANCE:BTCUSDT 1h with RSI(14) below: entry at 83,996, the first RSI cross below 70 blocked by the 1% floor, the DCA fill at 82,736, and the close at 84,638 when RSI crossed below 70 again](https://content.gainium.io/images/content/indicators/avp__rsi-floor.webp)

### Loss cap from the average price

In the stop loss section, AVP alone in its own group closes the deal when the loss from the average reaches your limit.

- **Entry:** any start condition, with three DCA orders 1.5% apart.
- **Exit:** stop loss when AVP is lower than −4%. Take profit as usual.
- **Settings:** Stop loss type Indicators, one group with AVP: Condition Lower than, Unrealized PnL % −4. When indicators trigger close by: Market.
- **Timeframe:** any. The level depends on fills, not candles.
- **When it fails:** the cap follows the average, so each DCA fill pushes it lower. With a fourth DCA order at 79,420 in the example below, the cap would have moved to 78,841 and never been hit. It also fires on wicks: the hit below came on a candle that closed 0.4% higher, and price was back above 80,800 within a few bars.

Example on BTC/USDT 1h, in the chart below: a deal opened at 84,490. DCA orders filled at 83,222, 81,955 and 80,688, taking the average to 82,589 and the cap to about 79,450. One candle then wicked to 79,221, and the stop closed the deal.

![Annotated chart of BINANCE:BTCUSDT 1h: the average price after three DCA fills at 82,589, the −4% cap line at about 79,450, and the candle whose wick to 79,221 triggered the stop](https://content.gainium.io/images/content/indicators/avp__loss-cap.webp)

## Using Average Position Price (AVP) in Gainium

AVP only closes deals. It is not available as a start condition, for DCA orders or in the Bot Controller.

1. Create a DCA bot and switch the form to **Manual**.
2. Set **Take profit type** to **Indicators** (or turn on **Stop Loss** and set its type to **Indicators**). The bot adds an RSI condition in a group.
3. For a profit floor, click **Indicator** to add a second condition to the same group, click **Edit** on it, then **Change indicator**, and pick **Average position price (AVP)**. For a standalone cap, click **Group** first and put AVP alone in the new group.

The AVP card has two fields:

- **Condition:** Greater than. The other option is Lower than.
- **Unrealized PnL %:** 2. Use a negative number with Lower than for a loss cap.

AVP has no interval and no Keep true. **When indicators trigger close by** sets whether the close goes out as a limit or a market order.

![The Gainium take profit section set to Indicators, showing "RSI and AVP" as the close rule, the RSI condition and the AVP card with Condition Greater than and Unrealized PnL % 2 ringed](https://content.gainium.io/images/content/indicators/avp__take-profit-group.webp)

How the group logic works:

- **AVP AND other conditions:** AVP acts as a gate. The deal closes only when the other conditions fire while AVP is true.
- **AVP alone in a group, joined to others by OR:** AVP closes the deal by itself as soon as it is true.

AVP differs from a percentage take profit in one way that matters: a percentage take profit is an order the bot places in advance, while AVP is a check the bot runs and can combine with other conditions.

**Example configuration** (the profit floor): Take profit type Indicators. One group: RSI with Length 14, Interval 1 hour, Condition Crossing down, Value 70; AND AVP with Condition Greater than, Unrealized PnL % 1. When indicators trigger close by: Limit. One DCA order 1.5% below the entry.

## Related indicators

- [RSI](https://gainium.io/indicators/rsi): the most common signal to gate with an AVP profit floor.
- [Average True Range (ATR)](https://gainium.io/indicators/atr): Dynamic ATR/ADR sets the exit as a multiple of volatility instead of a fixed percentage.
- [Average Daily Range (ADR)](https://gainium.io/indicators/adr): the same, in units of a normal day's range.
