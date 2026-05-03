const fs = require('fs');
const path = require('path');

// Files already manually updated
const skip = new Set(['index.html', 'quote.html', 'laysun-catalog-2026.html']);

const CATALOG_STRIP = `
<!-- CATALOG CTA STRIP -->
<div class="catalog-strip">
  <div class="container">
    <div class="catalog-strip-inner">
      <div>
        <span class="eyebrow">2026 Product Catalog</span>
        <h3>44 Products · Full SKU Specs · B2B Pricing</h3>
        <p>Browse every size, SKU variant and volume price tier — ready to share with your team or include in your quote request.</p>
      </div>
      <a href="laysun-catalog-2026.html" class="btn btn-tan btn-lg" style="white-space:nowrap;flex-shrink:0;">Download Catalog →</a>
    </div>
  </div>
</div>

`;

const CATALOG_FOOTER_LINK = `<li><a href="laysun-catalog-2026.html" class="footer-catalog-link">2026 Product Catalog ↗</a></li>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !skip.has(f));

let updated = 0;
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  if (!src.includes('<footer') || src.length < 500) continue; // skip empty/no-footer files

  let changed = false;

  // 1. Add catalog strip before <!-- FOOTER --> or <footer (whichever comes first)
  if (!src.includes('catalog-strip')) {
    const markerComment = '<!-- FOOTER -->';
    const markerTag = '<footer class="footer">';
    if (src.includes(markerComment)) {
      src = src.replace(markerComment, CATALOG_STRIP + markerComment);
      changed = true;
    } else if (src.includes(markerTag)) {
      src = src.replace(markerTag, CATALOG_STRIP + markerTag);
      changed = true;
    }
  }

  // 2. Add catalog link at top of footer Support list
  if (!src.includes('footer-catalog-link')) {
    // Pattern A: Support column with quote + contact Us
    const patternA = `<li><a href="quote.html">Request a Quote</a></li><li><a href="contact.html">Contact Us</a></li>`;
    const patternAFull = `<li><a href="quote.html">Request a Quote</a></li>\n          <li><a href="contact.html">Contact Us</a></li>`;

    if (src.includes(patternA)) {
      src = src.replace(patternA, `${CATALOG_FOOTER_LINK}<li><a href="quote.html">Request a Quote</a></li><li><a href="contact.html">Contact Us</a></li>`);
      changed = true;
    } else if (src.includes(patternAFull)) {
      src = src.replace(patternAFull, `${CATALOG_FOOTER_LINK}\n          <li><a href="quote.html">Request a Quote</a></li>\n          <li><a href="contact.html">Contact Us</a></li>`);
      changed = true;
    } else {
      // Pattern B: multi-line format from index-style footers
      const patternB = `<li><a href="quote.html">Request a Quote</a></li>`;
      if (src.includes(patternB) && src.includes('<footer')) {
        // Only inject once, in the footer Support section context
        const footerStart = src.indexOf('<footer');
        const footerSection = src.indexOf(patternB, footerStart);
        if (footerSection !== -1) {
          src = src.slice(0, footerSection) + CATALOG_FOOTER_LINK + src.slice(footerSection);
          changed = true;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✓ Updated: ${file}`);
    updated++;
  } else {
    console.log(`  Skipped (no match or already done): ${file}`);
  }
}

console.log(`\nDone — ${updated} files updated.`);
