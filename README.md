# orgami-site

The landing page for [orgami](https://github.com/achevalier-dev/orgami) — Astro,
Tailwind, no client framework. Every image and every line of terminal output on
it came out of a real run against the public [honojs](https://github.com/honojs)
organization, so nothing on the page is a mockup.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## The design

**org + origami.** The page is a sheet of paper: ivory ground, ink, creases that
catch light between sections, and one vermilion mark. It commits to that world
and carries no second theme — every colour is painted in `src/styles/global.css`,
never inherited from the reader's system.

The hero performs the name once, on load: a flat sheet of real repository names
folds down and settles, mountain and valley alternating so the light lands on
opposite faces (`src/components/Fold.astro`). That is the only orchestrated
motion on the page; a reader who asks for less motion gets the sheet already
folded.

Fraunces for display, Newsreader for prose, JetBrains Mono for anything the tool
itself printed — all three self-hosted as variable woff2 in `public/fonts`, so
nothing is fetched from a CDN and nothing silently falls back.

Terminal output is set as a **plate**: dark printed matter with a paper edge and
a drop shadow, laid on the sheet. The four node colours — repository, host, tool,
service — are the only colours that carry meaning, and they mean exactly what
they mean inside orgami.

Each section carries its source in the margin (`lib/scan.sh`, `lib/daily.jq`,
`lib/tui.sh`), set as marginalia. That is the tool's own rule applied to its own
site: a claim you cannot open and check does not belong in the output.

## Checking a change

```bash
npm run build && npm run preview
npx playwright@latest install chromium   # once
npm run shots                            # shots/{light,dark,mobile}.png
```

`npm run shots` fails on any console error and writes a full-page screenshot per
theme. Playwright is not a dependency — a marketing page should not carry a
browser download in its lockfile.

## Assets

`public/demo.mp4` is recorded with [vhs](https://github.com/charmbracelet/vhs)
from `docs/demo.tape` in the orgami repository, then trimmed so the first frame
has output on it rather than an empty prompt. `public/og.png` is built from that
same first frame.

## Deploying

Vercel detects Astro and needs no configuration: import the repository, and it
builds `npm run build` into `dist/`. Any static host works the same way.

MIT.
