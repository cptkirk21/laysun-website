/**
 * process-hero.js
 * Generates the green-wall collection hero image variants from a source image.
 *
 * Usage:
 *   1. Save the hero photo anywhere (e.g. images/green-wall-hero-src.png)
 *   2. node process-hero.js [path-to-source]
 *      (defaults to images/green-wall-hero-src.png)
 *
 * Emits: green-wall-hero.webp (1600w), -800w, -400w into images/
 */
const sharp = require('C:\\Users\\Shawn\\Desktop\\laysun-website\\node_modules\\sharp');
const path = require('path');

const src = process.argv[2] || path.join(__dirname, 'images', 'green-wall-hero-src.png');
const DEST = path.join(__dirname, 'images');
const variants = [
  [1600, 'green-wall-hero.webp'],
  [800, 'green-wall-hero-800w.webp'],
  [400, 'green-wall-hero-400w.webp'],
];

(async () => {
  for (const [w, out] of variants) {
    await sharp(src).resize(w).webp({ quality: 82 }).toFile(path.join(DEST, out));
    console.log('✓', out);
  }
  console.log('\nDone. Hero variants written to images/.');
})().catch(e => { console.error('✗ Failed:', e.message); process.exit(1); });
