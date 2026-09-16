# Layout review — 2026-09-16

Reworked the bilingual homepage, publication/project collections, article
navigation and footer, typography, mobile navigation, and translation-safe text
flow. Removed 362 lines of superseded component CSS; shared layout rules now
live in `assets/css/layout.css`. Existing research text and publication status
fields were not rewritten.

Four review passes covered the initial structural changes, translation stress
failures, CSS cleanup/keyboard interactions, and the final Chinese font repair.
The narrow news disclosure overflow and unused article-sidebar clipping found
in the translation pass were repaired before release.

Final local production build: `hugo --minify` and Pagefind succeeded.
`git diff --check` and JavaScript syntax checks passed.

Final Playwright results (`artifacts/layout-review/release/audit.json`):

- 40 main English/Chinese routes; 115 viewport/translation/theme cases.
- Zero document overflow, visible text clipping, broken visible images, page
  JavaScript errors, or non-200 page responses in those cases.
- Screenshots cover desktop/mobile and representative translated/dark states.
- Both language interaction suites passed: search, language/theme switching,
  news and project disclosures, keyboard/mobile menu, anchors, copy-link
  feedback, and article-to-collection navigation.
- Actual rendered heading fonts verified with Chromium's platform-font API:
  Times New Roman for English; bundled Noto Serif CJK SC for Chinese.
- Desktop homepage height: 17,209px before, 10,359px after at 1440px width.

Translation coverage is synthetic DOM insertion, not an installed extension or
translation-service test. It covers appended and sibling translation nodes;
user-specific extension styles and settings remain a separate live review.

The older broad site audit found no broken internal links. Its attempts to play
three external HEAR videos received browser network errors in this environment;
a follow-up HTTP request to the Moka video returned 200. External video playback
is therefore not claimed as verified. Posters and page layout were checked.

See `layout-maintenance.md` for reproducing the audits and maintaining fonts.
