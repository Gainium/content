---
id: 9
name: Finding the optimal grid bot spacing
slug: grid-step
description: >-
  Unlock the secrets to optimal grid spacing for your grid bot. Discover how to
  balance trade frequency and fees for maximum profitability.
createdAt: '2022-08-09T05:15:55.547Z'
updatedAt: '2026-02-24T07:44:20.573Z'
publishedAt: '2022-08-09T05:18:02.132Z'
locale: en
categories:
  - grid-bots
difficulty: beginner
tags:
  - bot
  - grid
faq:
  - title: What is grid spacing in crypto trading?
    details: >-
      Grid spacing refers to the distance between buy and sell orders set by a
      grid bot, crucial for capturing price movements effectively.
  - title: How does grid spacing affect trading profitability?
    details: >-
      Proper grid spacing ensures a balance between capturing profitable trades
      and overcoming exchange fees, crucial for net gains.
  - title: Why should grid spaces not be too narrow?
    details: >-
      Narrow grid spaces may result in higher transaction costs, potentially
      consuming profits due to the need to cover exchange fees.
  - title: Can I set any grid spacing I want?
    details: >-
      Exchanges may have limitations on how close grid lines can be, often
      preventing grids less than 0.2% apart to ensure feasibility.
  - title: How can I find the optimal grid spacing for my strategy?
    details: >-
      Backtesting with historical data allows you to fine-tune grid spacing
      according to your coin pair's volatility and trading behavior.
ingested: true
ingestedAt: '2025-06-29T10:57:30.012Z'
tldr: >-
  The grid step (spacing between buy/sell orders) should balance trade frequency
  against exchange fees; too-narrow spacing wastes profits on fees. Aim for
  0.5–1% spacing depending on coin volatility, and use backtesting to optimize.
---

The grid step, aka grid spacing, is an essential factor to consider when setting your grid strategy. As you may have guessed, a lower step will increase the number of transactions and lower the profit per transaction, so where is the sweet spot? Let's dive in.

## Finding the right grid spacing for your strategy

Before asking yourself what grid step you should be using, you have to consider two critical questions:
- What is your budget?- How wide do you want the trading range to be?

The answer to these two questions may limit your grid step. If you have a small budget, you will have no choice but to allow for a bigger grid step to cover a decent trading range.&nbsp;

If budget is not an issue, the next question is how wide the trading range should be. The wider the range, the more you spread your funds. Hence, the less profit per transaction, but the more likely the price will stay within range. So, there is another “sweet spot” to be considered here.

As a general rule of thumb, you should emphasize the budget and trading range more than the grid step. If budget is not an issue and you have already set a trading range you are comfortable with, you can aim for a 0.5-1% grid step. You can use around 0.5% for less volatile coins (top 10 by market cap) and 1% or even more for the more volatile currencies.

### Tailoring Grid Spacing to Your Coin Pair

One size does not fit all. Each coin pair has its dance, with unique volatility and behavior. Your job as a digital fisherman is to match your grid spacing to the rhythm of your chosen pair. This is where [grid bot backtesting](https://gainium.io/help/backtesting-grid-bots) becomes your best friend. It allows you to simulate your grid bot strategy with historical data, fine-tuning your grid spacing (and other settings) without risking a dime.

### The Thin Line: Overcoming Exchange Fees

Here's a pro tip: Avoid grid spaces that are too narrow. Why? Because every trade has a cost, thanks to exchange fees. Your grid bot needs not just to make a profit but also cover these fees. For instance, if you set grids 0.2% apart in spot trading, the grid bot will space them 0.4% apart when accounting for the buy and sell fees (0.2% grid plus 0.1% spot fee x 2). Suddenly, half of your spacing is just to overcome fees, making it very inefficient for you (great for the exchange though).

### Navigating Exchange Limitations

There's another hoop to jump through. Exchanges have rules. Many prevent orders that are less than 0.2% apart. This limitation ensures that your grid bot isn't stepping on its own toes or, worse, working for free just to cover fees.

### Example: Backtest results of BTC/USDT with different grid spacing

Now, it's time to put theory into practice. Here are the results of 3 backtests performed in the same period, each with a different grid spacing: 1%, 0.5%, and 0.25%. You can observe that as the grid spacing is reduced, the net result % decreases. However, bear in mind that the absolute net result in USDT is higher because as we used more grids with less spacing, the required budget is also much higher (due to the exchange minimum order).

Results:
- 1% spacing: 1.8% net result- 0.5% spacing: 1.76% net result- 0.25% spacing: 1.33% net result

![1-spacing.webp](https://gainium.io/images/content/help/1_spacing_37b54a31ef-5cb8d0.webp)![0.5-spacing.webp](https://gainium.io/images/content/help/0_5_spacing_de5962d99e-4fa14f.webp)![0.25-spacing.webp](https://gainium.io/images/content/help/0_25_spacing_5d903d6028-3ad28f.webp)

## The Takeaway

Finding the optimal grid spacing is more art than science. It's about knowing your coin pair, backtesting your strategy, and understanding the balance between being too greedy and too cautious. Remember, your grid bot is your fishing net waiting for a movement. With the proper spacing, you're setting yourself up for a good catch. So, dive into the data, keep an eye on fees, and may your grid bot thrive with profit.

&nbsp;
