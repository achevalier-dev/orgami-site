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

The palette is orgami's own: the xterm-256 colours its terminal browser gives
each kind of node — repo, host, tool, service — used here as the only colour
that carries meaning. Monospace for headings, a serif for prose. The rail down
the left is the crease the name refers to, and it doubles as navigation.

Every section is footnoted with the file it describes (`lib/scan.sh`,
`lib/daily.jq`, `lib/tui.sh`). That is the tool's own rule: a claim you cannot
open and check does not belong in the output.

`src/styles/global.css` holds the whole token set. Light is the bare `:root`;
dark redefines the same variables under `prefers-color-scheme` and under
`[data-theme="dark"]`, so the toggle wins in both directions and a reader who
never touches it still gets their system's answer.

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
