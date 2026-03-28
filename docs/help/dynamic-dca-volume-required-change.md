---
id: 136
name: Dynamic DCA Volume for Required Change
slug: dynamic-dca-volume-required-change
description: >-
  Meta Description: Gainium's Dynamic DCA orders feature enables precise profit
  targeting with automatic volume adjustment for effective trading strategy
  optimization.
createdAt: '2024-10-11T05:54:15.489Z'
updatedAt: '2026-02-24T07:44:20.570Z'
publishedAt: '2024-10-11T06:17:16.352Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags:
  - dca
ingested: true
ingestedAt: '2025-06-29T10:57:30.008Z'
tldr: >-
  Dynamic DCA orders automatically calculate the volume needed for each DCA
  order so the position can be closed at a specified profit percentage (Required
  Change) from the average entry price. Set a Max Order Amount to manage risk,
  as uncapped volume can escalate significantly.
---

Dynamic DCA (Dollar Cost Averaging) orders are an advanced feature in Gainium that allows traders to adjust their trading volume dynamically based on specific profit targets after a DCA event. When a DCA is to be executed, the volume is automatically calculated to close the position at a specified profit increase. This provides greater precision and control in trading, ensuring that each trade is optimized to reach a predefined profit level.

## How to Use Dynamic DCA Orders in Gainium

To use Dynamic DCA in Gainium, navigate to the DCA settings in your bot configuration and enable "DCA mode." Under "Volume based on," select "Required Change" to use this feature. The settings will provide options to adjust the DCA configuration in detail, such as:
- **Required Change:** Specify the percentage profit you want to achieve after executing a DCA order. For instance, setting this to 5% means that when the DCA order is executed, the volume will be adjusted to ensure the position can be closed with a 5% increase from the average position price.
- **Max Order Amount:** Set a maximum volume for each DCA order. Setting this value to**-1** will disable the maximum limit, which can result in substantial capital being used, depending on market conditions and DCA configurations. Therefore, it is recommended that you use a maximum volume that follows your risk tolerance.
- **Currency:** Select the currency (e.g., USDT) to define the volume limits and ensure consistency.
- **DCA Condition Settings:** To initiate a DCA action, you can set specific conditions, such as **the Moving Average Ratio (MAR)**, and configure detailed parameters like the reference type, condition, value, and intervals.

The key here is flexibility and control. Users can precisely manage their DCA activities by adjusting these settings to meet specific trading goals.

Pro tip: in the bot page, under settings, there is a widget named "Example orders for a deal." This table shows the required change and volume necessary for each DCA, you can experiment with the settings and observe how they change the required volume for each DCA.

## Using Dynamic DCA in Bot Trading

Dynamic DCA orders can be highly effective when combined with other indicators to optimize entry and exit conditions in bot trading. Here are some trading strategies that can utilize Dynamic DCA effectively:

### 1. **Profit Targeting with Dynamic Volume Adjustment**

Imagine Bitcoin is trading at **$60,000 USDT**. You have set a DCA order with a **Required Change** of **2%**. The bot initiates a buy DCA order at**$57,000**, automatically adjusting the volume so that the entire position can be closed at a **2%** profit from the average position price of**$58,500**.
- **Entry Rule:** Open a position based on a Moving Average crossover.
- **Exit Rule:** After each DCA order, set the bot to sell when the profit target of 2% is achieved. The volume adjustment ensures that the position can be closed profitably.

### 2. **Risk Management with Dynamic DCA**

Dynamic DCA orders can also be used to manage risk more effectively. For example, if the market moves against your initial position, a DCA order can be triggered at a lower price to reduce the average entry point. By setting a suitable **Required Change**, the position can be adjusted to target a profit without unnecessarily over-leveraging the capital.
- **Entry Rule:** Initiate a position when the RSI drops below **30** in the 4-hour timeframe.
- **Exit Rule:** Trigger a DCA order at**$56,000 USDT** and dynamically adjust the volume to close the position at a **2%** profit once market conditions improve.

### 3. **Combining Dynamic DCA with Technical Indicators**

For more nuanced strategies, Dynamic DCA can be combined with other technical indicators to enhance profitability. For instance, using the **Moving Average Ratio (MAR)** in combination with Dynamic DCA allows traders to automate volume adjustments when specific conditions are met, like crossing below a specific EMA (Exponential Moving Average).
- **Entry Rule:** Open a deal when MAR crosses below **0.99** compared to the **20 EMA**.
- **Exit Rule:** If the price drops further, use a Dynamic DCA to adjust volume, and set a target to exit at **2%** profit when MAR crosses back above **1.00**.

## Practical Considerations
- **Caution and Risk Management:** Dynamic DCA orders must be used with caution. Setting the **Max Order Amount** to **-1** means there is no limit on the capital that can be used for DCA, which can dramatically increase deal size, particularly during volatile market movements. Always set a maximum volume limit that fits your risk tolerance to avoid overexposing your portfolio.
- **Setting Minimum Deviation and Required Change:** Ensure you set a sufficient minimum deviation between the last filled order and the next DCA order. A short minimum deviation with a small **Required Change** can result in the need for large amounts of capital to achieve even modest gains. For example, if BTC is at **$60,000 USDT**, and you set a minimal deviation of **1%** and a **Required Change** of **2%**, you could quickly find yourself requiring significant volume to achieve the intended profit as more orders are placed at incremental price drops.

## Example Scenario
- **BTC Price:** $60,000 USDT-** DCA Order Trigger Price:** $57,000 USDT-** Required Change for TP:** 2%-** Max Order Amount:** 1 BTC

If the first DCA order is triggered at **$57,000**, the average position becomes **$58,500**. The bot will then dynamically calculate the volume so the position can be closed when the price increases to **$59,670** (representing a 2% profit from the average position price).

However, if you do not set a maximum order amount and continue with minor deviations between DCA orders, the required volume to achieve profit might escalate beyond your intended limits. Therefore, setting realistic targets and managing the DCA parameters wisely is crucial.

## Conclusion

Dynamic DCA orders in Gainium give traders a powerful way to manage their positions, optimize profit-taking, and automate volume adjustments based on precise conditions. By specifying a required change for profit after each DCA, traders gain more control over their strategy while reducing exposure to unfavorable market conditions.

However, this feature requires careful risk management. Always ensure that you set appropriate maximum volume limits and maintain a balance between minimum deviation and required change to avoid overextending your capital. Dynamic DCA can be a valuable tool for enhancing trading outcomes when used effectively.

Ready to start using Dynamic DCA in your trading strategy? Configure it now and take advantage of automated precision in every trade.
