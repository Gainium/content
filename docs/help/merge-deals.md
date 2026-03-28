---
id: 35
name: Merge Deals
slug: merge-deals
description: Lear about the merge deals feature on Gainium.
createdAt: '2022-10-20T05:49:17.146Z'
updatedAt: '2026-02-24T07:44:20.575Z'
publishedAt: '2022-10-20T06:22:46.194Z'
locale: en
categories:
  - trading-bots
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.016Z'
tldr: >-
  The Merge Deals feature consolidates multiple open deals on the same exchange
  and coin pair into a single deal by summing their base amounts and calculating
  a weighted-average break-even price. Pending orders from original deals are
  cancelled.
---

If you ever found yourself in the situation where your bot opened many small deals and you wish you could consolidate all of them into a single one for easier management? We have just the feature for you! With the merge deal feature, you can consolidate any deals into a single one, as long as they are on the same exchange and coin pair.

## What happens when deals are merged?

When several deals are merged, their base amount are added and their break-even price are weighted-averaged into a single deal. Only the amount of purchased base (for longs) or sold base (for shorts) are consolidated into a new deal, any pending orders of the original deals will be cancelled.

**Example:**

Suppose we have have two deals
- Deal A: 0.5 BNB that we purchased for 100 BUSD. Break-even price is 200 BUSD/BNB. It has a TP set at 250 BUSD/BNB and SL set at 100 BUSD/BNB.- Deal B: a DCA deal currently for 1 BNB. 0.5 BNB was purchased for 200 BUSD/BNB and another 0.5 BNB was purchased for 150 BUSD/BNB. It has a pending DCA order for another 0.5BNB at 100 BUSD/BNB. Break-even price is currently 350 BUSD/BNB

If we decide to merge these two deals, the result would be:
- Deal C: 1.5 BNB purchased for 450 BUSD, current break-even price is 300 BUSD/BNB. The pending TP and SL of deal A as well as the pending DCA order of deal B has been cancelled. We can manually set DCA, TP or SL on this deal if we wish.

## How can you merge deals?

To merge deals simply check the checkbox from the deals list and click on the “Merge Deals” button.

![Merge.webp](https://content.gainium.io/images/content/help/Merge_cdbb634507-8d8f09.webp)

**NOTE**: If your bot's entry signal is ASAP, merging deals may result in your bot opening new deals right after the merge. To avoid this, either change the entry trigger to something else, or adjust the maximum active deals so that there are no free slots for new deals after the merge.
