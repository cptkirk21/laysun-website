const fs = require('fs');

const BASE = 'https://laysun.co';

// Homepage review/rating schema is omitted until verified review data is available.


// ── 2. INTERNAL CTAs in blog posts ──────────────────────────────────────────

// CTA block template
function cta(heading, text, links) {
  const linkHtml = links.map(l =>
    `<a href="${l.href}" class="btn btn-primary" style="margin:.25rem .5rem .25rem 0;">${l.label}</a>`
  ).join('\n        ');
  return `
  <!-- INTERNAL CTA -->
  <div style="background:var(--green-pale,#f0f4ee);border-left:4px solid var(--green,#3a5c38);padding:1.5rem 1.75rem;margin:2.5rem 0;border-radius:0 8px 8px 0;">
    <p style="font-weight:700;font-size:1.05rem;margin:0 0 .4rem;">${heading}</p>
    <p style="margin:0 0 1rem;color:#555;font-size:.95rem;">${text}</p>
    ${linkHtml}
  </div>`;
}

const blogCTAs = {
  'blog-hotel-trends-2025.html': cta(
    'Ready to bring these trends to your hotel?',
    'LaySun supplies oversized palms, custom olive trees, and bespoke sculptural installations worldwide, with special-order fire-rating options available for select products.',
    [
      { href: 'solutions.html#hotels', label: 'Hotel Solutions' },
      { href: 'systems.html', label: 'Explore Systems' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-restaurant-green-walls.html': cta(
    'Transform your restaurant with an artificial green wall',
    'LaySun\'s modular living wall systems are zero maintenance, with special-order fire-rating options available for select products.',
    [
      { href: 'systems.html#green-walls', label: 'Green Wall Systems' },
      { href: 'solutions.html#restaurants', label: 'Restaurant Solutions' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-pe-vs-pvc.html': cta(
    'Every LaySun product uses premium PE foliage',
    'Browse our commercial artificial tree catalog, with factory-direct PE foliage and special-order fire-rating options available for select products.',
    [
      { href: 'products.html', label: 'View Product Catalogue' },
      { href: 'manufacturing.html', label: 'Our Manufacturing Process' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-biophilic-design.html': cta(
    'Add biophilic greenery to your office — zero maintenance',
    'LaySun supplies artificial trees and living walls for corporate offices, atriums, and reception areas worldwide, with special-order fire-rating options available for select products.',
    [
      { href: 'solutions.html#corporate', label: 'Corporate Solutions' },
      { href: 'systems.html', label: 'Explore Systems' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-outdoor-uv-guide.html': cta(
    'Looking for outdoor-rated artificial plants?',
    'LaySun\'s outdoor range is UV-stabilised and tested for commercial terrace, pool, and exterior installations.',
    [
      { href: 'products.html', label: 'View Product Catalogue' },
      { href: 'systems.html', label: 'Explore Systems' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-specifying-checklist.html': cta(
    'Need a supplier that ticks every box on this list?',
    'LaySun provides fire certification documentation, PE material grades, full size customisation, and factory-direct pricing.',
    [
      { href: 'products.html', label: 'View Product Catalogue' },
      { href: 'manufacturing.html', label: 'Our Quality Standards' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-nfpa701.html': cta(
    'Need NFPA 701-compliant artificial plants?',
    'Special-order fire-rating options are available for select products, with documentation supplied for the specified project or order.',
    [
      { href: 'manufacturing.html', label: 'Fire-Rating Process' },
      { href: 'products.html', label: 'View Product Catalogue' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  )
};

for (const [file, ctaHtml] of Object.entries(blogCTAs)) {
  if (!fs.existsSync(file)) { console.log(`  MISSING: ${file}`); continue; }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('INTERNAL CTA')) { console.log(`  SKIP (already has CTA): ${file}`); continue; }
  content = content.replace('</article>', ctaHtml + '\n</article>');
  fs.writeFileSync(file, content);
  console.log(`  ✓ Added internal CTA: ${file}`);
}

console.log('\n✓ All done');
