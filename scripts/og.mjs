// Renders share images for case studies: node scripts/og.mjs
// Needs Playwright (npx playwright). Add a line below for each new case study.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const cards = [
  { slug: 'trust-safety-policy-watcher', title: 'Trust & Safety Policy Watcher', sub: 'Know within hours when live shopping rules change', shot: '/assets/images/ts_policy_watcher_main.png' },
  { slug: 'debtcat', title: 'DebtCat', sub: 'A no-BS first aid kit for people drowning in debt', shot: '/assets/images/debtcat_1.png' },
  { slug: 'findmepet', title: 'FindMePet', sub: 'Using AI to solve the pet adoption mismatch problem', shot: '/assets/images/shasta_main.png' },
];

const root = new URL('..', import.meta.url);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of cards) {
  const url = new URL('templates/og-card.html', root);
  for (const key of ['title', 'sub', 'shot']) url.searchParams.set(key, card[key]);
  await page.goto(url.href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL(`images/og/${card.slug}.png`, root)) });
  console.log(`images/og/${card.slug}.png`);
}
await browser.close();
