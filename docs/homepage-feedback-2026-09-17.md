# Homepage feedback — 2026-09-17

- Both language profiles now explicitly identify the final PhD year. Education
  contains only the doctorate; former institutions were also removed from the
  structured profile and public LLM summaries.
- The requested research phrase is `AI Agent Robotics Systems`, with a matching
  Chinese phrase. Publication metadata uses `Journal / Conference` / `期刊 / 会议`.
- Both listing orders are TGL, HEAR, ERMV, VCGS-SLAM, MRASfM, MovSAM, MID, LNR,
  DiffSAC, RLSAC, DTFI. MID placement follows the user's clarification. The
  homepage continues to show the first six; the directory shows all eleven.
- All six homepage project cards now display compact collaborator logos and
  names, reusing existing confirmed project relationships and logo assets.
- Live Chromium inspection did not reproduce an entirely blue video section:
  light-mode background was rgb(237, 247, 251), and all three posters appeared.
  The old player had a dark fallback surface. Independent local preview images
  now remain visible until playback succeeds, with localized failure/timeout
  feedback and direct video links. Dark-mode section backgrounds remain dark
  by design; previews are visible in both modes.

## Validation

Production Hugo/Pagefind build passed. Focused Playwright checks cover both
languages, 1440px/390px viewports, identity, education, complete publication
order, collaborator assets, light/dark previews and forced external-video failure.
Local evidence: `artifacts/feedback-review/local/`. Opened viewport screenshots
directly for typography, card spacing, logos, video previews and failure UI.

Playback UI success was checked with a local MP4 fixture, not presented as proof
of availability of the external HEAR service. Synthetic translated labels were
checked at 320px, 768px and 1440px without document overflow. The broader existing
audit was interrupted by the local preview process ending; it is not reported as
a completed pass for this change. Focused checks are the validation for this release.
