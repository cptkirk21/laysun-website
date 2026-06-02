/**
 * add-greenwall-links.js
 * Site-wide, idempotent edits for the new green-wall collection:
 *  - adds "Green Walls" to the Products nav dropdown
 *  - adds "Green Walls" to the footer Collections list
 *  - bumps the catalog product count 44 -> 54 (catalog strip + meta)
 *  - repoints the products.html collection chip to the new page
 *
 * Run with: node add-greenwall-links.js
 */
const fs = require('fs');
const path = require('path');

const NAV_OLD  = '<li><a href="artificial-flowering-trees.html">Flowering Trees</a></li></ul></li>';
const NAV_NEW  = '<li><a href="artificial-flowering-trees.html">Flowering Trees</a></li><li><a href="artificial-green-walls.html">Green Walls</a></li></ul></li>';
const FOOT_OLD = '<li><a href="artificial-flowering-trees.html">Flowering Trees</a></li></ul></div>';
const FOOT_NEW = '<li><a href="artificial-flowering-trees.html">Flowering Trees</a></li><li><a href="artificial-green-walls.html">Green Walls</a></li></ul></div>';

const replacements = [
  ['nav',          NAV_OLD, NAV_NEW],
  ['footer',       FOOT_OLD, FOOT_NEW],
  ['strip-count',  '44 Products', '54 Products'],
  ['meta-count',   'all 44 products', 'all 54 products'],
  // Note: the products.html collection chip was repointed to artificial-green-walls.html
  // separately. We intentionally do NOT globally rewrite systems.html#green-walls links,
  // since editorial/body links elsewhere deliberately point to the Systems page section.
];

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
const report = [];
for (const f of files) {
  let s = fs.readFileSync(path.join(__dirname, f), 'utf8');
  const orig = s;
  const changed = [];
  for (const [label, oldStr, newStr] of replacements) {
    if (s.includes(oldStr)) { s = s.split(oldStr).join(newStr); changed.push(label); }
  }
  if (s !== orig) { fs.writeFileSync(path.join(__dirname, f), s, 'utf8'); report.push(`${f.padEnd(40)} ${changed.join(', ')}`); }
}
console.log(report.length ? report.join('\n') : 'No changes.');
console.log(`\n${report.length} files updated.`);
