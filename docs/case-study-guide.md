# Case study writing guide

Internal notes for writing case studies on lyori.com. This folder is not deployed (`scripts/build.sh` only copies the public files).

## Shape

1. **Title**: product name plus the problem it solves, short. "T&S Policy Watcher: Know When Live Shopping Rules Change", not a slogan.
2. **Dek**: one sentence on what I built and for whom.
3. **At a glance** (`dl.glance`): Problem, My role, What I built, Results. A reader gets the story in 10 seconds.
4. **The problem**: who has it and why it matters, before any tech. Numbers if we have them.
5. **What success looked like**: the metric set before launch (north star plus the day-one signal).
6. **Key decisions**: each one says what I chose, what I gave up, and why. Name what was out of scope.
7. **Results**: only validated facts and numbers. If the product was retired, say so and why.
8. **Takeaways**: three, one line each.
9. **What's next**: one short paragraph, optional.

## Rules

- Lead with the problem everywhere: titles, cards, deks.
- Judgment over activity. "I chose X over Y because" beats "I built X".
- First person. Credit collaborators by name and link them (DebtCat: Etele and Dalma).
- No invented metrics, quotes, or claims. A missing metric is better than a made-up one.
- Simple verbiage: short sentences, no buzzwords (leverage, robust, seamless, comprehensive), no "not just X but Y", no "studies show", no em dashes, no italics, sentence-case headings in the body.
- 2 to 3 minute read. Cut anything that doesn't change what a product leader thinks of the work.
- Real screenshots as proof, with alt text and a one-line caption.

## Where this came from

- Writing PRDs, distilled from Lenny's Podcast guests: lead with the problem and why now, define success upfront, keep it light, name what's out of scope. https://skillselion.com/skills/refoundai/lenny-skills/writing-prds
- Ian McAllister, 16 tips for writing upwards: executive summary on top, specific numbers over vague words, committed language over hedging. https://ianmcallister.substack.com/p/16-tips-for-writing-upwards
- PM portfolio guides: problem, decision, outcome; be honest about thin results. https://www.ideaplan.io/qa/what-makes-a-good-pm-portfolio
- Amazon working backwards: name the customer, one main benefit, candid about trade-offs.

To add a case study, start from `templates/case-study.html`.
