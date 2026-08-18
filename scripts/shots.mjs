// Screenshots the built site in both themes and at phone width, and fails on a
// console error. Needs playwright, which is deliberately not a dependency:
//   npx playwright@latest install chromium && node scripts/shots.mjs
import { chromium } from "playwright";

const target = process.env.URL ?? "http://127.0.0.1:4321/";
const shots = [
  { name: "light", theme: "light", w: 1400, h: 1000 },
  { name: "dark", theme: "dark", w: 1400, h: 1000 },
  { name: "mobile", theme: "light", w: 420, h: 900 },
];

const browser = await chromium.launch();
let failed = false;

for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.w, height: s.h },
    colorScheme: s.theme,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(target, { waitUntil: "networkidle" });

  // Walk the page so lazily loaded images are actually loaded before the shot,
  // then wait for every one of them to finish decoding.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise((r) => img.addEventListener("load", r, { once: true }))),
    );
  });
  await page.waitForTimeout(250);

  await page.screenshot({ path: `shots/${s.name}.png`, fullPage: true });
  if (errors.length) {
    failed = true;
    console.error(s.name, errors);
  } else {
    console.log(s.name, "ok");
  }
  await ctx.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
