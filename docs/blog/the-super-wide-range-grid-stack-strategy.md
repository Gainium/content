---
title: The super wide-range grid stack strategy
slug: the-super-wide-range-grid-stack-strategy
excerpt: "In this article, I share a grid bot setup I have been using successfully for many months, the super wide-range grid stack. This setup is a hybrid investing-trading approach to crypto that has a relatively low risk and enjoys a decent ROI."
publishedAt: '2022-09-15T05:02:20.803Z'
updatedAt: '2024-02-29T10:20:37.789'
createdAt: '2022-09-15T05:02:20.803Z'
locale: en
author: ares
categories:
  - name: Trading Strategies
    slug: trading-strategies

tldr: >-
  The Super Wide-Range Grid Stack strategy involves deploying multiple grid bots across different price zones to cover a broad market range. This hybrid investing-trading approach aims to generate consistent profits in various market conditions while managing risk through diversified grid configurations.
faq:
  - title: "How much capital is required for this strategy?"
    details: "The capital required depends on the exchange's minimum order size and the number of grids you set up, but generally, it requires a larger budget to cover multiple zones effectively."
  - title: "Which coins are best for this strategy?"
    details: "High market cap coins like Bitcoin and Ethereum are recommended due to their long-term stability and sufficient volatility for grid trading."
  - title: "What are the risks of this strategy?"
    details: "The main risks include opportunity cost if funds are spread too thin and the potential for impermanent loss if the price moves significantly outside the grid ranges."
---

[Grid bots](https://gainium.io/grid-bot) are a great option for beginner and experienced traders to profit from the crypto market. They work by buying a fixed number of coins at predetermined prices and then selling them when the price reaches a higher level. This ensures that the trader always makes a profit, regardless of the market conditions. Grid bots also have the advantage of being able to trade in both directions, which means they can make profits whether the market is going up or down.

![grid strategy.svg](https://gainium.io/images/content/blog/grid_strategy_8ef44b4ebf-c90e5b.svg)

In this article, I share a grid bot setup I have been using successfully for many months, the super wide-range grid stack. This setup is a [hybrid investing-trading approach](https://gainium.io/academy/trading-vs-investing#The_hybrid_trading-investing_approach) to crypto that has a relatively low risk and enjoys a decent ROI.

## Why the super wide-range grid stack?

If you want the full background of the events that led to the creation of this strategy, you can read my story on the blog. But the gist of it is that after the November ATH to nose-dive market meltdown, I decided to stop using risky bot strategies and focus on a setup that would allow me to sleep well at night no matter what the market decides to do next. My goal was to achieve continuous and steady profits with minimal risk.

Grid bots were the obvious choice due to their simplicity and their ability to generate continuous profits. All I needed to do is to come up with a system that would take advantage of any market condition. After some research, I decided to settle on a system of stacked grid bots that would cover the price action of the foreseeable future. Each grid bot runs on a price zone, and they have a specific configuration to take advantage of the predominant market condition for that zone.

The grid-stack setup process is as follows:

1. Choose your coin
2. Define the price zones and allocate budgets
3. Set up the grid bot configuration for each zone
4. Run the bot
5. Boost the ROI of unused funds

Let's dive into each step by going through an example: BTC-USDT

![Grid Stack set up.webp](https://gainium.io/images/content/blog/Grid_Stack_set_up_8e587b5364-a9b5a6.webp)

### 1. Choose your coin

The first step is to choose the coin you want to grid trade. You can expect this setup to run for a long while so this has to be a coin that you are comfortable holding long term. I would choose a coin with enough price history to make setting up the price zones easier in the next step.

For our example, Bitcoin is a great choice, but any top 20 coins by market cap would be a good option. Lower market cap coins experience more volatility, which can turn into more profits when trading grid bots. However, make sure to be comfortable handling the extra risk.

### 2. Define the price zones and allocate budgets

The next step is to define the price zones and allocate how much funds you will be trading on each. I like to do it by finding the range that the coin spent most of the time for the last year or two. Then I divide that range into top, middle, and bottom. Finally, I added two extra zones, one under the bottom and another over the top. If you want to be super accurate, you can fine-tune the price ranges with support and resistance zones.

As for allocations, we will go over my standard template shortly. If you want to take on more risk, you can allocate more budget to zones 1 and 5.

In the example of BTC-USDT, the price range that covers most of the price action of the past two years goes from 18k-70k. So in this range I will have three main zones. The result for my zones and allocations is:

- **Zone 1** or "Oh Shit! 💩" - below the nearest macro bottom, which is under $18k in this case. If Bitcoin breaks under this level it's a no man's land. This can be a great area to accumulate Bitcoin for the long term but great caution is advised due to high volatility and uncertainty. I am allocating 5% of the budget here.
- **Zone 2** or "Bear hug 🐻" - bottom range of the main zone, $18k to $35k. This is proper bear market territory, and Bitcoin will likely consolidate around this area while market conditions remain poor. It's a good time to accumulate Bitcoin in this zone, I usually allocate around 30% of the budget here.
- **Zone 3** or "Boring middle 🥱" - middle range of the main zone, $35k to $52.5k. This is actually the range that Bitcoin spent the most time in during the last 2 years. I wouldn't say that it's a bad time to accumulate but it's probably safer to start tampering down. From a profitability point of view, it's somewhat less interesting than zone 2 or 4, so I allocate a little less budget than zone 2 and 4, 20%.
- **Zone 4** or "Greedy bastard 🐂" - upper range of the main zone, $52.5k to $70k. This is bull zone territory. In this area people often get greedy and they hold on to their bags for way too long, thinking that it's going to the moon from there. While it's certainly possible to make a new ATH, this area should be traded with extreme caution as traders are very likely to take profits and put a lot of sell pressure. This is a great time to offload into stablecoins and be prepared for possible reversal.
- **Zone 5** or "To the moon 🚀" - Above ATH, over $70k. Every trader's dream is to buy in zone 1 and sell at the very peak of zone 5, but unless you have a crystal ball, I suggest not trying to time the perfect entry and exit. Instead, you should scale in and out, averaging your position as more favorable prices are available. When the price goes above the previous ATH it enters uncharted territory, and how high it can go it's anyone's guess. In this zone I will be taking profits consistently, knowing that I won't be able to sell at the very peak and being perfectly fine with it. I'm personally allocating 15% here.

### 3. Set up the grid bot configuration for each zone

Each price zone can benefit from a specific grid bot configuration. The most important factors affecting the profitability of the bot in each zone will be the grid spacing and the profit currency.

For most people, the [grid step](https://gainium.io/help/grid-step) it's going to be dependent on the available budget. This is because exchanges have a minimum order value, so the minimum budget you will need to run the bot is **number of grids x minimum order value**. If you are trading in Binance, the minimum order value is $10, so if your budget is $1000, you will have 100 grids to distribute across your 5 zones. Other exchanges like Kucoin have a very small minimum order and would allow you to have a lot more grids.

I like to have more grids on zone 2 and 4. Though you may think that zones 1 and 5 are better, the issue with them is that you don't have a clear floor or ceiling. For that reason, I use more grid spacing there in an attempt to cover as much as possible.

You can shoot for 1% spacing between grids if your budget allows. For BTC, ETH, and BNB I try to set the spacing at 0.5%, as they experience much less volatility than the rest of the market.

The next important consideration is the [profit currency](https://gainium.io/help/profit-in-base-and-quote). As a general rule, if you expect the value of the token to appreciate in the future, you should profit in base (BTC in our example), and if you expect it to depreciate, you should profit in quote (USDT in our example). Zones 1 and 2 are clear candidates to profit in base, while zones 4 and 5 are great to profit in quote. The profit currency for zone 3 would depend on your preference, but I would still choose to profit in base.

With that in mind, here are the resulting grid bot configurations for each zone:

- **Zone 1**: Grid spacing: 2-3%. Profit currency: BTC.
- **Zone 2**: Grid spacing: 1%. Profit currency: BTC.
- **Zone 3**: Grid spacing: 1-2%. Profit currency: any.
- **Zone 4**: Grid spacing: 1%. Profit currency: USDT.
- **Zone 5**: Grid spacing: 2-3%. Profit currency: USDT.

### 4. Run the bot

Once you have your grid bot configured, it's time to sit back and let it do its thing. The result of this strategy is peace of mind, as you will have a grid bot ready to take advantage of whatever market situation comes next.

It's important to note that for this strategy you should choose a platform that would allow you to manage the funds allocated for each bot intelligently. If your grid bot platform doesn't allow you to send only a portion of the orders at the time, you may encounter limitations as exchanges usually restrict the number of limit orders you can have for a particular coin pair at any given point (in Binance, for example, is 200 orders). In addition, having your funds locked in limit orders will prevent you from being able to use them to generate extra yield, as we will discuss in the next section.

If you are a Gainium user, you can activate [smart orders](https://gainium.io/help/smart-orders). Smart orders will ensure that only those orders close to the current price action are sent to exchange as a limit order, so most of your funds will be available. This will also ensure you don't run into exchange order limits.

### 5. Boost the ROI of unused funds

The advantage of the super wide-range grid stack is that it covers a lot of price action so you can expect to continuously generate profit over time, the disadvantage is that your funds are very spread out, and you only have a tiny portion "at work" at any given time. However, you can deploy unused funds to take advantage of other [yield-generating strategies](https://gainium.io/academy/trading-vs-investing#Extra_perks), such as airdrops, yield farming, stacking, and interest-bearing accounts.

It's essential, however, that you carefully assess the pros and cons of using any yield-generating strategies, as each has its own set of risks and rewards.

## Final thoughts

One important psychological aspect of this strategy is that I no longer feel anxious about what the future price action may look like. Even if I am technically underwater on my investments, I know that as long as the price remains in the range of my bots the continuous profit generated will eventually make up for the losses.

The super-wide grid bot stack strategy is a very effective way to generate profit from crypto long term. And while it's relatively low risk, it's important to remember that no investment is without risk. Be sure to do your own research and never invest more than you can afford to lose.

I hope this article has been helpful. If you have any questions, feel free to reach out.
