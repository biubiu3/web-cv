# TGL arXiv v2 synchronization — 2026-09-18

## Sources and scope

- Paper: https://arxiv.org/html/2608.17209v2 (title and author list checked against the publication record).
- Project website: https://tgl.changnie.top/ (copy, cover, code link, and Figure 1).
- Updated English and Chinese publication pages, homepage summaries, author biography mentions, and machine-readable site summaries.
- Existing T-RO review status is retained; the arXiv revision does not establish a journal decision.

## Corrections

- Replaced v1 links and early mechanism-only experimental description with the v2 framing and Table I/II results. Kept benchmark results separate from the small controlled studies.
- Defined training-free at task acquisition, identified GPT-6 Astra and Codex, explained teaching as an accelerator, and preserved scope/verification requirements.
- Marked scaling curves as hypothetical, cost curves as conditional, and distillation/fleet sharing as proposed extensions.
- Replaced the prior cover and five legacy body assets; added the previously missing complete loop (Figure 2). Updated the cover-copy script so regeneration preserves the new source.
- arXiv HTML exposes a missing-image placeholder for Figure 1; the corresponding project-site image is used. Figures 2–6 are direct arXiv v2 downloads. All imported assets remain unmodified.
- Corrected the machine-readable summary's old unqualified “0% to 67%” claim to the separately reported benchmark means; retained exact pilot counts and scope in the article.

## Imported assets

- `content/publications/tgl/fig1-v2.webp`
  - Source: https://tgl.changnie.top/assets/figures/fig1.webp
  - SHA-256: `d5b63459129541727cee676e4286372df6d7a922d7885511c781c77a2453767a`
- `content/publications/tgl/fig2-v2.png`
  - Source: https://arxiv.org/html/2608.17209v2/fig2.png
  - SHA-256: `10fe9ba2b5f0535dc4d32639942016266863689dc15a978f4df2d8ae2be4dd12`
- `content/publications/tgl/fig3-v2.png`
  - Source: https://arxiv.org/html/2608.17209v2/fig3.png
  - SHA-256: `33e21939863dfd7cd34eeaf265d30438a29abbdbf337c89897fe889230e0c400`
- `content/publications/tgl/fig4-v2.png`
  - Source: https://arxiv.org/html/2608.17209v2/fig4.png
  - SHA-256: `3a83d38f3f4c4fb4ec73a7497f01ed91eb73c3ba788f55cb7ff6f1a34a82f53b`
- `content/publications/tgl/fig5-v2.png`
  - Source: https://arxiv.org/html/2608.17209v2/fig5.png
  - SHA-256: `3577b6d59bbab4a9ae9981c4264d52ca12e1faf381f8fabeb1e9b028d829dcbc`
- `content/publications/tgl/fig6-v2.png`
  - Source: https://arxiv.org/html/2608.17209v2/fig6.png
  - SHA-256: `682b7b7057bf5575a48c3446c924c04956a5be0bbd9bceabe47523be8450647d`
- `assets/media/paper-covers/tgl-project-v2-20260918.png`
  - Source: https://tgl.changnie.top/assets/brand/tgl-cover-v4.png
  - SHA-256: `d529c0ae950ec46401daa7caee87cb8e434b08d3027036423a39f7ddcdc18a5b`

## Validation

- `pnpm run build`: Hugo production build and bilingual Pagefind indexing passed.
- Playwright: English/Chinese home, publication listing, and TGL detail at 1440px and 390px (12 checks); no page errors, horizontal overflow, or broken images. Each detail page displays six new figures and the v2/project/code links.
- Screenshots and machine-readable checks: `artifacts/tgl-v2-review/` (ignored build evidence).
