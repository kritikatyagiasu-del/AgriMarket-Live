# AgriMarket: Mandi Price Advisor — Retrospective PRD

**One line:** Help a farmer decide where and when to sell a crop, in their own language, using mandi prices they can trust.

| | |
|---|---|
| **Author** | Kritika Tyagi (PM and builder) |
| **Status** | Prototype on simulated data. This PRD was written after the build, to record the product thinking and set out what a real launch needs. |
| **Repo** | [kritikatyagiasu-del/AgriMarket-Live](https://github.com/kritikatyagiasu-del/AgriMarket-Live) |
| **Last updated** | November 2026 |

---

## 1. Problem

A farmer bringing a harvest to market usually sells at the nearest mandi, at whatever price is offered that day. Better prices may exist at another mandi within reach, or a few days later, but checking means phone calls, word of mouth or government portals built for analysts, mostly in English.

Traders and exporters face the mirror problem: knowing where supply is arriving and where buying is cheapest.

**The decision we want to improve:** *Should I sell this crop today, and at which mandi?*

### Users

| Segment | Job to be done | What they need to see first |
|---|---|---|
| **Farmer** (primary) | Get the best net price for a harvest | Selling price per quintal at nearby mandis, the best mandi, sell-or-hold advice |
| **Trader / wholesaler** | Buy at the right price and volume | Buying rates, arrival volumes, where supply is building |
| **Exporter** | Source bulk supply of the right grade | Grades, port-connected mandi rates, bulk supply trends |

### Assumptions to validate

These come from desk research and are **not yet tested with users**:

1. Farmers would travel to a further mandi if the gain clearly beats the cost of getting there.
2. Advice in the user's own language and script is necessary, not a nice-to-have.
3. A plain recommendation ("Sell now", "Hold") is more useful than charts, as long as the reason is shown.
4. Users will trust the app only if it shows where and when each price came from.

## 2. What the prototype does today

- **9 languages** (English, Hindi, Punjabi, Marathi, Gujarati, Kannada, Tamil, Telugu, Bengali), with state suggested from GPS or PIN code.
- **Price table:** buying, selling and modal prices per quintal, filtered by state, district, mandi and crop category.
- **7-day trends** and daily arrival volumes.
- **Best mandi finder:** ranks mandis for a crop by selling price.
- **AI advisory:** Gemini 2.5 Flash returns a trend summary, outlook and recommended action in the chosen language, with a rule-based fallback when no API key is set.
- **Role-based views** for farmers, traders and exporters, and a guest mode.

### Known gaps (honest current state)

| Gap | Why it matters |
|---|---|
| Prices are **simulated** in the AGMARKNET format; the live data.gov.in feed is not connected | No advice can be acted on until real prices flow in |
| The best mandi finder ranks by **price only**; transport cost is not included | The "best" mandi can be a worse deal once travel is paid for |
| The AI prompt asks the model to suggest a mandi by name, which can produce **mandis that are not in the data** | A farmer could travel to a market that doesn't exist or doesn't trade that crop |
| AI advice shows **no confidence level, data date or disclaimer** | Users can't tell strong advice from a guess |
| Sign-in is **simulated**, and profiles (name, phone, PIN code, district, role) are kept in the browser's local storage | Fine for a demo; not acceptable for real users' personal data |

## 3. Goals and success metrics

**North-star metric:** the price farmers actually realise versus the modal price at their nearest mandi on the same day.

| Goal | Metric | How to measure | Target |
|---|---|---|---|
| Better selling decisions | Realised price vs nearest-mandi modal price | In-app "I sold" check-in, with optional price | Set after a 4-week baseline |
| Advice people act on | Share of advice views followed by a check-in | Event logging | Set after baseline |
| Trust | Share of users who return within 7 days | Retention cohort | Set after baseline |
| Safe advice | Advice items that cite a mandi or price not in the data | Weekly eval set (section 5) | **0** |
| Reach | Weekly active users per language | Analytics | Grow in at least 3 of the 9 languages |

Targets are deliberately left open: setting them without a baseline would be guesswork.

## 4. Scope for a real launch (v1)

**In scope**

1. Connect the live AGMARKNET feed from data.gov.in, show each price's date, and hide prices older than 2 days.
2. Add **net price after transport** to the best mandi finder: the user enters distance or vehicle type, and the app ranks mandis by price minus estimated travel cost.
3. **Ground the AI advice** in the data: the model can only name mandis and prices that are in the current dataset, and every recommendation shows its reasons and data date.
4. Real authentication with phone OTP, and personal data stored server-side under the privacy rules in section 6.
5. Native-speaker review of all 9 languages before launch.

**Out of scope for v1:** price prediction beyond 7 days, transactions or payments, logistics booking, and credit or insurance products.

### Validation plan

| Question | Method |
|---|---|
| Do farmers trust and understand the advice? | 15–20 interviews in two districts with different crops, testing the prototype in their language |
| Does showing net price after transport change choices? | A/B test: best-mandi ranking with and without transport cost |
| Does a confidence label increase or reduce action? | A/B test: advice with and without a "high / medium / low confidence" label |

## 5. AI risk and guardrails

Advice to sell or hold has real money behind it. A wrong "hold" during a price drop costs a farmer income. The product's rule is: **the app informs the decision; the farmer makes it.**

| Risk | Guardrail |
|---|---|
| The model names a mandi or price that isn't in the data | Pass only the current dataset to the model; reject any response that cites a mandi or number not in it, and fall back to the rule-based summary |
| Advice on stale data | No advice when the newest price is older than 2 days; say so plainly instead |
| Overconfident advice | Show a confidence level based on how much the price moved and how much data there is; low confidence means "watch", never "sell now" or "hold" |
| Poor translations change the meaning | Fixed, reviewed templates for actions ("Sell now", "Hold") in every language; the model fills in reasons only |
| Users treat it as a guarantee | A short notice in the user's language on every advice card: prices change, and the decision is theirs |

**Evaluation:** a fixed set of 50 market scenarios (rising, falling and flat prices; stale data; thin data) run on every prompt or model change. Each response is checked automatically for invented mandis or numbers, and a sample is reviewed by hand in each language.

## 6. Data and privacy (DPDP)

India's DPDP Act applies to this app's users. Its notice, consent, erasure and breach-reporting duties take effect on 13 May 2027, and v1 should meet them from day one.

| Area | v1 requirement |
|---|---|
| **Minimise** | Guest mode needs no personal data. Signed-in users give a phone number, district and role; name is optional |
| **Notice and consent** | A short notice in the user's chosen language before sign-up, and separate consent for GPS location |
| **Storage** | Server-side and encrypted; nothing personal in browser storage beyond a session token |
| **Retention** | Delete inactive accounts after a set period, and keep "I sold" check-ins only as anonymised aggregates |
| **User rights** | In-app options to see, correct and delete your data |
| **Children** | Ask for an age confirmation at sign-up; under-18s need verifiable parental consent |

## 7. Risks and open questions

- **Data reliability:** how complete and timely is the AGMARKNET feed for smaller mandis? This needs measuring before launch.
- **Distribution:** farmers may reach the app through FPOs (farmer producer organisations), WhatsApp or agri-input shops rather than app stores. Which channel works best is untested.
- **Low connectivity:** does v1 need an SMS or offline mode?
- **Business model:** free for farmers; possible paid features for traders and exporters. Untested.

## 8. Milestones

| Phase | Exit criteria |
|---|---|
| **1. Validate** | Interviews done; assumptions 1–4 confirmed or revised |
| **2. Real data** | Live feed connected; prices show their date; stale prices hidden |
| **3. Safe advice** | Grounded prompts, confidence labels and notices live; eval set passing with 0 invented mandis or prices |
| **4. Pilot** | Two districts, three languages, with real sign-in and DPDP controls; baseline metrics recorded |
| **5. Scale** | Targets set from the baseline; remaining languages reviewed and launched |
