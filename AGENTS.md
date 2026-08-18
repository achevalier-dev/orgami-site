# orgami-site

The landing page for orgami. Astro 7, Tailwind 4, static output, no client
framework. `npm run dev` serves it; `npm run build` writes `dist/`.

## The rules this page keeps

- **Every terminal block is real output.** Nothing on the page is a mockup. New
  examples come from an actual run against a public organization — never a
  client's, because repository names and hostnames end up in every frame.
- **Colour means something.** The palette is orgami's own xterm-256 set, and the
  four kind colours (repo, host, tool, service) are used only for those kinds.
  Decorative colour belongs nowhere on this page.
- **Sections carry their source.** The `.src` footnote under a section names the
  file that implements what the section claims. If a claim has no file behind
  it, cut the claim.
- **Tokens, not literals.** Colours come from the CSS variables in
  `src/styles/global.css`, which are mapped into Tailwind through `@theme inline`.
  A colour written directly into a media or `[data-theme]` block will not apply
  in the un-stamped state and breaks one of the themes.
- **No client framework, and nothing that ships JavaScript to do what CSS can.**
  The three scripts here — theme, rail, copy buttons — are inline and small.

## Checking a change

```bash
npm run build && npm run preview
npx playwright@latest install chromium   # once
npm run shots
```

`npm run shots` writes a full-page screenshot per theme and at phone width, and
fails on any console error. Playwright is intentionally not a dependency.

## Commits

Conventional commits, present tense, small. The subject says what changed; the
body says why it was worth changing.
