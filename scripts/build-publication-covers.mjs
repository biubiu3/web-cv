import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputRoot = join(root, 'artifacts', 'publication-covers');
const covers = [
  ['hear', 'hear-editorial-20260915.png'],
  ['tgl', 'tgl-editorial-20260915.png'],
  ['mrasfm', 'mrasfm-editorial-20260915.png'],
  ['vcgs-slam', 'vcgs-slam-editorial-20260915.png'],
  ['mid', 'mid-editorial-20260915.png'],
  ['diffsac', 'diffsac-editorial-20260915.png'],
  ['ermv', 'ermv-editorial-20260915.png'],
  ['movsam', 'movsam-editorial-20260915.png'],
  ['rlsac', 'rlsac-editorial-20260915.png'],
  ['dtfi', 'dtfi-editorial-20260915.png'],
  ['lnr', 'lnr-editorial-20260915.png'],
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
