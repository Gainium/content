---
id: 47
name: Paper Trading (Forward testing)
slug: paper-trading-forward-testing
description: >-
  In this article we explain the power of paper trading and how to use paper
  trading features in Gainium.
createdAt: '2022-11-22T11:12:15.615Z'
updatedAt: '2026-02-24T07:44:20.578Z'
publishedAt: '2022-11-22T11:14:28.061Z'
locale: en
categories:
  - platform
difficulty: intermediate
tags:
  - trading
faq:
  - title: What is paper trading on Gainium?
    details: >-
      Paper trading is a risk-free way to test your trading strategies using
      real market data without actually risking any real money. On Gainium, this
      feature is free and unlimited for all users, allowing you to experiment
      with various trading strategies across different exchanges.
  - title: How many paper exchanges can I create?
    details: >-
      You can create as many paper exchanges as you like. There's no limit. This
      allows you to test multiple strategies across different markets
      simultaneously.
  - title: Which exchanges are supported for paper trading?
    details: >-
      We support a wide range of exchanges for paper trading, including Binance
      Spot and Futures, OKX Spot and Futures, KuCoin Spot and Futures, Bybit
      Spot and Futures, and Coinbase Spot. This allows you to simulate trading
      on the most popular platforms with real price data.
  - title: Does paper trading use real market data?
    details: >-
      Yes, our paper trading feature uses real price data from the supported
      exchanges. You're practicing with the most accurate market conditions
      without risking your capital.
  - title: How can I manage my paper exchange accounts?
    details: >-
      You can manage your paper exchange accounts directly from the exchange
      menu. This includes adding funds to simulate more capital, deleting paper
      exchanges you no longer need, adding new ones, or resetting your paper
      trading data to start fresh.
  - title: How do I switch between live trading and paper trading?
    details: >-
      Switching between live and paper trading is seamless. You can toggle
      between the two modes from the account menu, allowing you to move from
      practice to real trading whenever you're ready.
  - title: Can I paper trade Bitcoin and meme coins?
    details: >-
      Yes. Any trading pair available on your chosen exchange can be paper
      traded on Gainium — including Bitcoin (BTC), Ethereum (ETH), and meme
      coins like DOGE, SHIB, PEPE, and others. You get the same real-time
      price data as live trading.
  - title: Does Gainium support paper trading futures?
    details: >-
      Yes. Gainium supports paper trading for both spot and futures markets on
      Binance, Bybit, KuCoin, and OKX. This includes leverage simulation and
      liquidation price tracking, so you can test futures strategies without
      risking real capital.
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.019Z'
tldr: >-
  Paper trading lets you practice trading with real market data but no real
  money, helping you learn the platform, test strategies, and develop emotional
  control risk-free. Gainium offers free unlimited paper trading across multiple
  exchanges.
---

For traders and investors new to the game or seeking to hone their skills, [crypto paper trading](https://gainium.io/crypto-paper-trading) has become a valuable tool for gaining experience without risking hard-earned capital. In this article, we'll cover the benefits and drawbacks of paper trading, how to set it up on Gainium, and what you can test — from Bitcoin and meme coins to futures and automated bots.

> **Looking for a deeper dive?** Check out our [complete paper trading walkthrough guide](/blog/paper-trading-walkthrough-guide) for step-by-step strategies, backtesting workflows, and a transition checklist for going live.

## Benefits of Paper Trading in Crypto

Why should you paper trade? There are several key benefits:

- **Risk-Free Learning**: Paper trading is a simulated trading environment where you can practice buying and selling cryptocurrencies without risking actual money. This provides an opportunity to learn the ropes, test strategies, and develop confidence before transitioning to real-world trading.
- **Get familiar with Gainium's platform**: Understanding how to navigate the platform and use its features is crucial. Paper trading lets you become acquainted with Gainium's interface, order types, and technical analysis tools without incurring any financial risk.
- **Learn Emotional Control**: Trading can be an emotional rollercoaster. Paper trading provides a testing ground for managing emotions like fear, greed, and frustration, helping you become more disciplined in your decision-making.
- **Test Any Asset**: Paper trade Bitcoin, altcoins, meme coins (DOGE, SHIB, PEPE, etc.), or any trading pair available on your chosen exchange — all with real market data.

## Drawbacks of Paper Trading in Crypto

Though there are many benefits to paper trading, keep the following limitations in mind:

- **Lack of Real-World Pressure**: While paper trading shields you from financial loss, it also removes the sense of urgency that comes with real money trading. You may not fully experience the psychological challenges of actual trading.
- **Overconfidence**: Success in paper trading does not guarantee success in real-world trading. A string of paper trading wins can lead to rash decisions and potential losses when you transition to trading with real money.
- **Differences with Real Exchange Order Execution**: Paper trading orders are instantly executed at the triggered price. In live trading, orders may be executed at different prices due to slippage, or may not be executed at all during high volume. This is especially relevant for low-liquidity pairs like meme coins, where the gap between simulated and real execution is larger.

## What Can You Paper Trade?

Paper mode supports every feature available in live mode:

- **[Grid Bots](https://gainium.io/grid-bot)** — Test grid ranges and spacing across any trading pair
- **[DCA Bots](https://gainium.io/dca-bot)** — Validate safety order distances and take-profit levels
- **[Combo Bots](https://gainium.io/combo-bot)** — Our most advanced bot type combining grid and DCA strategies
- **Manual Trading** — Practice entries and exits with real TradingView charts
- **Futures Trading** — Including leverage and liquidation simulation on Binance, Bybit, KuCoin, and OKX futures
- **TradingView Webhooks** — Connect a TradingView strategy and paper trade it on Gainium

You also get full access to advanced metrics and reporting, so you can properly analyze your paper trading results.

## Using Paper Trading in Gainium

To start paper trading in Gainium, switch to Paper mode. You can do so under your account menu in the top bar.
![Switch-paper.png](https://content.gainium.io/images/content/help/Switch_paper_641078664c-ac6949.png)
Once you have switched to paper mode, go to your exchanges and add a new paper trading exchange. Choose the exchange you want to simulate (Binance, Bybit, KuCoin, OKX, or Coinbase), input the desired amount of USDT, and that's it! You can now trade as if it was real money.

![add-exchange.png](https://content.gainium.io/images/content/help/add_exchange_a287032f64-a990eb.png)

Think of paper trading mode as another account. You can add and remove exchanges; all other functionality remains the same. There's no limit on how many paper exchanges you can create.

If you use AI agents through Gainium MCP, paper mode is usually passed per tool call with `paperContext: true`, or enforced server-side with `GAINIUM_PAPER_ONLY=true`. See [Connect Gainium MCP to AI agents](https://gainium.io/help/mcp) for the MCP-specific setup.

### Managing Your Paper Trading Account

You can manage your paper trading accounts from the "Exchanges" menu. There you can add new accounts, add more funds to existing accounts, delete accounts, and reset all paper trading data.

![manage paper trading.png](https://content.gainium.io/images/content/help/manage_paper_trading_cdb824114f-1dc8a8.png)

## From Paper Trading to Live: The Recommended Path

Paper trading is most effective when combined with [backtesting](/help/backtesting-trading-bots). The recommended workflow:

1. **Backtest** your strategy against historical data to eliminate bad ideas quickly
2. **Paper trade** forward in real time for at least 2-4 weeks
3. **Go live** with the smallest position size you're comfortable with

For a detailed walkthrough of this process — including separate workflows for mechanical vs technical strategies — see our [complete paper trading guide](/blog/paper-trading-walkthrough-guide).

## Conclusion

Paper trading is an invaluable resource for both new and experienced crypto traders. Whether you're testing a Bitcoin grid bot, paper trading meme coins, or simulating futures leverage, it removes the most expensive part of learning — losing real money while figuring things out.

On Gainium, paper trading is free and unlimited. Start in 30 seconds, test anything, and only go live when you're ready.
