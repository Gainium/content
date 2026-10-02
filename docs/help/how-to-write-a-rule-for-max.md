---
id: 1042
name: How to write a rule for Max
slug: how-to-write-a-rule-for-max
description: >-
  Max carries out the rules you write for a bot. How to write a rule Max can
  check: what Max can see, what makes a rule clear, and bad and better
  examples for each setting.
createdAt: '2026-10-02T00:00:00.000Z'
updatedAt: '2026-10-02T00:00:00.000Z'
publishedAt: '2026-10-02T00:00:00.000Z'
locale: en
categories:
  - trading-bots
  - platform
difficulty: intermediate
tags:
  - max
  - ai
tldr: >-
  Max only does what your rule says, so write it as a check Max can run on
  the data he sees: name what to watch, the condition, the timeframe, what to
  do, and what to do when it's unclear. Replace vague words like "strong" with
  a measure. Write one rule per setting. The examples here show how to phrase
  a rule; they are not recommendations.
---

When Max runs on a bot, he carries out **your** written rules, inside the limits you set. Gainium doesn't write the strategy and Max doesn't choose one for you. Each setting has its own rule field, and Max acts on a setting only by its rule.

> **The examples on this page show how to phrase a rule. They are not recommendations, and nothing here promises a result. You decide your rules.**

## What Max can see

For a bot, Max can read:

- **Price and candles** of the pairs the bot trades, and any indicator from the bots' own indicator library computed on them.
- **A market snapshot** of those pairs on up to four timeframes: trend (EMA 20/50 and its slope), RSI(14), ATR(14) and the volatility level, the last swing high and low, and support and resistance levels found from recent turning points (price, distance from the current price, number of touches).
- **The deal's own data**: average price, safety orders filled, time in the deal, unrealised P&L, distance to its take profit, stop loss and next safety order, and funds used.
- **The bot's statistics per pair** (deals, win rate, average duration, drawdown) and **Max's own past decisions** on this bot with their outcomes.
- **BTC's trend and volatility** on the bot's exchange, and the crypto fear & greed index.

The **entry filter** and the **exit filter** decide in one quick step from a snapshot: the market snapshot on three timeframes around the signal, the deal, the pair statistics and past decisions. There Max can't fetch other indicators or candles.

Max **can't** see news, social media, announcements, order books, funding rates, other coins (apart from BTC), other exchanges, your other bots or balances, or anything about the future. A rule that depends on those can't be carried out.

## What makes a rule clear

- **A condition Max can check.** Name what to watch and the test: "price within 1% under a resistance", not "near resistance".
- **A timeframe.** "On the 4h chart", "the last 5 candles", "in the last 2 days".
- **What to do.** Skip, hold, close, or the value to set.
- **What to do when it's unclear.** "If there is no resistance inside my range, set 2%."
- **No vague words without a measure.** "Strong", "significant", "good", "safe" and "best" mean nothing to Max until you say how to measure them.

Use Max for rules that need judgement, such as reading levels, how price is moving, or where the deal stands. If a plain bot condition already does the job (a fixed TP %, an RSI threshold for starting deals), set that in the bot instead.

## Entry filter

Max checks this rule each time a new deal is about to open. The deal is skipped only when the rule says so.

| Bad | Better |
|---|---|
| Only open good trades. | Skip the deal if price is within 1% under a 4h resistance that rejected it at least 3 times in the last 2 days. |
| Don't buy into a crash. | After a drop of more than 5% within the last 6 hours, skip new deals until two 1h candles in a row close above the previous one. |
| Avoid bad entries near the top. | Skip the deal if the last swing high on the 4h chart is less than 1.5% above the price. |

## Take profit: range and early close

**Take-profit range.** Max sets your TP % inside the range you allow, by your rule.

| Bad | Better |
|---|---|
| Take more profit when the market is strong. | Set TP 0.3% under the nearest 4h resistance inside my range; if there is none, set 2%. |
| Aim higher if it's trending. | If the 4h trend is up and the next resistance is more than 3% away, use the top of my range; otherwise the bottom. |

**Early close.** On each check, Max closes an open deal at market only when your rule says so.

| Bad | Better |
|---|---|
| Close it if it looks bad. | Close the deal if two 4h candles close below the last support it held and it is still in loss. |
| Get out if it's going nowhere. | Close the deal if it has been open more than 5 days and price has stayed within 1% of the average price for the last 48 hours. |

## Exit filter (take profit on a signal)

When your take-profit signal fires (indicators or a webhook), Max holds the deal open only when your rule says so. Otherwise the deal closes as usual.

| Bad | Better |
|---|---|
| Hold if it can go higher. | Hold while the 1h trend is still up (higher lows on the last 5 candles) and the next resistance is more than 2% away; otherwise close. |
| Let winners run. | Hold if the move is still trending cleanly (each of the last 3 1h candles closed higher) and price is not within 1% of a 4h resistance. |

## Stop loss

Max moves your stop inside your range by your rule. That includes raising it to lock in profit. With **Only raise the stop** on, Max only ever moves it toward profit.

| Bad | Better |
|---|---|
| Protect my profits. | Once the deal is up 3%, raise the stop to 0.3% under the last 1h support the price held. |
| Tighten the stop when it's risky. | When the 4h ATR % is above its 30-day average, move the stop to 0.5% under the most recent 4h swing low. |
| Don't get stopped out by noise. | Keep the stop at least 1.5 × the 1h ATR below the price; raise it only when a new 1h swing low forms. |

## General guidance

Optional context Max keeps in mind when he applies your setting rules. It never triggers a change by itself, so use it to define your terms, not to give orders.

| Bad | Better |
|---|---|
| Make me money. | By "support" I mean a level the price bounced from at least twice in the last week on the 4h chart. |
| Be careful. | When my rules say "a sharp drop", I mean more than 4% within 6 hours. |

## Getting help from Max

Next to each rule field, **Ask Max about this rule** opens the Max chat with the bot, the setting and your current rule filled in. The message is not sent until you send it.

In that conversation, Max will:

- explain concepts in general terms, such as what support and resistance are or ways people measure momentum and volatility;
- tell you what he can and can't see for a bot;
- ask questions until your own idea is precise;
- show generic example phrasings like the ones on this page, each labelled as an illustration, not a recommendation.

Max won't:

- recommend a rule, a value or an indicator for your bot;
- turn a vague goal like "make profit" or "be safe" into a strategy. He'll ask which conditions you want him to apply instead;
- give market opinions or predictions.

You write the rule in the rule field and save it yourself. Nothing in the chat is saved as a rule.
