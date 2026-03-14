const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  // ── 1. FAVICON: replace old favicon.png reference ──────────────────────────
  html = html.replace(
    /<link rel="icon" href="favicon\.png" type="image\/png">/g,
    '<link rel="icon" href="images/logo.webp" type="image/webp">'
  );

  // ── 2. NAV LOGO: add logo image before the text span ───────────────────────
  // Handles both href="index.html" and href="../index.html" etc.
  html = html.replace(
    /(<a [^>]*class="nav-logo"[^>]*>)\s*\n(\s*)(<span class="nav-logo-text">)/g,
    '$1\n$2<img src="images/logo.webp" alt="LaySun logo" width="32" height="32" loading="eager" style="display:inline-block;vertical-align:middle;">\n$2$3'
  );
  // Also handle compact (same-line) nav-logo with no newline before span
  html = html.replace(
    /(<a [^>]*class="nav-logo"[^>]*>)(<span class="nav-logo-text">)/g,
    '$1<img src="images/logo.webp" alt="LaySun logo" width="32" height="32" loading="eager" style="display:inline-block;vertical-align:middle;">$2'
  );

  // ── 3. FOOTER: fix "<div <div class="footer-col">" ─────────────────────────
  html = html.replace(/<div <div class="footer-col">/g, '<div class="footer-col">');

  // ── 4. FOOTER: fix orphaned "      class="footer-col">" (missing opening <div) ─
  // This line appears as standalone, preceded by whitespace only
  html = html.replace(/^(\s*)class="footer-col">$/gm, '$1<div class="footer-col">');

  if (html !== orig) {
    fs.writeFileSync(fp, html);
    console.log(`  ✓ ${file}`);
    updated++;
  }
}

console.log(`\nDone — updated ${updated} / ${files.length} files`);
