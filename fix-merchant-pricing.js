/**
 * fix-merchant-pricing.js
 * Fixes Google Search Console "missing price" merchant listing errors.
 * Adds tiered AggregateOffer JSON-LD + visible pricing section to all 4 collection pages.
 *
 * Run with: node fix-merchant-pricing.js
 *
 * Prices are competitive lower-end factory-direct B2B rates derived from
 * Alibaba/Made-in-China market research (May 2026). Edit COLLECTIONS below to adjust.
 */

const fs = require('fs');

const BASE = 'https://laysun.co';
const VALID_UNTIL = '2027-12-31';

// ── Per-collection pricing (lower-end competitive B2B, USD ex-works) ──────────
// tier1 = 1-9 units  |  tier2 = 10-99 units  |  tier3 = 100+ units
const COLLECTIONS = {
  'artificial-olive-trees.html': {
    label:   'Artificial Olive Trees',
    note:    'Starting prices for standard olive trees (3–7 ft). Larger styles and wide-canopy trees quoted on request.',
    tier1:   { qty: '1 – 9 units',   min: 1,   max: 9,  price: '89.00'  },
    tier2:   { qty: '10 – 99 units', min: 10,  max: 99, price: '71.00'  },
    tier3:   { qty: '100+ units',    min: 100,           price: '55.00'  },
  },
  'artificial-palm-trees.html': {
    label:   'Artificial Palm Trees',
    note:    'Starting prices for Queen Palms (4–7 ft). Fan Palms and double-trunk styles quoted on request.',
    tier1:   { qty: '1 – 9 units',   min: 1,   max: 9,  price: '149.00' },
    tier2:   { qty: '10 – 99 units', min: 10,  max: 99, price: '119.00' },
    tier3:   { qty: '100+ units',    min: 100,           price: '92.00'  },
  },
  'artificial-fiddle-leaf-fig.html': {
    label:   'Artificial Fiddle Leaf Fig & Ficus',
    note:    'Starting prices for curved-trunk fiddle leaf fig (4–5 ft). Real wood trunk and multi-branch styles quoted on request.',
    tier1:   { qty: '1 – 9 units',   min: 1,   max: 9,  price: '79.00'  },
    tier2:   { qty: '10 – 99 units', min: 10,  max: 99, price: '63.00'  },
    tier3:   { qty: '100+ units',    min: 100,           price: '49.00'  },
  },
  'artificial-flowering-trees.html': {
    label:   'Artificial Flowering Trees',
    note:    'Starting prices for camellia and hydrangea trees (2.5–5 ft). Cherry blossom and bougainvillea styles quoted on request.',
    tier1:   { qty: '1 – 9 units',   min: 1,   max: 9,  price: '45.00'  },
    tier2:   { qty: '10 – 99 units', min: 10,  max: 99, price: '36.00'  },
    tier3:   { qty: '100+ units',    min: 100,           price: '28.00'  },
  },
};
// ─────────────────────────────────────────────────────────────────────────────

const seller = { "@id": `${BASE}/#organization` };

function buildAggregateOffer(c) {
  return {
    "@type":         "AggregateOffer",
    "lowPrice":      c.tier3.price,
    "highPrice":     c.tier1.price,
    "priceCurrency": "USD",
    "offerCount":    "3",
    "availability":  "https://schema.org/InStock",
    "seller":        seller,
    "offers": [
      {
        "@type":           "Offer",
        "price":           c.tier1.price,
        "priceCurrency":   "USD",
        "priceValidUntil": VALID_UNTIL,
        "availability":    "https://schema.org/InStock",
        "itemCondition":   "https://schema.org/NewCondition",
        "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": c.tier1.min, "maxValue": c.tier1.max, "unitCode": "C62" }
      },
      {
        "@type":           "Offer",
        "price":           c.tier2.price,
        "priceCurrency":   "USD",
        "priceValidUntil": VALID_UNTIL,
        "availability":    "https://schema.org/InStock",
        "itemCondition":   "https://schema.org/NewCondition",
        "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": c.tier2.min, "maxValue": c.tier2.max, "unitCode": "C62" }
      },
      {
        "@type":           "Offer",
        "price":           c.tier3.price,
        "priceCurrency":   "USD",
        "priceValidUntil": VALID_UNTIL,
        "availability":    "https://schema.org/InStock",
        "itemCondition":   "https://schema.org/NewCondition",
        "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": c.tier3.min, "unitCode": "C62" }
      }
    ]
  };
}

function buildPricingSection(c) {
  const tiers = [c.tier1, c.tier2, c.tier3];
  const rows = tiers.map((t, i) => {
    const bg = i % 2 === 1 ? ' style="background:var(--cream-deep);"' : '';
    return `          <tr${bg}>
            <td style="border:1px solid var(--border);padding:10px 16px;font-size:.9rem;">${t.qty}</td>
            <td style="border:1px solid var(--border);padding:10px 16px;font-size:.9rem;font-weight:600;">From $${t.price} / unit</td>
          </tr>`;
  }).join('\n');

  return `
<!-- PRICING SECTION — added by fix-merchant-pricing.js -->
<section class="section section--alt" id="pricing">
  <div class="container">
    <div style="max-width:560px;margin:0 auto;text-align:center;">
      <span class="eyebrow">Factory-Direct</span>
      <h2 style="margin-bottom:.75rem;">Pricing</h2>
      <p style="color:var(--text-muted);margin-bottom:1.25rem;">All prices USD, ex-works Dongguan. Shipping quoted separately.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:1.25rem;">
        <thead>
          <tr style="background:var(--cream-deep);">
            <th style="border:1px solid var(--border);padding:10px 16px;text-align:left;font-size:.85rem;font-weight:600;">Order Quantity</th>
            <th style="border:1px solid var(--border);padding:10px 16px;text-align:left;font-size:.85rem;font-weight:600;">Unit Price (USD)</th>
          </tr>
        </thead>
        <tbody>
${rows}
        </tbody>
      </table>
      <p style="font-size:.82rem;color:var(--text-muted);">
        ${c.note}<br>
        <a href="quote.html" style="color:var(--tan);font-weight:600;">Request a quote for your project →</a>
      </p>
    </div>
  </div>
</section>

`;
}

// ── Process each file ─────────────────────────────────────────────────────────
let updated = 0;

for (const [file, config] of Object.entries(COLLECTIONS)) {
  if (!fs.existsSync(file)) { console.log(`  MISSING: ${file}`); continue; }

  let html = fs.readFileSync(file, 'utf8');

  // 1. Extract and parse the existing JSON-LD block
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ldMatch) { console.log(`  NO JSON-LD: ${file}`); continue; }

  let schema;
  try {
    schema = JSON.parse(ldMatch[1].trim());
  } catch (e) {
    console.log(`  PARSE ERROR in ${file}: ${e.message}`);
    continue;
  }

  // 2. Replace every bare Offer in hasPart with a tiered AggregateOffer
  if (!Array.isArray(schema.hasPart)) { console.log(`  NO hasPart in ${file}`); continue; }

  const offer = buildAggregateOffer(config);
  schema.hasPart = schema.hasPart.map(product => {
    if (product['@type'] === 'Product') product.offers = offer;
    return product;
  });

  // 3. Re-inject the updated JSON-LD
  const newBlock = `<script type="application/ld+json">\n  ${JSON.stringify(schema, null, 2).replace(/\n/g, '\n  ')}\n  </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, newBlock);

  // 4. Inject visible pricing section before <!-- PRODUCT GRID -->
  const gridAnchor = '<!-- PRODUCT GRID -->';
  if (html.includes('<!-- PRICING SECTION')) {
    // Already injected — replace it so prices stay in sync with JSON-LD
    html = html.replace(/\n<!-- PRICING SECTION[\s\S]*?<\/section>\n\n/, '\n' + buildPricingSection(config));
    console.log(`  Re-synced pricing section: ${file}`);
  } else if (html.includes(gridAnchor)) {
    html = html.replace(gridAnchor, buildPricingSection(config) + gridAnchor);
    console.log(`  Updated: ${file}`);
  } else {
    console.log(`  WARNING: grid anchor not found — JSON-LD updated but pricing section skipped: ${file}`);
    fs.writeFileSync(file, html, 'utf8');
    updated++;
    continue;
  }

  fs.writeFileSync(file, html, 'utf8');
  updated++;
}

console.log(`\n✓ Done — ${updated} / ${Object.keys(COLLECTIONS).length} files updated`);
console.log('\nNext steps:');
console.log('  1. Open each page in a browser — check the pricing table looks right');
console.log('  2. Adjust prices in the COLLECTIONS block above if needed, re-run to sync');
console.log('  3. Push to GitHub Pages, then purge Cloudflare cache for all 4 URLs');
console.log('  4. Validate at https://search.google.com/test/rich-results');
console.log('  5. In Search Console → URL Inspection → Request Indexing for each page');
