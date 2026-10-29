---
name: Urma Lite DCA Bot Strategy
slug: urma-lite
description: >-
  Urma Lite is an always-on DCA bot: it opens a deal as soon as it can, averages
  down with seven safety orders and sells 3% above the average price. Its rules,
  how to run it in Gainium, and how it does against random entries on BTC, ETH and SOL.
tldr: >-
  Start a deal whenever the coin has none, average down with seven equal-sized
  safety orders that spread wider as price falls, and take profit 3% above the
  average price. No entry signal and no stop loss.
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
sources:
  - title: Urma Lite – simple low cost DCA always-on bot (Gainium community thread)
    url: https://community.gainium.io/t/1663
related:
  - double-dca
  - qfl
faq:
  - title: What is the Urma Lite strategy?
    details: >-
      A DCA bot shared on the Gainium forum by a community member, built from the
      "ASAP DCA" bots popularised by TradeAlts and trimmed so each deal needs little
      capital. It buys at once, averages down on the way down and sells a small bounce.
  - title: Why does an always-on bot have a random-entry comparison?
    details: >-
      Its entry is "now", so the test asks whether entering at once beats entering
      at random moments with the same safety orders and take profit. A DCA bot's
      result comes mostly from its exits and its safety order ladder, and the
      comparison shows how much.
  - title: What breaks it?
    details: >-
      A long fall past the last safety order. The bot has no stop loss, so a coin
      that keeps falling leaves the deal open, and the capital in it, until price
      comes back.
---

Urma Lite is a DCA bot with no entry signal. It opens a deal as soon as a coin has none, buys more as price falls, and sells the whole position on a small bounce. The forum member who shared it ran it through the 2021 bull market and tuned it to cover a deep drop with little capital per deal.

## How the rules work

The first order and every safety order are the same size. The first safety order sits 1.87% below the entry and each next one is 1.5 times further away and 1.4 times larger, so seven of them reach far below the entry. Each fill lowers the average price, and the take profit follows it: the deal closes 3% above the average, not above the first buy.

Because it starts again as soon as a deal closes, the bot is almost always in the market. What it earns is the sum of many small bounces.

## Running it in Gainium

Use **Copy to Gainium** on this page to open the bot form with the tested settings, or set it up by hand:

1. Create a DCA bot and leave the start condition on **ASAP**.
2. Turn on safety orders: 7 orders, the same size as the base order, deviation 1.87%, step scale 1.5, volume scale 1.4.
3. Set take profit to 3%.
4. Allow one deal per pair and leave stop loss off.

## When it fails

A coin that falls further than the last safety order and stays down. The deal then holds the full position with no order left to average it, and the take profit sits far above the price. The author noted it struggled when altcoins bled against BTC after the 2021 peak.
