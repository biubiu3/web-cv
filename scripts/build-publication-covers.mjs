import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourcePath = join(
  root,
  'assets',
  'media',
  'paper-covers',
  'hear-integrated-text-v6.png',
);
const coverPath = join(root, 'content', 'publications', 'hear', 'featured.png');
const outputRoot = join(root, 'artifacts', 'publication-covers');
const reviewPath = join(outputRoot, 'hear-integrated-text-sample.png');

mkdirSync(outputRoot, { recursive: true });
copyFileSync(sourcePath, coverPath);
copyFileSync(sourcePath, reviewPath);

console.log(`Copied the native HEAR image-with-text to ${coverPath}`);
