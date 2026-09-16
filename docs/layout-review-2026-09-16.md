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

## Direct screenshot review follow-up

Opened all 16 live full-page screenshots as segmented contact sheets, covering
English and Chinese home, publication index, LNR article, and robot-chemist
project at 1440px and 390px. Evidence: `artifacts/layout-review/live/` and
`artifacts/visual-review/`. This is visual inspection of those eight routes,
not a claim that every route in the automated suite was visually inspected.

| Screenshots (each language, each width) | Visual finding and resolution |
| --- | --- |
| Home (4) | Readable responsive sections; publication status fix applies here too. |
| Publication index (4) | Duplicate LNR preprint links had identical URLs; retain one. Under-review class used underscores while CSS expected hyphens; normalize emitted class to restore orange status. |
| LNR article (4) | Remove duplicate preprint link; increase featured-image caption size and align left. |
| Robot-chemist project (4) | Prose table extended beyond desktop viewport; wrap three columns within desktop content width. On mobile retain local scrolling with a localized instruction, shown only when overflowing. |

Opened all 12 focused post-fix screenshots in `artifacts/visual-review/fixed/`.
Confirmed visible status distinction, single preprint link, readable captions,
complete desktop table columns, and mobile scrolling instructions. Focused
Playwright assertions also checked table overflow and hint visibility at both
widths in both languages.

Rebuilt production output. Full automated regression passed 115 cases with
zero failures (`artifacts/layout-review/visual-followup/audit.json`), and both
language interaction suites passed (`visual-followup-interactions/`). Translation
checks still use synthetic bilingual insertion; no installed-extension claim.

## Viewport-level detail review

After the user's request to prioritize local details, captured and directly
opened 38 unscaled browser-viewport screenshots (1440×900 and 390×900) in
`artifacts/visual-review/viewports/`. Each language/width covers identity,
education, research, news, publication-card text/buttons, project-card text,
contact section, article caption/body, and method figure; mobile also covers
the expanded navigation menu.

This exposed further issues hidden by full-page reduction: desktop timeline
ornaments crossed tag labels, narrow research headings split words and left
single Chinese characters, and mobile paper figures lacked a usable enlargement
route. Moved timeline ornaments into a dedicated left gutter, moved the research
heading above its prose, balanced project/contact headings, and provided localized
links to original images. Actual popup navigation loaded both language articles'
original figures; mobile tables were scrolled fully right and inspected.

Post-fix viewport captures are in `viewports-fixed/` and `viewports-final/`;
focused image-opening and table-scroll captures are in `detail-interactions/`.
The automated audit remains complementary to direct screenshot inspection.
