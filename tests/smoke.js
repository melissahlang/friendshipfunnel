// Plays the whole quiz for several goals and languages; fails on JS errors or wrong leak.
const { chromium } = require('playwright');
const path = require('path');
const url = 'file://' + path.resolve(__dirname, '../index.html');
const low = (from) => (k) => (k >= from && k < from + 5 ? 1 : 4);
const cases = [
  { goal: 1, lang: 'en', answer: low(5),  expect: 'Repeated Exposure' },
  { goal: 0, lang: 'en', answer: low(10), expect: 'Volume', note: 'matters less' }, // Integration out of scope
  { goal: 4, lang: 'en', answer: low(10), expect: 'Volume', eyebrow: 'strongest' },
  { goal: 2, lang: 'th', answer: low(5),  expect: 'Repeated Exposure' },
  { goal: 3, lang: 'zh', answer: low(15), expect: 'Deepen' },
];
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 420, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  let fail = 0;
  for (const c of cases) {
    await p.goto(url);
    await p.evaluate(l => localStorage.setItem('ffq-lang', l), c.lang); await p.reload();
    await p.click('#s'); await p.click(`.ans[data-g="${c.goal}"]`);
    for (let k = 0; k < 20; k++) { await p.waitForSelector('.sc'); await p.waitForTimeout(220); await p.click(`.sc[data-v="${c.answer(k)}"]`); await p.waitForTimeout(230); }
    await p.waitForSelector('.cta');
    const hero = await p.innerText('.hero'), note = await p.$('.gnote') ? await p.innerText('.gnote') : '';
    let ok = hero.includes(c.expect) && (!c.note || note.includes(c.note)) && (!c.eyebrow || hero.toLowerCase().includes(c.eyebrow));
    console.log(ok ? 'PASS' : 'FAIL', JSON.stringify({ goal: c.goal, lang: c.lang, expect: c.expect })); if (!ok) fail++;
  }
  if (errs.length) { console.log('JS errors:', errs); fail++; }
  await b.close(); process.exit(fail ? 1 : 0);
})();
