import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputRoot = join(root, 'artifacts', 'publication-covers');
const covers = [
  ['hear', 'hear-editorial-20260916.png'],
  ['tgl', 'tgl-project-v2-20260918.png'],
  ['mrasfm', 'mrasfm-refined-20260916.png'],
  ['vcgs-slam', 'vcgs-slam-refined-20260916.png'],
  ['mid', 'mid-editorial-20260916.png'],
  ['diffsac', 'diffsac-editorial-20260916.png'],
  ['ermv', 'ermv-editorial-20260916.png'],
  ['movsam', 'movsam-editorial-20260916.png'],
  ['rlsac', 'rlsac-editorial-20260916.png'],
  ['dtfi', 'dtfi-editorial-20260916.png'],
  ['lnr', 'lnr-editorial-20260916.png'],
];

mkdirSync(outputRoot, { recursive: true });

for (const [slug, filename] of covers) {
  const sourcePath = join(root, 'assets', 'media', 'paper-covers', filename);
  const coverPath = join(root, 'content', 'publications', slug, 'featured.png');
  const reviewPath = join(outputRoot, `${slug}-integrated-text.png`);

  copyFileSync(sourcePath, coverPath);
  copyFileSync(sourcePath, reviewPath);
  console.log(`Copied native ${slug} image-with-text to ${coverPath}`);
}
