# Responsive layout and translation compatibility

The shared layout lives in `assets/css/layout.css`, loaded after the theme and
case-study styles by the fingerprinted `head-end/layout.html` hook. Biography
markup lives in `hbx/blocks/profile/block.html` and reads the existing bilingual
author data. Avoid coupling new biography rules to upstream Tailwind class names.

The homepage shows six papers in the existing `homepage_order`, with an explicit
link to all eleven papers. Project cards expose the original technical facts in
native `details` elements; the project pages retain their complete content.
Images use aspect ratios, but text containers have natural height. Grid tracks
must allow shrinking (`minmax(0, 1fr)`), and tags and navigation must wrap.
Do not apply descendant span rules to labels: translation extensions insert
nested spans/fonts and may accidentally inherit badge decoration.

The article template omits the theme's unused documentation sidebar and offers
collection and profile return links. The footer avoids repeating the full author
biography. `layout.js` measures the actual header for anchor spacing and gives
the mobile checkbox menu keyboard and ARIA behavior.

## Reproduce browser checks

Build with `pnpm run build`, then serve `public` under `/web-cv/`, for example by
symlinking it into a temporary server root. The default audit URL is
`http://127.0.0.1:4176/web-cv/`; override it with `SITE_URL` (trailing slash).

```sh
AUDIT_LABEL=review pnpm run audit:layout
```

Playwright checks 40 English/Chinese main routes at desktop/mobile widths, then
representative pages at 320, 768, 1024 and 1440 CSS pixels with inserted bilingual
text. It also checks dark appearance and sibling translation nodes. Screenshots
and JSON reports are written to ignored `artifacts/layout-review/` directories.
The interaction suite asserts search results, language switching, theme switching,
news/project disclosures, keyboard/mobile navigation, anchor positions, copy-link
feedback, and collection navigation. A 720 CSS-pixel screenshot represents the
reflow width of a 1440px desktop at 200% zoom; it is not a browser zoom API test.

Translation tests use synthetic DOM nodes resembling extension output, including
longer Chinese text. They do **not** install Immersive Translate or invoke a
translation provider, and do not prove compatibility with every extension mode.
Closed disclosure content is excluded from visible clipping checks. Figures,
formulae and tables keep intentional local scrolling rather than forcing the
whole document to scroll horizontally.

External HEAR video playback depends on its remote host. This layout uses posters
and user-initiated playback (`preload="none"`) instead of downloading video during
page load. The layout audit does not treat a loaded poster as proof of playback.

Chinese glyphs use bundled Noto Serif CJK SC subsets (Songti style), with Times New
Roman retained for Latin text. The WOFF2 files contain non-Latin characters from
`content`, `data`, `layouts` and `config`; additional translated characters fall
back to installed Songti/Noto Serif/SimSun. Font source: NotoSerifCJK Regular/Bold,
SC collection index 2, subset with fontTools. The distribution license is stored
alongside the font assets. Regenerate subsets when adding new Chinese content.
