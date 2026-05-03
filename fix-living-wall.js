const fs = require('fs');

// [file, oldText, newText]
const replacements = [

  // ── index.html ──────────────────────────────────────────────────────────────
  ['index.html',
    'alt="Artificial living wall system with lush green moss panels"',
    'alt="Artificial green wall system with lush green moss panels"'],
  ['index.html',
    '<h3>Living Wall Systems</h3>',
    '<h3>Artificial Green Wall Systems</h3>'],
  ['index.html',
    'full green-wall installations for corporate offices',
    'full artificial green wall installations for corporate offices'],

  // ── systems.html ─────────────────────────────────────────────────────────────
  ['systems.html',
    '"description": "Indoor trees, living walls, potted collections, hedges, and custom installations for commercial spaces.",',
    '"description": "Indoor trees, artificial green walls, potted collections, hedges, and custom installations for commercial spaces.",'],
  ['systems.html',
    '"name": "Living Wall Systems"',
    '"name": "Artificial Green Wall Systems"'],
  ['systems.html',
    'content="LaySun artificial plant systems — indoor trees, living walls, potted collections, hedges, and custom installations for commercial spaces."',
    'content="LaySun artificial plant systems — indoor trees, artificial green walls, potted collections, hedges, and custom installations for commercial spaces."'],
  ['systems.html',
    '<h2>Living Wall &amp; Green Panel Systems</h2>',
    '<h2>Artificial Green Wall Systems</h2>'],

  // ── products.html ─────────────────────────────────────────────────────────────
  ['products.html',
    '"name": "Artificial Living Wall Panels"',
    '"name": "Artificial Green Wall Panels"'],

  // ── blog-restaurant-green-walls.html ─────────────────────────────────────────
  ['blog-restaurant-green-walls.html',
    "LaySun's modular living wall systems are fire-rated, zero maintenance, and installed in restaurants worldwide.",
    "LaySun's modular artificial green wall systems are fire-rated, zero maintenance, and installed in restaurants worldwide."],

  // ── blog-biophilic-design.html ───────────────────────────────────────────────
  ['blog-biophilic-design.html',
    'LaySun supplies fire-rated artificial trees and living walls for corporate offices, atriums, and reception areas worldwide.',
    'LaySun supplies fire-rated artificial trees and artificial green walls for corporate offices, atriums, and reception areas worldwide.'],
];

let totalChanges = 0;
for (const [file, oldText, newText] of replacements) {
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes(oldText)) {
    src = src.replace(oldText, newText);
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✓ ${file}`);
    totalChanges++;
  } else {
    console.log(`  NO MATCH: ${file} — "${oldText.slice(0, 60)}..."`);
  }
}

console.log(`\nDone — ${totalChanges}/${replacements.length} replacements applied.`);
