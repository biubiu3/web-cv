import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputRoot = join(root, 'artifacts', 'publication-covers');
const covers = [
  ['hear', 'hear-integrated-text-v6.png'],
  ['tgl', 'tgl-integrated-text-v2.png'],
  ['mrasfm', 'mrasfm-integrated-text-v2.png'],
  ['vcgs-slam', 'vcgs-slam-integrated-text-v1.png'],
  ['mid', 'mid-integrated-text-v2.png'],
  ['diffsac', 'diffsac-integrated-text-v2.png'],
  ['ermv', 'ermv-integrated-text-v2.png'],
  ['movsam', 'movsam-integrated-text-v2.png'],
  ['rlsac', 'rlsac-integrated-text-v2.png'],
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
