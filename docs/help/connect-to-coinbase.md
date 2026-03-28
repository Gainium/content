---
id: 102
name: Connect to Coinbase
slug: connect-to-coinbase
description: >-
  In this article you will learn how to connect your Coinbase exchange account
  to Gainium.
createdAt: '2024-03-16T14:57:48.243Z'
updatedAt: '2026-02-24T07:44:20.568Z'
publishedAt: '2024-04-06T11:33:03.122Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.003Z'
tldr: >-
  Step-by-step guide to connecting Coinbase to Gainium via the Coinbase
  Developer portal. Create a Trading API key with View and Trade permissions,
  add Gainium''s IP addresses for whitelisting, then paste the credentials into
  Gainium.
---

1. [Log in](https://portal.cdp.coinbase.com/) to your Coinbase Developer account

2. Go to Settings -> API
![telegram-cloud-photo-size-5-6118359133276192891-y.jpg](https://content.gainium.io/images/content/help/telegram_cloud_photo_size_5_6118359133276192891_y_868a599617-ea7443.jpg)

![telegram-cloud-photo-size-5-6118359133276192892-y.jpg](https://content.gainium.io/images/content/help/telegram_cloud_photo_size_5_6118359133276192892_y_387d46da15-93b5a0.jpg)
3. Click on **Create API key** button on the right top corner
![telegram-cloud-photo-size-5-6118359133276192893-y.jpg](https://content.gainium.io/images/content/help/telegram_cloud_photo_size_5_6118359133276192893_y_3a3358ce60-f0ff9a.jpg)
4. Choose **Trading key** and click on Next button

![step-1.png](https://content.gainium.io/images/content/help/step_1_d70675511f-2ecec9.png)

5. Name your API key and choose a portfolio

6. Enable permissions **View** and **Trade**; don't enable Transfer permissions.

7. Enter our IP addresses in **Enable IP Addresses** section. Here are the addresses you can copy and paste, make sure they are separated by commas and spaces:

**78.128.60.89, 78.128.43.82, 78.128.8.36, 78.128.43.168, 217.174.152.25**

![step-2.png](https://content.gainium.io/images/content/help/step_2_385a2fcbe7-9cf6b1.png)

8. Click on **Create & Download**

9. Complete 3-factor authentication

![step-3.png](https://content.gainium.io/images/content/help/step_3_51d3dcdffb-d03e4c.png)

10. Now you have your API details, which you can use to link your exchange in Gainium.

![step-4.png](https://content.gainium.io/images/content/help/step_4_1bf859ccb2-71c4ae.png)

11. In Gainium, go to the [Exchanges](https://app.gainium.io/exchanges) page. Then click on **Add New**

![Screenshot 2024-04-02 at 10.18.50.png](https://content.gainium.io/images/content/help/Screenshot_2024_04_02_at_10_18_50_706883bd70-c20bfc.png)

12. Paste key name and secret and you are done!
