---
name: Turtle Trading Strategy
slug: turtle
description: >-
  The Turtle trading strategy buys a breakout above the 20-day high and exits on
  a break of the 10-day low. Its rules, how to run them as a Gainium bot, and how
  they do against random entries on BTC, ETH and SOL.
tldr: >-
  Buy when the daily close breaks the highest high of the last 20 days, sell when
  it breaks the lowest low of the last 10. Run it in Gainium as a DCA bot with a
  Donchian Channel start condition and a Donchian Channel close condition.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Classic Turtle Trading Strategy (Gainium community thread)
    url: https://community.gainium.io/t/1320
  - title: Curtis Faith, The Original Turtle Trading Rules
    url: https://www.tradingblox.com/originalturtles/originalturtlerules.htm
related:
  - grid-stack
  - qfl
faq:
  - title: What is the Turtle trading strategy?
    details: >-
      A trend-following system that Richard Dennis and William Eckhardt taught to
      a group of new traders in 1983. System 1 buys a breakout above the 20-day
      high and sells when price breaks the 10-day low.
  - title: Can a Gainium bot run the Turtle rules?
    details: >-
      The entry and the exit, yes: both are Donchian Channel conditions on daily
      candles. The volatility-based position size, adding units as the trade moves
      in your favour, and the 2N stop are not bot settings, so the tested version
      leaves them out. The list under "What the bot cannot do" names each one.
  - title: Does the Turtle strategy work on crypto?
    details: >-
      The results table on this page answers it with data: the same bot against
      random entries that use the same exit, on BTC, ETH and SOL, refreshed every
      month and split into an in-sample and an out-of-sample period.
---

The Turtle trading strategy is a breakout system: it buys when price closes above its recent range and sells when price closes below a shorter one. Richard Dennis and William Eckhardt taught it in 1983 to a group of traders they called the Turtles, to settle a bet about whether trading could be taught.

There were two systems. System 1, tested here, enters on a 20-day breakout and exits on a 10-day breakdown. System 2 uses 55 and 20 days and trades less often.

## How the rules work

The Donchian Channel draws the highest high and the lowest low of the last N candles. A close above the upper line of the 20-day channel is a new 20-day high, and the system buys it. The exit is the lower line of a 10-day channel: a close below it sells.

The exit is not a take profit. A trade stays open as long as price keeps making progress, so most trades are small losses and a few run far. The system depends on those few.

## Running it in Gainium

Create a DCA bot on the daily interval:

1. Set the start condition to **Technical indicators** and add a **Donchian Channel**: length 20, interval 1 day, condition **Crossing up**, value **Upper**.
2. Turn off safety orders.
3. In take profit, choose **Technical indicators** as the close condition and add a Donchian Channel: length 10, interval 1 day, condition **Crossing down**, value **Lower**.
4. Allow one deal per pair.

The channel compares the close with the high and low of the candles before it, so a close above the line is a real breakout of the prior range, not of a range that already includes it.

## When it fails

A breakout system loses in a sideways market. Each false breakout buys near the top of a range and sells near the bottom of it, and a choppy stretch can stack several in a row. The system only pays when a breakout turns into a trend that runs further than the 10-day exit lets back.

On spot, the bot only trades the long side. The original rules also sold short on a 20-day breakdown, which this test cannot include.
