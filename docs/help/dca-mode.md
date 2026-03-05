---
id: 132
name: DCA Mode
slug: dca-mode
description: >-
  Learn to use Gainium's DCA Mode to automate entries and exits with Scaled,
  Technical Indicator, or Custom orders. Tailor strategies for any market
  condition.
createdAt: '2024-10-07T07:47:46.957Z'
updatedAt: '2026-02-24T07:44:20.569Z'
publishedAt: '2024-10-07T07:47:49.191Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags:
  - dca
ingested: true
ingestedAt: '2025-06-29T10:57:30.007Z'
tldr: >-
  Gainium offers three DCA types—Scaled (evenly distributed orders by
  percentage, ATR, or ADR), Technical Indicators (orders triggered by indicators
  like RSI or ATR), and Custom (fully user-defined steps and amounts). Each mode
  allows traders to spread entries across multiple price levels to reduce
  volatility impact.
---

**Dollar-cost averaging (DCA)**&nbsp;is a trading strategy in which you buy or sell assets at different price points over time to reduce the effect of market volatility. In Gainium, DCA Mode is designed to automate this process, allowing you to split your orders over multiple levels. This feature helps you average your trades' entry or exit price, reducing the impact of market fluctuations.

Gainium offers three distinct DCA types:
- **Scaled**- **Technical Indicators**- **Custom**

In this article, we’ll walk you through each DCA mode and how to configure it and provide examples of trading strategies for each one. Finally, we’ll discuss practical considerations to help you optimize your DCA strategy in Gainium.

## How to Configure DCA Mode in Gainium

Here’s how to set up and configure **DCA Mode** in Gainium based on the provided settings.

### Step 1: Choose DCA Type
- **Navigate to the Bot Settings**:Log into Gainium, select your bot, and enable **DCA Mode**.
- **DCA Type**:You can choose from the following modes:**Scaled**: Place orders based on scaled percentages between steps.- **Technical Indicators**: Use ATR, EMA, or RSI indicators to trigger DCA orders based on market conditions.- **Custom**: Customize your DCA orders with any number of steps, &nbsp;distances, and order amounts, for example, using a Fibonacci sequence.

### Step 2: Configure DCA Settings
![image.png](https://gainium.io/images/content/help/image_41a8125031-082fb6.png)
*DCA Types Dropdown*

The **Scaled** DCA mode in Gainium allows you to automatically place orders that are evenly distributed, based on either a fixed percentage, **ATR (Average True Range)**, or **ADR (Average Daily Range)**. This type of DCA mode is ideal for adapting to market volatility by adjusting the spacing between orders depending on price movements.

When using **ATR** or **ADR**, this mode becomes more dynamic, adjusting based on the asset’s volatility. For example, the higher the volatility, the larger the steps between orders, helping traders capitalize on larger price swings.

### Key Settings for Scaled DCA:
- **DCA Orders**:This defines the number of DCA orders you want the bot to place. For example, setting it to **5** will divide your capital across five different price levels.
- **DCA Order Amount**:The amount allocated to each DCA order. For example, you can set this to **5 USDT** per order.
- **Base Scaling (Percentage, ATR, or ADR)**:You can select one of three options:**Percentage**: Orders are spaced at fixed percentage intervals. For instance, if set to **1%**, the bot will place each order every 1% price movement.- **ATR**: Orders are spaced according to the **Average True Range**, which measures volatility. The higher the ATR, the larger the spacing between orders.- **ADR**: Orders are spaced based on the **Average Daily Range**, which captures the typical daily movement of an asset. Similar to ATR, a higher ADR indicates more volatility and thus larger spacing between DCA orders.

- **Step Scale**:This allows you to adjust the distance between each order dynamically. A **Step Scale** of **1** means the distance between each order is equal. Increasing the step scale (e.g., **2**) will progressively increase the gap between orders, which can be useful in trending or highly volatile markets.
- **Factor (for ATR/ADR)**:When using **ATR** or **ADR** as your base scaling, the **Factor** setting multiplies the volatility value (ATR or ADR) to determine the step size between orders.Example: If the current price is **1000** and the **ATR** is **10**, setting the **Factor** to **1** will place orders at **990, 980, 970**, and so on.- If you set the **Factor** to **2**, the bot will place orders at **980, 960, 940**, multiplying the ATR by 2 to space orders further apart.

- **Orders Step**:This specifies the percentage step or size between orders. For instance, setting it to **1%** means each order will be placed every 1% movement in price, or based on ATR/ADR values adjusted by the **Factor**.
- **Volume Scale**:The **Volume Scale** allows you to increase or decrease the size of each DCA order. Setting it to **1** keeps each order the same size. Increasing the volume scale (e.g., to **1.5**) will progressively increase the amount for each order.
- **Deviation**:The deviation indicates the total spread between your DCA orders, helping you visualize the total range across which your DCA strategy will operate.

![image.png](https://gainium.io/images/content/help/image_4cab6be7b5-6e2c1d.png)
*DCA Mode Scaled*
![image.png](https://gainium.io/images/content/help/image_3b6ffe088e-4b7bb9.png)
*DCA Mode Scaled based on ATR*

### Example Strategy Using Scaled DCA with ATR:

#### Entry Rules
- **Long Entry (Buy)**:Set up **5 DCA orders** with **ATR** as the base scaling. If the **ATR** is **10** and the current price is **1000**, setting a **Factor** of **1** and a **Step Scale** of **1** will place orders at **990, 980, 970**, and so on.

#### Exit Rules
- **Exit Long**:Exit the trade when the bot completes all **DCA orders** or when the price rebounds by a certain percentage or reaches a take-profit target.

#### Implementation in Gainium:
- **Set ATR as Base Scaling**: Use **ATR** as the base for your DCA orders. This makes the strategy more adaptive to current market volatility.- **Use Factor for Adjusting Step Size**: Configure the **Factor** to determine how large the steps between orders should be. For instance, set it to **2** to double the distance between each DCA level, allowing for wider orders in highly volatile conditions.

### DCA Type: Technical Indicators

In **Technical Indicators** DCA mode, the bot places orders based on specific market indicators such as **ATR**, **Moving Average Ratio (MAR)**, or **RSI**. This allows you to trigger orders based on actual market conditions rather than predefined steps.

#### Key Settings:
- **Indicator**:You can choose between technical indicators, such as **ATR**, **MAR**, or **RSI**. For example, **ATR**&nbsp;lets you place DCA orders based on market volatility, while&nbsp;**RSI**&nbsp;can detect oversold conditions.
- **Order Step**:You can define the minimum percentage distance between each DCA order. For instance, setting this to **1%** means the bot won’t place another DCA order until the price moves at least 1% from the previous order, ignoring other signals.
- **Indicator-Specific Settings**:**ATR**: Adjust the length, interval, and factor to match the asset's volatility. For example, using a **14-day ATR** helps capture long-term volatility.- **MAR**: Set the **EMA Length** and **conditions** to place DCA orders when the price crosses above or below a specific moving average.- **RSI**: Use the RSI to place orders when the market is overbought or oversold.

#### Example Strategy for Technical Indicators:
- **Entry**: Set the bot to buy more when the **RSI** exceeds **30**, signaling oversold conditions. Use **5 orders** and set a **1% minimum step**.- **Exit**: The bot will sell as the price moves higher, ideally when **RSI** crosses back above **70** to signal overbought conditions.
![image.png](https://gainium.io/images/content/help/image_22b0e91d0f-d1f932.png)
*DCA Mode by Indicators*

### DCA Type: Custom

**Custom DCA** allows you to set your percentage steps between orders and create as many DCA orders as you like. This mode gives you full flexibility in order sizes, spacing, and timing.

#### Key Settings:
- **DCA Orders**:Specify each DCA order individually. For example, **DCA 1** could trigger at **1%**, while **DCA 2** could trigger at **2%**. You can create as many orders as you like, allowing for strategies like Fibonacci retracements or other custom intervals.
- **Step %**:Define the percentage step between each order. For example, the first DCA order could be placed after a 1% price drop, and the second after a 2% drop.
- **DCA Order Amount**:Set the amount for each DCA order. For example, the first order might be **5 USDT**, and the second might be **13 USDT**, allowing you to increase or decrease the investment per step.
- **Volume Scaling**:Like in Scaled mode, you can increase the size of each DCA order using volume scaling.

#### Example Strategy for Custom DCA:
- **Entry**: Use Fibonacci retracement levels (e.g., **1%, 1.618%, 2.618%**) to place DCA orders at key support and resistance levels. You can set the volume to increase as the price drops further, allowing you to buy more at lower levels.- **Exit**: Similarly, set Fibonacci levels for exit orders with multiple TP as the price rises gradually.
![image.png](https://gainium.io/images/content/help/image_4843b179fc-51a4eb.png)
*DCA Mode Custom*

## Practical Considerations

### 1. Choose the Right DCA Mode for the Market
- **Scaled DCA** is ideal for trending markets where you want evenly-spaced orders.- **Technical Indicators DCA** is helpful in volatile markets where you need to base your entries on volatility or trend indicators.- **Custom DCA** is perfect for advanced traders who want full control over their DCA intervals and order sizes, particularly for Fibonacci strategies.

### 2. Adapt the DCA Settings Based on Asset Volatility
- Due to their high volatility, assets like&nbsp;**Meme Coins**&nbsp;may require larger DCA steps, whereas less volatile assets such as BTC may benefit from smaller, more frequent orders.

### 3. Combine DCA with Risk Management
- Always backtest your DCA strategies in Gainium’s simulation mode to ensure they perform well under different market conditions. Use stop-losses and take-profit orders to protect your capital.

### 4. Monitor Market Conditions
- If market volatility is high, consider using **ATR** or other technical indicators more effectively to space out your orders. In quieter markets, **Scaled DCA** might provide smoother entries and exits.

## Conclusion

The **DCA Mode** in Gainium is a versatile and powerful tool that allows traders to spread their entries and exits over multiple price points, reducing the risk of market fluctuations. Whether you prefer **Scaled**, **Technical Indicator**, or **Custom** DCA strategies, Gainium allows you to tailor your approach to the specific asset you’re trading and the current market environment.
