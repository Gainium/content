---
id: 83
name: Understanding the Combo bot
slug: understanding-combo-bot
description: Learn how the combo bot works and how you can use it to maximize your profits.
createdAt: '2023-07-24T08:45:39.653Z'
updatedAt: '2026-02-24T07:44:20.585Z'
publishedAt: '2023-07-24T10:49:49.497Z'
locale: en
categories:
  - combo-bots
  - walkthrough-guides
difficulty: intermediate
tags:
  - bot
ingested: true
ingestedAt: '2025-06-29T10:57:30.031Z'
tldr: >-
  The Combo bot merges grid and DCA strategies: it starts with a base minigrid
  and expands the grid with each DCA order, avoiding the grid bot''s lump-sum
  timing risk while retaining passive grid-style profits. It supports all DCA
  deal start conditions including indicators, webhooks, and timers.
---

The crypto trading world often calls for an intricate blend of strategies to optimize profits and mitigate losses. At Gainium, we strive to provide our users with the most innovative and sophisticated tools to help them navigate this fast-paced landscape. Our latest addition, the Combo Bot, is a testament to this commitment. It effectively fuses Grid and Dollar-Cost Averaging (DCA) trading into one powerful strategy.

In this article, we will explore in detail how it works and how to optimally use this new tool, allowing for more nuanced trading and increased potential for gains.

## The birth of a new bot

To understand why the combo was created, we should examine the grid and DCA strategies and their advantages and disadvantages.

### Grid bots, the good and the bad

I love grid bots. Thanks to their set-and-forget approach and ability to generate passive wealth, they have been my favorite kind of bot for a long time. As long as the price is within their range and there is volatility, they will keep producing small but consistent profits. They are perfect for busy investors seeking a profit stream with minimum oversight.

However, as great a tool as they are, they have one significant drawback: timing. The bot must buy a lump sum of crypto at the start to place all sell orders in the grid. This requirement makes the grid bot performance highly dependent on the timing of that purchase and the long-term market direction.

You will reap a great profit if you get the timing right and set up your long grid bot before a bull run. But your investment will be in the red if you are unlucky enough to start a long grid bot before a market dump. The silver lining is that the bot will produce profits if the price is in range. If the bot manages to keep profiting, you may be able to profit despite the dump, though this will likely take weeks or even months, depending on how much volatility and the price stays in range. Certainly not an ideal scenario, but knowing you have that safety net if things turn south (or down) is good.

Another disadvantage of grids is that they are tied to a specific price range, which you must set beforehand. If the price goes outside the grid, you must intervene and manually adjust the bot. This dependency on a set price makes grids unable to work with advanced trading features such as start conditions or webhooks.

### DCA bots, the good and the bad

Now, let's talk about DCA bots. They are significantly different from grid bots in some ways. First, they don't require a lump-sum investment, so you may be forgiven for starting the bot at the wrong time (provided you gave it enough DCAs to cover the price deviation). Secondly, they do not depend on a set price range but on price increases or decreases from the starting point. This makes them a customizable tool with indicator deal start or exit conditions, webhooks, and more.

Conversely, DCA bot profits can be much more inconsistent, even if you set a reasonable enough price deviation to cover a significant drop. A deal can get stuck in the red (aka [red bags](https://gainium.io/academy/how-to-recover-red-bags)), waiting for the price to hit TP, which could take a long time and emotionally toll the user. DCA bots typically require more babysitting than grid bots, as with great customizability comes great micromanaging.

### Combo bots, the best of both world

Let's recap what we know so far.

**Grid bots pros:**
- Passive, set-and-forget approach.
- Don't rely on predicting short-term price movement.

**Grid bots cons:**
- Lump-sum investment at the start - needs good timing.
- Low customizability of trading strategy.

**DCA bots pros**
- No lump-sum investment at the start - can profit despite the market going against you.
- Great strategy customizability.

**DCA bots cons**
- Less consistency of profits- Often need manual intervention

Imagine cross-breeding these bot types to obtain a super bot with all the benefits. Fortunately, you don't need to imagine it; we made this possible. It wasn't as easy as breeding a Pokemon, though. It has taken a significant amount of testing and refining, but we are proud of the result:

**Combo bot pros:**
- Passive, set-and-forget approach.
- Don't rely on predicting short-term price movement.
- No lump-sum investment at the start - can profit despite the market going against you.
- Great strategy customizability.

**Combo bot cons:**
- They might not be as profitable as grid and DCA when the market goes in your favor.

Are you curious to find out more about them? It's time to delve into the nitty-gritty of their functionality.

## How Combo Bots Operate

Before diving into the specifics, let's go through the general concept. At a bird's eye, the Combo Bot behaves primarily like a Grid bot but introduces elements of the DCA bot. You can think of it as a grid bot that expands the grid with each DCA order. When a combo bot executes a DCA order, it establishes a 'minigrid' appended to the primary grid, utilizing the assets acquired through the DCA order and expanding the grid range.
![Combo1.png](https://content.gainium.io/images/content/help/Combo1_9d3b0449e0-790275.png)
*Combo bot creation*

### Minigrids: The basic blocks

In essence, a Combo bot deal is a collection of minigrids joined together. The starting order creates the base minigrid (which can have different settings from the rest, as we will see later). Each DCA order purchases base that will be used to expand the grid with additional minigrids. Each time a DCA order is filled, the total grid range is increased thanks to the additional minigrids.
![Combo-bot.svg](https://content.gainium.io/images/content/help/Combo_bot_f8c691fd78-5ae5ce.svg)
*Combo bot logic*

There are two types of minigrids: The base minigrid and the DCA minigrids. The base minigrid is formed when the deal starts. Subsequent DCA orders create DCA minigrids, which are appended to the main grid.

![minigrid-expansion.png](https://content.gainium.io/images/content/help/minigrid_expansion_8c392d5df8-c4b6b4.png)

Minigrids have three fundamental characteristics: The order step (the price % they cover, also known as their height), the number of grid orders inside, and the asset quantity. Let's review each one in more detail.

#### Order Step

If you are familiar with the [DCA bot logic](https://gainium.io/help/dca-bot-set-up-walkthrough), you may remember that the order step is the price drop that separates one DCA order from the next. Since minigrids are appended together, the order step will always equal the minigrid height. The order step is crucial because it determines how many grid lines can fit inside each minigrid.

#### Minigrid levels

Due to exchange limitations, the minimum spacing between grid orders is typically around 0.2%. Thus, each minigrid can contain a limited number of grid levels. The optimal number of minigrid levels depends on the specific coin pair and minigrid settings, which you can always fine-tune through backtesting. You can find the sweet spot for [grid spacing](https://gainium.io/help/grid-step) through backtesting and experimentation, as you'd do for grid bots.

For example, if you set the order step to 5%, the DCA orders are spaced in 5% price drops. When the bot fills the DCA order, it has a 5% price range to fit grid levels. Given that the minimum spacing is 0.2%, the bot can create a minimum of 1 and a maximum of 25 grid levels on each minigrid.

#### Minigrid amount

This is the investment on each minigrid, which will be distributed in the grid orders of each minigrid. The minimum minigrid amount equals the exchange minimum order multiplied by the number of minigrid levels.

### Closing Combo deals

A Combo bot deal can close in one of two ways:
- By price exiting the upper (for longs) or lower (for shorts) side of the grid.
- By Take Profit or Stop Loss, which depends on the deal's value change. The concept is the same as the grid bot [value change](https://gainium.io/help/making-sense-of-profit-stats-value-change-and-account-value).

Let's review each one in detail.

#### By exiting the grid

Remember that a combo bot deal is a collection of minigrids stacked together. When the price exits the upper (for longs) or lower (for shorts) side of the minigrid, the minigrid will be closed. In the case of a DCA minigrid, the grid orders of that minigrid will be removed, and a new DCA order will be placed instead. In the case of the base minigrid, the grid orders will be removed, and the deal is now considered closed. This behavior ensures that we buy or sell at optimal prices and protect our profit in case of a price reversal.

Note: some users erroneously think that if the minigrid height is 10%, for example, when the price exits the top side of the grid, they would have made a 10% profit. This would be the case for a DCA bot's take profit, but remember that the combo bot employs a grid strategy and will buy and sell multiple times until it reaches the top. Hence, if the price quickly moved to the top, it would have sold in small increments along the way, and the total profit would be less than 10%. On the other hand, if there is a lot of volatility inside the range and the bot buys and sells many times, by the time the price reaches the top of the grid, the total grid profit may exceed 10%. Hence, when the bot closes the deal by exiting the minigrid, the % profit obtained in each deal varies depending on the volatility.

#### By Take Profit or Stop Loss

Another way the bot can close a deal is by Take Profit or Stop Loss. Unlike a DCA bot, which places limit orders at a certain price, the combo bot doesn't target a simple percentage above the purchase price for TP or SL. Instead, due to its grid strategy, it accumulates small profits from numerous transactions. The bot tracks the overall deal value, including accrued profits. Once the profit or loss hits the targeted percentage, the bot cancels the grid and executes a market order to secure the gains or minimize losses. This method ensures the TP or SL goals are met based on the deal's actual performance, accommodating market volatility.

Note that even if you have enabled Take Profit or Stop Loss, the bot will close a deal when the price exits the grid, as described in the previous section.

It is also important to remember that taking profit or stop loss requires a specific bot processing sequence: canceling the grid, waiting for exchange confirmation, issuing a market order, and receiving the market order-filled info. The time it takes to complete this sequence (usually a few seconds) plus slippage from the market order could result in a slightly different profit or loss percentage from expected.

### Combo Deal Start Conditions

Once all minigrids within a deal are closed, the deal is considered closed, and the combo bot waits for the following deal start condition. The combo bot supports all DCA deal start conditions (ASAP, Technical Indicators, Time-based, and Webhooks), giving you great flexibility to time the perfect entry.

#### Example with SOL/USDT:

Let's look at an example to understand this concept better. Let's say we run a combo bot in SOL/USDT pair. Base and DCA minigrids have 5% order step and 5 grid levels (spaced 1% apart). We set a TP of 5%. We run a backtest on those settings, and we can see the following results inside the "Deal List" tab:

![combo-sol-tp1.png](https://content.gainium.io/images/content/help/combo_sol_tp1_8513efda6d-d357ec.png)

As you can observe, two trades closed with a profit of under 5%. Let's click on one of them to see the bot's behavior in the graph. Here is what we can see when we click on Trade #12:

![combo-sol-tp2.png](https://content.gainium.io/images/content/help/combo_sol_tp2_c382d02001-a32195.png)

As discussed earlier, when the price exits the top of the minigrid in a long bot, it will close the minigrid. The price exited the top of the grid indeed. The deal was closed since this was the base minigrid and the only minigrid in the deal. Note that as we sold a little base on each minigrid sell order while the price was increasing, by the time the price reached the top of the minigrid (5% price increase), the bot had already sold part of the base at lower levels. Hence, the total profit is less than 5%.

Interestingly, a deal can also close with 5% profit even when the price doesn't reach the top of the grid. Here is a good example:

![combo-sol-tp3.png](https://content.gainium.io/images/content/help/combo_sol_tp3_0bdb2588a9-b54772.png)

As you can observe, the price stayed within the range of the base minigrid, and thanks to the volatility, the accumulated profit reached 5% before the price exited the top of the grid. In this case, the bot canceled the grid and sold the rest of the base, obtaining a total profit of 5% despite the price never reaching a 5% increase.

## Combo bot settings walkthrough

Now that we know the basics about the combo bot let's examine its settings in detail. You will recognize most combo bot settings if you are familiar with the grid and DCA bot settings. There are, however, a few exclusive to the combo bot. Let's dive in!
![Combo_settings.png](https://content.gainium.io/images/content/help/Combo_settings_79e124e362-d3f17b.png)
*Combo bot settings*

#### Basic settings

This is where you give your bot a **name**, choose your **exchange** and a **coin pair**. Note that como bot do not support multi-pair yet, but that will be coming soon!

#### Strategy
- **Directions**: You can choose whether to go long or short. Note that in spot, the only difference is the initial action—a long bot makes an initial buy order, while the short bot makes an initial short order. To make a short combo bot in spot, you must have the asset you want to short available in your wallet balance.
- **Profit currency (Spot)**: You can keep your profit in quote or base. Generally, if you expect the base to appreciate over time or are accumulating it, you should profit in base. We wrote a more detailed article [here](https://gainium.io/help/profit-in-base-and-quote).
- **Margin and Leverage (Futures)**: Here, you can set the margin and leverage of your futures bot. Remember that exchanges only allow one leverage and margin setting per coin pair, so if you already have an existing position in that pair and exchange, the bot must use the same settings, or it won't be able to start. Also, if you use several bots on the same pair, all bots using that position will register the loss if the position gets liquidated. To learn more, check out our article on [Leverage trading basics](https://gainium.io/academy/crypto-leverage-trading-basics).

#### Deal Start

In this section, you can choose how the bot starts new deals. This section is exactly as the deal start condition of the DCA bot, as both the DCA and combo share the same customizable deal start conditions. Here are the options:
- **ASAP**: This mode ensures the bot is always in action, launching a new deal immediately after initiation and following the close of the previous one. It is ideal for traders who want to predict a certain market trend.
- **Manual**: In this setting, the bot waits for manual intervention to begin deals, allowing traders to start trades by pressing the "New deal" button.
- **Time-based**: This option sets consistent intervals for deal initiation, perfect for strategies aimed at coin accumulation over time.
- **Technical indicators**: Employs a mix of technical indicators for initiating deals, offering customizable strategy implementations.
- **Webhook**: This function activates deal starts or stops through external signals, helpful in integrating alerts from other platforms.

In addition to the entry options, there are a few more settings common to all deal start types:
- **Max open deals**: The maximum number of concurrent deals the bot can open at any time. Any signals for deal start received after the bot reaches this number will be ignored. To have unlimited open deals, you can enter -1 in this field.
- **Minimum and Maximum price filters**: They limit the bot's price range to open a new deal. For example, if you would like to open a BTC/USDT ASAP bot but prevent it from opening new trades if the price is over 70,000 USDT/BTC, you would enter 70000 in the "Maximum price to open deal" field.
- **Cooldowns**: This option lets you add a timer after a deal is opened or closed. While the cooldown is active, the bot will ignore any deal start signals, allowing you to add a minimum wait period between deals.

#### Base minigrid

Now, let's examine the settings exclusive to the combo bot. As mentioned earlier, the base minigrid can differ from the DCA minigrids, giving you extra flexibility in starting the deal.
- **Base Minigrid amount**: This is the total asset amount you want to allocate to the base minigrid. Remember that the minimum amount you can use depends on the number of minigrid levels multiplied by the exchange minimum order. The bot will indicate the minimum amount under this field.
- **Currency**: The behavior of the base minigrid in trading bots varies with the selected currency and strategy (long or short). For long positions, the bot purchases the base currency with the quote currency to set the minigrid sell orders, regardless of the reference chosen (quote or base). In short positions, it sells the base currency for the quote currency to set the minigrid buy orders. Using percentages allows traders to allocate a portion of their total or free holdings to open trades and autocompound profit and losses. However, ensure that the total of all orders is less than 100% to avoid balance errors. Please read our article on [Autocompounding trading bots](https://gainium.io/help/autocompunding-trading-bots) to learn more.
- **Top price**: This allows you to set the height of the base minigrid. The higher the top price, the more base minigrids you can fit inside.
- **Base minigrid levels** are the number of minigrid orders inside the base minigrid. The more you increase this number, the higher the base minigrid quantity you will need.

#### DCA minigrids

This section shares many similarities with the DCA mode of our standard trading bots.
- **DCA orders**: This is the number of minigrids each deal will have. The more DCA orders your bot has, the higher price deviation each deal will cover, allowing the bot to profit even after deeper price drops. However, the more DCAs the more money "on reserve" and hence diminished returns on total money allocated. You can find the sweet spot for return on money allocated through experimentation and backtesting.
- **Smart orders**: This is the number of orders sent to the exchange as limit orders. The bot will lock the funds only for Active orders; thus, the funds for other orders will be available for trades. Please ensure sufficient funds on your balance to place ALL orders (BUY and SELL). Learn more in our article on [Smart orders](https://gainium.io/help/smart-orders).
- **DCA order amount**: The quantity of funds allocated to each DCA order. The higher the number of minigrid levels inside, the higher the minimum DCA amount will be.
- **Currency**: This setting is linked to the currency in the base minigrid, so changing it will also change the currency in the base minigrid. Make sure you review your settings after you change this.
- **Order step**: This is the percentage offset from the current market price you want your bot to use when placing your DCA orders. In other words, it is the space between each DCA order and the height of the minigrid. The bigger the order step, the more price deviation the bot can cover and the more grid levels you can fit inside each minigrid.
- **DCA minigrid levels**: The number of minigrid orders inside of each DCA minigrid. The more you increase this number, the higher your DCA order quantity will be needed.
- **Active minigrids**: The number of minigrids under the base minigrid that will be opened (with buy orders) when the deal starts. This gives you a grid with buy orders under the current price instead of a DCA order. Learn more in our [Active minigrids](https://gainium.io/help/active-minigrids) article.
- **Step scale**: This setting will multiply the order step by the defined number, allowing for geometrically spaced DCA orders and, hence, modifying the height of subsequent minigrids. A value over 1 will increase the space on each subsequent DCA order, and a value under 1 will reduce the space. Remember that a value under 1 might reduce the space to the point of being to small to fit the chosen number of minigrid levels, resulting in a bot error.
- **Volume scale**: This setting will multiply the DCA order amount by the defined number, allowing to scale the DCA order volume geometrically. A value over 1 will increase the amount on each subsequent DCA order, and a value under 1 will reduce the amount. Remember that a value under 1 might reduce the amount to being too small to place the chosen number of minigrid levels due to the exchange minimum order, resulting in a bot error.

#### Take Profit & Stop Loss

The Take Profit and Stop Loss sections operate similarly using Take Profit and Stop Loss by ROI % in the [grid bot](https://gainium.io/help/take-profit-stop-loss-grid). As explained earlier, a Take Profit in the combo bot is optional, since the deal will be closed anyway when the price crosses the base minigrid's upper bound (for longs) or lower bound (for shorts). If you turn Take Profit or Stop Loss on, here are the settings you can configure:
- **Deal close type**: Market or Limit. A market order ensures the order closes immediately, though higher fees and slippage may result in a different price. A limit order ensures you get the expected price, though it may not fill immediately. To avoid long waiting times, the bot will reposition your limit order every few seconds to ensure it gets filled. You can learn more about [Exchange order types](https://gainium.io/academy/order-types).
- **Take Profit or Stop Loss**: This is the percentage gain or loss that the deal needs to reach for the bot to close it. As mentioned earlier, we include the profit generated through the minigrid orders in computing the ROI; therefore, we do not know in advance at which price the bot will execute the TP or SL.
- **Base take profit on**: This setting allows you to change how the bot computes ROI, by basing it on the actual amount of used assets or the total amount of assets the bot could theoretically use. To understand how this works, imagine that we have one bot that uses a $100 base minigrid, and 9 x $100 DCA minigrids, with a 5% TP. If we base the TP on **the used DCA**, when the bot starts a new deal, the target profit will be $5 (100*0.05) since we have used only $100 of the base minigrid. If the bot hits a DCA order, the total funds used would be $200, the needed TP would be $10 (200*0.05), and so on for each new DCA filled. Conversely, if we base the TP on **max DCA**, the TP needed to close the deal will always be the same, $50, which results from the theoretical maximum amount the bot could use, or $1000 in this case.

#### Bot controller

This section enables extra settings to control automatic bot start and stop. You can learn more in our [Bot controller](https://gainium.io/help/bot-controller) article.

#### Experimental features (Spot)
- Fee Order (Reduce Dust): The bot will place an additional order when it starts. Those assets will be used to cover grid order fees. This helps reduce dust, especially on a high number of grid transactions. You can learn more on the [Fee Order](https://gainium.io/help/fee-order-reduce-dust) article.

## Conclusion

Gainium's Combo Bot blends the best of DCA and grid trading strategies, providing our users with a powerful tool for navigating the volatile crypto markets. This innovative feature allows you to automate and optimize your trading strategy to leverage market fluctuations effectively.

As with any trading strategy, it is essential to understand your risk tolerance and investment goals before using the Combo Bot. Gainium is here to provide the tools you need, but the strategy is ultimately up to you. Happy trading!
