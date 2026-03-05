---
id: 101
name: Mastering Auto-Compounding with Crypto Trading Bots
slug: autocompunding-trading-bots
description: >-
  Discover the power of auto-compounding in crypto trading bots, its pros and
  cons, and how to set it up in Gainium for optimized trading.
createdAt: '2024-03-05T09:58:06.904Z'
updatedAt: '2026-02-24T07:44:20.563Z'
publishedAt: '2024-03-05T10:37:15.118Z'
locale: en
categories:
  - combo-bots
  - trading-bots
difficulty: beginner
tags:
  - bot
  - trading
ingested: true
ingestedAt: '2025-06-29T10:57:29.992Z'
tldr: >-
  Auto-compounding reinvests bot profits to grow order sizes over time, and can
  be set up in Gainium using "% of free tokens" or "% of total tokens" for order
  sizing, ideally with a dedicated exchange subaccount. The sum of base order
  plus all DCA order percentages must never exceed ~98-99% of total tokens to
  avoid insufficient funds errors.
---

## What is Autocompounding and How Does It Work?

At its core, auto-compounding is all about reinvestment. Think of it like playing a video game where every coin you collect automatically spawns more coins for you to grab. In crypto trading, autocompounding does something similar with your profits. Reinvesting your earnings puts them back into the market to generate more wealth.

The exciting part is the effects of wins and losses on order sizes over time. Wins are like compounding joy; they increase your order sizes gradually, amplifying your potential profits. However, losses act as a reality check, reducing your order sizes and reminding you of the volatile dance of the market.

## Pros and Cons of Autocompounding Crypto Trading Bots

#### Pros:
- **Effortless Wealth Accumulation**: These bots are like set-and-forget tools that work round the clock, aiming to grow your investment without needing a constant eye.- **Power of Compounding**: With compounding, small gains can snowball into significant sums over time, potentially outpacing traditional investment returns.

#### Cons:
- **Market Risks**: The crypto market's unpredictability remains a constant. A series of losses can diminish the compounding effect.- **Over-reliance**: The temptation to rely too heavily on these bots could lead to overlooking the necessity of personal market research and strategy adaptation.

## How to Set Up Auto-compounding in Gainium

Setting up auto-compounding in Gainium is easy; here are the steps:&nbsp;
- Create a subaccount on your exchange. This step is optional but encouraged. A subaccount ensures a clear delimitation of your funds per bot.- Transfer funds from your main account to your subaccount (make sure it's the trading section of your subaccount).- Next, create the bot and set the bot to use a percentage of the free or total quote (for long positions) or base (for short positions).

![autocompunding bot.png](https://gainium.io/images/content/help/autocompunding_bot_3161810607-11c9f2.png)

Now, let's unpack both options, with examples to guide you.

### Using % of Total Tokens

This method tells the bot to use a specific percentage of your total holdings for each trade. Using this option, the bot will check only the total amount, including tokens that might be locked in limit orders and, therefore, inaccessible to trade. This option is straightforward but requires attention to not exceed 100% when combined with all orders, including DCA (Dollar Cost Averaging) orders.

**Example:** Suppose you have 1000 USDT. You set your bot to use 20% of your total tokens for the base order and 10% for each DCA order. If you plan five DCA orders, that's 50% for DCA orders plus 20% for the base order, totaling 70%. All is good here, as it's under 100%.

**Mistake Example:** If you set 30% for the base order and 20% for each of four DCA orders, that's 80% for DCA orders plus 30% for the base order, totaling 110%. That's a no-go; it exceeds 100% of your total tokens. The last DCA order will inevitably fail to be placed, and perhaps the bot won't be able to start. You will see the following error message in your bot in such cases.

![compound-error.png](https://gainium.io/images/content/help/compound_error_1b98e09a4b-435cb4.png)

### Using % of Free Tokens

This approach dynamically adjusts, using a percentage of the tokens that are free (not tied up in other orders) at the time of each trade. It's a bit more flexible and helps manage risk by ensuring you're not using all your tokens at once. While this method avoids using more than 100% of your tokens, it may result in a trade size under the exchange minimum order and, therefore, fail to execute.

**Example:** You start with 1000 XYZ tokens free. You set the bot to use 25% of free tokens for the initial order, which would be 250 XYZ tokens. After this order, you have 750 XYZ tokens free. If another order is triggered and you're still using 25% of free tokens, this time it would use 187.5 XYZ tokens.

**Mistake to Avoid:** Even with this method, ensure your settings don’t imply that you might eventually want to use more than 100% of your tokens due to compounding or accumulating DCA orders. Always leave room for market fluctuations and potential decreases in token value.

## Common Mistakes: Exceeding 100%

A frequent error is setting the bot's parameters without calculating the cumulative percentage used by all orders.
- **Total Tokens Mistake:** If the sum of your base order percentage plus all DCA order percentages exceeds 100%, you've overcommitted your tokens. This could lead to a situation where the bot can't place new orders because it's been instructed to use more tokens than you have.- **Free Tokens Mistake:** While less likely to happen because each order uses a decreasing amount of the free tokens, it's still possible to run into issues if your initial percentages are too high. This could lead to diminishing returns and potentially not having enough tokens to meet the minimum order size required by the exchange.

## Key Takeaways
- **For Total Tokens:** Be crystal clear on the percentages. The sum of your base order and all DCA orders should never exceed 100% of your total tokens.- **For Free Tokens:** Start with a conservative percentage to ensure your orders meet the exchange's minimum requirement even as the free token amount decreases.

Setting up your bot with a keen eye on these percentages can dramatically influence your trading success. Use these examples as a starting point, and adjust based on your risk tolerance and trading strategy.

## Useful Tips

Here are some nuggets of wisdom to ensure your trading success:
- **Never exceed 100%: **Be crystal clear on the percentages. The sum of your base order and all DCA orders should never exceed 100% of your total tokens.- **Leave a little margin for fees**: When allocating percentage tokens for orders, ensure your base and DCA orders never exceed 98-99% of the total token. If they do, your bot might throw an error message. Exchanges typically use a small base amount to pay for fees, so if you try to use exactly 100% of your funds without leaving a little margin for fees, the bot will likely throw an insufficient funds error. If you have more than one bot using the same token, the same rule applies: ensure that the sum of your bot's orders does not exceed 98-99%.- **Using % of free token will diminish each simultaneous order**: If you're using a percentage of free tokens, remember, the more open orders you have simultaneously the less free token you have and therefore the smaller your orders will be while other orders are open. Once these concurrent orders are closed and the funds released, the order size will increase again.- **Watch for Minimums**: Monitor the exchange minimums. Your bot will throw an error if your order size shrinks below the minimum threshold.- **Do not run many bots on the same subaccount: **If you create many bots on the same account, it will be difficult to track their total usage. Therefore, it is recommended not to use more than 3-4 bots per token per subaccount.

In conclusion, autocompounding crypto trading bots can be powerful allies in your quest for wealth. By understanding and leveraging their capabilities within platforms like Gainium, you're not just participating in the crypto market but embarking on an adventurous journey toward potential wealth accumulation. Happy trading!
