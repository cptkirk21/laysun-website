const fs = require('fs');

const BASE = 'https://laysun.co';

// ── 1. REVIEW SCHEMA on index.html ──────────────────────────────────────────

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  "name": "LaySun",
  "review": [
    {
      "@type": "Review",
      "reviewBody": "We installed LaySun olive trees in our lobby 18 months ago. They still look exactly like day one. Zero maintenance. Our guests constantly ask if they're real.",
      "author": { "@type": "Person", "name": "General Manager" },
      "publisher": { "@type": "Organization", "name": "Luxury Hotel, Los Angeles" }
    },
    {
      "@type": "Review",
      "reviewBody": "The green wall in our main dining room transformed the entire atmosphere. Customers choose that side of the room every time. Incredible product.",
      "author": { "@type": "Person", "name": "Head of Design" },
      "publisher": { "@type": "Organization", "name": "Restaurant Group, Dubai" }
    },
    {
      "@type": "Review",
      "reviewBody": "Factory-direct pricing saved us 40% versus our previous supplier. Quality is noticeably better. LaySun is now our go-to for every project.",
      "author": { "@type": "Person", "name": "Procurement Director" },
      "publisher": { "@type": "Organization", "name": "Interior Design Firm, Singapore" }
    }
  ]
};

let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(reviewSchema, null, 2)}\n  </script>\n</head>`);
fs.writeFileSync('index.html', idx);
console.log('✓ Added Review schema to index.html');


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
    'LaySun supplies oversized palms, custom olive trees, and bespoke sculptural installations — factory direct, fire-rated, worldwide.',
    [
      { href: 'solutions.html#hotels', label: 'Hotel Solutions' },
      { href: 'systems.html', label: 'Explore Systems' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-restaurant-green-walls.html': cta(
    'Transform your restaurant with an artificial green wall',
    'LaySun\'s modular living wall systems are fire-rated, zero maintenance, and installed in restaurants worldwide.',
    [
      { href: 'systems.html#green-walls', label: 'Green Wall Systems' },
      { href: 'solutions.html#restaurants', label: 'Restaurant Solutions' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-pe-vs-pvc.html': cta(
    'Every LaySun product uses premium PE foliage',
    'Browse our full catalogue of commercial artificial trees — all manufactured in our own facility with PE foliage and fire-rated finishes.',
    [
      { href: 'products.html', label: 'View Product Catalogue' },
      { href: 'manufacturing.html', label: 'Our Manufacturing Process' },
      { href: 'quote.html', label: 'Request a Quote →' }
    ]
  ),
  'blog-biophilic-design.html': cta(
    'Add biophilic greenery to your office — zero maintenance',
    'LaySun supplies fire-rated artificial trees and living walls for corporate offices, atriums, and reception areas worldwide.',
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
    'Every LaySun product is fire-treated and supplied with certification documentation for US, EU, and international compliance.',
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
