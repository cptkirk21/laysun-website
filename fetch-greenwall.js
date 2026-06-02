/**
 * fetch-greenwall.js
 * Downloads the 10 green-wall PRODUCT packshots (no lifestyle photos) and
 * writes 800x800 + 400w webp variants into images/, matching the repo convention.
 *
 * Run from this folder with: node fetch-greenwall.js
 * (sharp resolved from the sibling laysun-website install)
 */
const sharp = require('C:\\Users\\Shawn\\Desktop\\laysun-website\\node_modules\\sharp');
const path = require('path');

const CDN = 'https://www.bloomingartificial.co.uk/cdn/shop/files/';
const DEST = path.join(__dirname, 'images');

// Product packshots only — lifestyle/room scenes deliberately excluded.
const items = [
  { file: 'faux-dark-green-moss-green-wall.jpg',          out: 'prod-greenwall-moss' },
  { file: 'artificial-woodland-greens-green-wall.jpg',    out: 'prod-greenwall-woodland' },
  { file: 'faux-vibrant-medley-2.jpg',                    out: 'prod-greenwall-vibrant-medley' },
  { file: 'artificial-garden-foliage-mat.jpg',            out: 'prod-greenwall-garden-foliage' },
  { file: 'faux-fern-foliage-green-wall.jpg',             out: 'prod-greenwall-fern' },
  { file: 'faux-wildflower-green-wall.jpg',               out: 'prod-greenwall-wildflower' },
  { file: 'faux-mystic-medley-green-wall-3.jpg',          out: 'prod-greenwall-mystic-medley' },
  { file: 'faux-tropical-green-wall.jpg',                 out: 'prod-greenwall-tropical' },
  { file: 'faux-galaxy-green-wall.jpg',                   out: 'prod-greenwall-galaxy' },
  { file: 'artificial-forest-greens-living-wall.jpg',     out: 'prod-greenwall-forest-greens' },
];

async function run() {
  let ok = 0, fail = 0;
  for (const it of items) {
    const url = `${CDN}${it.file}?width=1600`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());

      await sharp(buf).rotate().resize(800, 800, { fit: 'cover', position: 'centre' })
        .webp({ quality: 82 }).toFile(path.join(DEST, `${it.out}.webp`));
      await sharp(buf).rotate().resize(400, 400, { fit: 'cover', position: 'centre' })
        .webp({ quality: 80 }).toFile(path.join(DEST, `${it.out}-400w.webp`));

      console.log('✓', it.out, `(${(buf.length / 1024).toFixed(0)} KB source)`);
      ok++;
    } catch (e) {
      console.error('✗', it.file, '—', e.message);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} OK, ${fail} failed`);
}

run();
