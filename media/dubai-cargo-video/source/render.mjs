import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const sc = JSON.parse(fs.readFileSync('scenes_timed.json', 'utf8'));
const LEAD = 0.6, TAIL = 1.3;
let t = 0;
for (const s of sc) {
  const lead = s.id === 'intro' ? 1.8 : LEAD, tail = s.id === 'outro' ? 3.0 : TAIL;
  s.start = t; s.voStart = t + lead; s.voLen = s.dur; s.dur = lead + s.voLen + tail; t += s.dur;
}
const TOTAL = t;
fs.writeFileSync('timeline.json', JSON.stringify({ scenes: sc, total: TOTAL }, null, 1));
const mode = process.argv[2] || 'preview', FPS = 30;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.addInitScript(([S, T]) => { window.SCENES = S; window.TOTAL = T; }, [sc, TOTAL]);
page.on('console', m => console.log('console:', m.text())); page.on('pageerror', e => console.log('ERR', e.message));
await page.goto('file://' + process.cwd() + '/video.html');
await page.evaluate(() => document.fonts.ready);
if (mode === 'preview') {
  fs.mkdirSync('preview', { recursive: true });
  for (const s of sc) {
    const tt = s.start + s.dur - 0.6;
    await page.evaluate(x => setTime(x), tt);
    await page.screenshot({ path: `preview/${s.id}.jpg`, type: 'jpeg', quality: 80 });
  }
} else {
  fs.mkdirSync('frames', { recursive: true });
  const N = Math.ceil(TOTAL * FPS), K = +(process.argv[3] || 0), M = +(process.argv[4] || 1);
  for (let i = K; i < N; i += M) {
    await page.evaluate(x => setTime(x), i / FPS);
    await page.screenshot({ path: `frames/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    if (i % 300 === 0) console.log('frame', i, '/', N);
  }
}
console.log('TOTAL', TOTAL);
await browser.close();
