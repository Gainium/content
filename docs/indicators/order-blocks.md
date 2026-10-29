---
id: 1055
name: Order Blocks
slug: order-blocks
description: >-
  Use Order Blocks in Gainium bots: the candle before a break of structure
  marks a price zone, kept until a candle closes through it, and a bot can
  buy or sell when the close crosses its top, middle or bottom.
createdAt: '2026-10-29T12:00:00.000Z'
updatedAt: '2026-10-29T12:00:00.000Z'
publishedAt: '2026-10-29T12:00:00.000Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
  - smart-money
  - structure
ingested: false
ingestedAt: ''
templateVersion: 2
tldr: >-
  An order block is the price zone of the candle where a move started before
  it broke structure. Gainium forms a bullish block when a close breaks above
  the latest swing high: the block is the candle with the lowest low between
  that swing and the break. A bearish block is the mirror below a swing low.
  A block ends when a candle closes through it. Only the latest block of each
  side counts. A bot compares the close with the block's top, middle or
  bottom; the default buys when the close drops into a bullish block.
kind: native
catalogKeys:
  - OB
category: structure
aliases:
  - "Order Blocks"
  - "Order Block"
  - "OB"
  - "Smart money concepts"
  - "SMC order blocks"
  - "Bullish order block"
  - "Bearish order block"
faq:
  - title: Does an order block repaint?
    details: >-
      No. A swing is confirmed Swing length candles after it prints, and a
      block forms on the close that breaks that swing. Once a block is on the
      chart it only changes when a candle closes through it or a newer block
      of the same side replaces it.
  - title: Why can I not pick Price greater than the top of a bearish block?
    details: >-
      The close that ends above a bearish block's top also ends the block on
      the same candle, so that condition could never fire. The same holds for
      Price lower than the bottom of a bullish block. The form leaves both out.
  - title: How is this different from the Fair Value Gaps indicator?
    details: >-
      Fair Value Gaps marks the gap between three candles that a fast move
      leaves behind. Order Blocks marks the candle the move started from,
      found by a break of a swing high or low. Both can be used in one bot.
  - title: Why does my bot's chart show fewer blocks than TradingView?
    details: >-
      Gainium keeps only the latest active block of each side, because that is
      the one the condition reads. Scripts such as LuxAlgo's draw several
      blocks per side and turn broken ones into breaker blocks, which Gainium
      does not track.
related:
  - fair-value-gap
  - market-structure
  - support-resistance-indicator
sources:
  - title: LuxAlgo, Order Blocks & Breaker Blocks (TradingView script; swing lookback, blocks from a break of structure, mitigation)
    url: https://www.tradingview.com/script/piIbWMpY-Order-Blocks-Breaker-Blocks-LuxAlgo/
  - title: Binance BTC/USDT 1h, 4h and 1d candles, computed with Gainium's indicator engine
---

An order block is the price zone of the candle where a move started, found once that move breaks a swing high or low. Smart-money traders expect price to come back to the zone and react there. In Gainium a bot can buy or sell when the close crosses the top, middle or bottom of the latest bullish or bearish block.

## What is Order Blocks

Order blocks come from smart-money concepts (SMC). The idea is that large orders filled in a zone leave unfilled orders behind, so price reacts when it returns. Gainium follows the non-repainting definition of LuxAlgo's Order Blocks script:

- **Swings.** A swing high is a high with **Swing length** candles on each side that are lower; a swing low is the mirror. A swing is confirmed Swing length candles after it prints.
- **Bullish block.** When a candle closes above the latest unbroken swing high (a bullish break of structure), the block is the candle with the lowest low between that swing high and the breaking candle. Ties go to the later candle. The zone is that candle's low to high. The swing high is then used up.
- **Bearish block.** When a candle closes below the latest unbroken swing low, the block is the candle with the highest high in between, and the zone is its low to high.
- **Mitigation.** A bullish block ends when a candle closes below its bottom. A bearish block ends when a candle closes above its top.
- **One block per side.** Only the latest active block of each side is kept, and a new one replaces the old. The search for the block candle looks back at most 500 candles.

How to read it:

- **Blocks come often on short candles.** On BTC/USDT 1h with Swing length 5, a new bullish block forms about once every 40 candles, and a bullish block is active on about 60% of candles.
- **Block height grows with the interval.** The median bullish block is about 0.9% of price tall on 1h, 2% on 4h and 4% on 1 day.
- **Swing length sets how many blocks you get.** Swing length 10 gives about half as many blocks as 5, and 3 about 1.4 times as many.

The chart below is LuxAlgo's Order Blocks & Breaker Blocks script on TradingView, with its default swing lookback of 10. It draws boxes from the block candle, keeps the last three blocks of each side (blue bullish, orange bearish), and turns a broken block into a dashed breaker block. Gainium's bot chart differs: it draws only the latest active block of each side, as a shaded zone between its top and bottom lines starting from the breaking candle. It does not track breaker blocks.

![LuxAlgo Order Blocks & Breaker Blocks on BINANCE:BTCUSDT 4h, dark theme: blue bullish order block boxes below price, orange bearish boxes above it, and dashed green and red breaker blocks](https://content.gainium.io/images/content/indicators/order-blocks__chart.webp)

### Settings and tips

| Setting | Default | What it does |
| --- | --- | --- |
| Interval | 1 hour | Candle size the swings and blocks are found on, from 1 minute to 1 week. |
| Swing length | 5 | A swing high or low needs this many bars on each side of it, so it is confirmed this many bars after it prints. A close beyond the latest swing forms a block. |
| Block | Bullish block | Bullish: formed when a close breaks above a swing high; the candle with the lowest low before the break. Bearish: the mirror below a swing low. Only the latest block of each side counts; it ends when a candle closes through it. |
| Level | Top | The edge of the block the close is compared with, or its middle. |
| Condition | Price crossing down | Crossing compares two candles of the same block; a new block moving the level is not a crossing. No active block: false. Price crossing down the top of a bullish block is the retest long. |
| Keep true | 0 | This condition will remain true for a number of extra bars. Default is 0, which means it will be true only on the bar that triggered the condition. |

**Tip:** **Swing length** 10 instead of 5 halves the number of blocks on BTC/USDT 1h. Its retests also held better: price traded 1% above the entry before the block ended after about 52% of the retests, against 43% with 5.

**Tip:** **Condition** Price crossing up on the top of a bullish block fires when price bounces back out of the block. It fires about two thirds as often as Price crossing down, usually a few candles after it.

**Tip:** **Level** and **Condition** Price greater than the top of a bearish block, and Price lower than the bottom of a bullish block, are not offered. The close that would pass that level ends the block on the same candle.

## Trading setups for bots

### Buy the retest of a bullish block

- **Entry:** Order Blocks, Swing length **5**, Block **Bullish block**, Level **Top**, Condition **Price crossing down**, Interval 4 hours.
- **Exit:** take profit 1%. Set a stop loss a little under the block's bottom. On 4h the median block is about 2% tall, so 2.5% covers most of them.
- **Settings:** Level Top enters as soon as the close drops into the block. Level Middle waits for a deeper retest and fires about half as often.
- **Timeframe:** 4 hours. Price traded 1% above the entry before the block ended after about 72% of the 4h retests, against 43% on 1h.
- **When it fails:** when the close goes through the block. On 1h, a close under the block's bottom came first after about 46% of the retests. On 4h it was about 28%.

In the chart below, a close dropped under the top of the bullish block at about 80,110. Price fell another 1% inside the block, held above its bottom, and recovered.

![Annotated Gainium bot chart, BTC/USDT 1h, with Order Blocks: a green bullish block from 80,202 to 79,175; the candle that closes under its top is ringed, and the low that follows stays inside the block](https://content.gainium.io/images/content/indicators/order-blocks__retest-long.webp)

### Short the retest of a bearish block

- **Entry:** in a short bot, Order Blocks, Swing length **5**, Block **Bearish block**, Level **Bottom**, Condition **Price crossing up**, Interval 4 hours.
- **Exit:** take profit 1%. Set a stop loss a little above the block's top.
- **Settings:** Level Bottom enters as soon as the close rises into the block.
- **Timeframe:** 4 hours. Price traded 1% under the entry before the block ended after about 61% of the 4h entries, against 46% on 1h.
- **When it fails:** in a rally. A close above the block's top ends it; on 1h that came first after about 46% of the entries.

In the chart below, a close rose into the bearish block at about 80,780. A few candles later a close went above the block's top, the block ended, and price kept rising: the stop loss case.

![Annotated Gainium bot chart, BTC/USDT 1h, with Order Blocks: the candle that closes into a red bearish block is ringed, then the candle that closes above the block's top is ringed and price keeps rising](https://content.gainium.io/images/content/indicators/order-blocks__bearish-retest.webp)

## Using Order Blocks in Gainium

1. Create a DCA bot and switch the form to **Manual**. Pick the Short strategy for the second setup.
2. Set **Deal start condition** to **Indicators**, or the take profit or stop loss type to **Indicators** for an exit.
3. Click **Edit**, then **Change indicator**, search for **Order** and pick **Order Blocks** from the Chart category.

![The Select start indicator dialog in the Gainium bot form, searched for Order, with the Order Blocks card in the Chart category](https://content.gainium.io/images/content/indicators/order-blocks__picker.webp)

The fields and their defaults:

- **Interval:** 1 hour.
- **Swing length:** 5 bars, from 2 to 50.
- **Block:** Bullish block. Or Bearish block.
- **Level:** Top. Or Middle or Bottom.
- **Condition:** Price crossing down. Or Price crossing up, Price greater than or Price lower than.
- **Keep true:** 0 extra candles.

![The Order Blocks settings card in the Gainium bot form with its defaults: Interval 1 hour, Swing length 5, Block Bullish block, Level Top, Condition Price crossing down, Keep true 0](https://content.gainium.io/images/content/indicators/order-blocks__settings.webp)

The bot-form chart shades the latest bullish block in green and the latest bearish block in red, from the breaking candle until a close goes through the block or a newer block replaces it.

![The Gainium bot-form chart, BTC/USDT 1h, with Order Blocks 5: green bullish zones under price and red bearish zones above it, each starting at the candle that broke structure](https://content.gainium.io/images/content/indicators/order-blocks__bot-chart.webp)

Order Blocks works as a deal start, DCA, take profit or stop loss condition, and in the Bot Controller. A crossing only counts while the block stays the same: a new block that jumps over the close is not a crossing.

Example configuration for the first setup: Interval 4 hours, Swing length 5, Block Bullish block, Level Top, Condition Price crossing down, Keep true 0, take profit 1%.

## Related indicators

- [Fair Value Gaps](https://gainium.io/indicators/fair-value-gap): the gap a fast move leaves, often right after an order block.
- [Market Structure](https://gainium.io/indicators/market-structure): the swing highs and lows whose break forms a block.
- [Support and Resistance](https://gainium.io/indicators/support-resistance-indicator): pivot levels instead of zones.
