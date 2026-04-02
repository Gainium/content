---
id: 114
name: 'Risk:Reward'
slug: risk-reward
description: >-
  Learn how to use Gainium's Risk:Reward feature to manage risk, set
  stop-losses, and calculate position sizes for efficient and controlled
  trading.
createdAt: '2024-10-06T06:35:09.208Z'
updatedAt: '2026-02-24T07:44:20.580Z'
publishedAt: '2024-10-06T06:44:27.435Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.023Z'
tldr: >-
  The Risk:Reward feature automatically calculates position size based on a
  price-chart indicator for stop-loss placement and a user-defined risk amount.
  It also sets take-profit levels using a reward ratio multiplier for consistent
  risk management per trade.
---

The **Risk:Reward** feature in Gainium is a powerful tool that helps traders manage risk by calculating position sizes based on predefined risk levels. It leverages an indicator that draws directly on the price chart (such as support/resistance or trendlines) to set stop-loss levels, and from there, it calculates the appropriate position size relative to the trader's risk tolerance.

This article will explain how the Risk:Reward feature works and how to configure it in Gainium. We will also provide a practical example of its usage to help you maximize its potential in your trading strategy.

## How Risk:Reward Works

The Risk:Reward feature automatically calculates position size based on the trader’s desired risk level and the distance between the entry price and stop-loss. This ensures that even if the trade goes against you, the capital at risk is precisely as you’ve defined, preventing larger-than-expected losses.

### Key Components of Risk:Reward:
- **Stop-Loss Based on Price Chart Indicators**: The feature uses price chart indicators such as Support/Resistance or trendlines. Oscillators like RSI or MACD are not directly tied to price levels and are, therefore, unsupported.
- **Risk Amount**: You can specify a percentage of your available balance or a fixed dollar amount you are willing to risk on any trade.
- **Reward Ratio**: The reward ratio defines the expected reward relative to the risk, helping traders maintain a favorable risk/reward balance in their strategy.
- **Position Size Calculation**: Once your stop-loss and risk amount are defined, the feature calculates the position size needed to match your risk parameters.

## How to Use Risk:Reward in Gainium

### Step 1: Enable the Risk:Reward Feature
- **Access the Bot Settings**:Open your bot configuration in Gainium.
- Navigate to the **Risk:Reward** section, as shown in the image below.
- **Turn on the Risk:Reward Feature**:Toggle the switch at the top right to activate this functionality.

![image.png](https://content.gainium.io/images/content/help/image_af12b583ac-7ac813.webp)
*Risk:Reward settings*

### Step 2: Configure the Indicator
- **Select the Indicator**:You can choose a supported indicator. For example, you can select **Support/Resistance**, as shown in the settings screenshot.
- **Set the Time Interval**:Select the indicator's appropriate time interval (e.g., 1 hour).
- **Configure the parameters of the indicator**.
![image.png](https://content.gainium.io/images/content/help/image_3b5d103c38-7707c4.webp)
*The Stop Loss according to the indicator settings is displayed on the chart.*

### Step 3: Define Risk Parameters
- **Type of Risk**:Choose whether to risk a percentage of your **free balance** or a **fixed amount**.
- **Set Risk Amount**:Define the percentage or fixed amount of capital you are willing to risk. For instance, 2% of your balance, as shown in the example.
- **Enable Reward Calculation**:Toggle the **Use Reward** option to enable the reward ratio feature, which sets a target profit based on a multiple of your risk (e.g., 1.5x risk).

### Step 4: Configure Position Size Limits
- **Minimum and Maximum Position Size**:Set the **Min** and **Max** position size in USDT to limit how large or small the positions can be. This gives you further control over your trade execution.
- **Stop-Loss Limits**:Configure the minimum and maximum stop-loss percentages to prevent the bot from using overly tight or wide stop-losses.

## Practical Example: How Risk:Reward Works in a Trade

### Scenario

You are trading the **BTC/USDT** pair and want to manage your risk effectively. You enable the **Risk:Reward** feature using a **Support/Resistance** indicator to define the stop-loss. You are willing to risk **2%** of your available balance on each trade and want a **1.5:1** reward ratio.

### Step-by-Step Execution:
- **Indicator Setup**:You configure the **Support/Resistance** indicator to detect support levels on the 1-hour chart with 15 left bars and 15 right bars.
- **Risk and Stop-Loss**:You set the risk to **2%** of your free balance.
- The bot uses the selected support level as the stop-loss for the position.
- **Position Size Calculation**:The bot calculates the appropriate position size based on how far the current price is from the stop-loss, ensuring that you only risk 2% of your balance if the stop-loss is hit.
- **Target Reward**:With a **1.5x** reward ratio, the bot sets the take-profit level to 1.5 times the distance between the entry price and the stop-loss.
- **Execution**:Based on the pre-configured settings, the bot executes the trade, enters the position, and manages the stop-loss and take-profit levels.

### Example Outcome
- **Risk:** $200 (2% of your balance).
- **Stop-Loss:** The bot places the stop-loss at the support level, let’s say 5% below the entry price.
- **Position Size:** The bot automatically adjusts the position size so that if the stop-loss is triggered, you lose exactly $200.
- **Reward:** With a 1.5 reward ratio, the bot sets the take-profit level to aim for a $300 profit, 1.5x the amount risked.

## Practical Considerations

Here are a few tips to maximize the effectiveness of the Risk:Reward feature:

### 1. Choose the Right Indicator

Select a chart indicator that reflects a comfortable stop loss level. This ensures your stop-loss is placed at meaningful levels, reducing the chance of premature exits.

### 2. Set Reasonable Risk Parameters

It's essential to find a balance between risk and reward. Risking too little may result in trades that don’t perform well due to small position sizes, while risking too much could expose you to significant losses.

### 3. Backtest Your Strategy

Before going live, use Gainium's backtesting feature to evaluate how your Risk:Reward strategy performs with different assets and market conditions. Fine-tune your parameters based on historical performance to optimize results.

## Conclusion

Gainium's **Risk:Reward** feature is essential for traders looking to manage risk effectively. By using an indicator based on price charts to set stop-losses and calculate position sizes relative to risk, you can maintain control over your capital and avoid unexpected losses.

The added functionality of a reward ratio helps ensure you maintain a favorable balance between risk and reward. With proper configuration, Risk:Reward will help you stay disciplined and achieve consistent results in your trading strategy.

Start using Risk:Reward today and take control of your risk management!
