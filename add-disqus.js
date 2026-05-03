#!/usr/bin/env node
/**
 * add-disqus.js
 *
 * Run this after creating a new blog post HTML file:
 *   node add-disqus.js                    ← processes all blog-*.html
 *   node add-disqus.js blog-my-post.html  ← processes a single file
 *
 * The script injects the Disqus comment section before the catalog strip
 * (or footer if no catalog strip exists). Already-patched files are skipped.
 */

const fs   = require('fs');
const path = require('path');

const DISQUS_BLOCK = `
<!-- COMMENTS -->
<section class="section">
  <div class="container" style="max-width:860px;">
    <div id="disqus_thread"></div>
    <script src="js/comments.js"></script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
  </div>
</section>

`;

// Insertion point priority: catalog strip > footer comment > footer tag
const MARKERS = [
  '<!-- CATALOG CTA STRIP -->',
  '\n<!-- CATALOG',
  '<!-- FOOTER -->',
  '<footer class="footer">',
  '<footer>',
];

function injectDisqus(file) {
  let src = fs.readFileSync(file, 'utf8');

  // Skip if already has Disqus
  if (src.includes('disqus_thread')) {
    console.log(`  already has Disqus — skipped: ${file}`);
    return false;
  }

  // Find earliest marker
  let insertAt = -1;
  for (const marker of MARKERS) {
    const idx = src.indexOf(marker);
    if (idx !== -1) { insertAt = idx; break; }
  }

  if (insertAt === -1) {
    console.log(`  ✗ no insertion point found — skipped: ${file}`);
    return false;
  }

  src = src.slice(0, insertAt) + DISQUS_BLOCK + src.slice(insertAt);
  fs.writeFileSync(file, src, 'utf8');
  console.log(`✓ Disqus added: ${file}`);
  return true;
}

// Determine target files
const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync('.').filter(f => f.startsWith('blog-') && f.endsWith('.html'));

let added = 0;
for (const file of targets) {
  if (!fs.existsSync(file)) { console.log(`  file not found: ${file}`); continue; }
  if (injectDisqus(file)) added++;
}

console.log(`\nDone — ${added} file(s) updated.`);
