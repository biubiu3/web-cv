# TGL PDF figures and method-led copy — 2026-09-18

This revision supersedes the image imports and results-led copy in `tgl-v2-update-2026-09-18.md`.

## Editorial direction

English and Chinese copy follows the reviewed project website at https://tgl.changnie.top/ and https://tgl.changnie.top/zh/. The page centers sparse teaching, current-scene grounding, physical verification, Skill Library / Experience Memory, and integration with robot tools and learned policies. Benchmark percentages, rankings, detailed tables, and pilot counts have been removed from page summaries, body copy, and machine-readable summaries. A short closing section links readers to the paper for experiments. Public link labels say arXiv without a revision label.

## Figures

All six body figures are rendered directly from the published PDF, including vector text, paths, embedded images, and their final compositing. They do not use the arXiv HTML image exports. The promotional cover remains the project website's cover, separate from the six paper figures.

PDF source: https://arxiv.org/pdf/2608.17209v2

PDF SHA-256: `e708f460cd2d746c73df51d85c1cb7faad5e981e95bacff93f9f41fc3236e701`

- `content/publications/tgl/fig1-pdf.png`: page 1, clip [311.978, 175.621, 563.018, 363.901] PDF points, 420 dpi, 1466 × 1099; SHA-256 `ceae391dd761c6d7914f8149336316c08d91a6668a77963205056a2a65719fe7`.
- `content/publications/tgl/fig2-pdf.png`: page 3, clip [48, 57, 565, 311] PDF points, 360 dpi, 2585 × 1270; SHA-256 `c7cc5d114cf55f95f7ad629319a3100ce39850a24aa87f3709986c5698b25a89`.
- `content/publications/tgl/fig3-pdf.png`: page 6, clip [48, 57, 565, 309] PDF points, 360 dpi, 2585 × 1260; SHA-256 `9af587ea82c347997d0f33b7230cbe6e9224a0690fb3cd45cece05dbc79a1f54`.
- `content/publications/tgl/fig4-pdf.png`: page 8, clip [48, 57, 565, 322] PDF points, 360 dpi, 2585 × 1325; SHA-256 `77209da47581b4c23eca088917ba4624c7e5e0554e1151cdf38c8535026eaa3a`.
- `content/publications/tgl/fig5-pdf.png`: page 15, clip [48, 57, 565, 321] PDF points, 360 dpi, 2585 × 1320; SHA-256 `655d07935d544c3be02164763c5c3650b26eff84f22ee1e801f8bb088e10db52`.
- `content/publications/tgl/fig6-pdf.png`: page 16, clip [48, 57, 565, 322] PDF points, 360 dpi, 2585 × 1325; SHA-256 `eb6f079097e2197e0fef9a123303315ff0dfb770c4abea4b5bbba7613c9e2f09`.

## Validation

- Production Hugo build and bilingual Pagefind indexing passed.
- Twelve Playwright checks cover English and Chinese home, publication list, and TGL detail pages at desktop/mobile widths. No broken images, page errors, or horizontal page overflow; each detail page loads six PDF-rendered figures.
- Checks reject version labels and highlighted benchmark/pilot numbers in TGL detail copy.
- Extraction script, figure hashes, and page screenshots are in `artifacts/tgl-pdf-review/` (ignored local evidence).
