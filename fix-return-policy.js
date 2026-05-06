/**
 * fix-return-policy.js
 * Adds hasMerchantReturnPolicy to every Offer and AggregateOffer in the
 * 4 product collection pages — fixes the Google Search Console warning:
 * "Missing field 'hasMerchantReturnPolicy'"
 *
 * Policy: All sales final (B2B). Defective items only: seller covers return
 * shipping and provides label. See https://laysun.co/returns-policy
 *
 * Run with: node fix-return-policy.js
 */

const fs = require('fs');

const FILES = [
  'artificial-olive-trees.html',
  'artificial-palm-trees.html',
  'artificial-fiddle-leaf-fig.html',
  'artificial-flowering-trees.html',
  'products.html',
];

const RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
  "merchantReturnLink": "https://laysun.co/returns-policy",
  "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
  "returnMethod": "https://schema.org/ReturnByMail",
  "itemDefectReturnFees": "https://schema.org/ReturnFeesSellerResponsibility",
  "itemDefectReturnLabelSource": "https://schema.org/SellerProvidesReturnLabel",
  "inStoreReturnsNotAllowed": true
};

function addReturnPolicy(node) {
  if (!node || typeof node !== 'object') return;

  if (node['@type'] === 'Offer' || node['@type'] === 'AggregateOffer') {
    node.hasMerchantReturnPolicy = RETURN_POLICY;
  }

  // Recurse into arrays and nested objects
  for (const val of Object.values(node)) {
    if (Array.isArray(val)) {
      val.forEach(addReturnPolicy);
    } else if (val && typeof val === 'object') {
      addReturnPolicy(val);
    }
  }
}

let updated = 0;

for (const file of FILES) {
  if (!fs.existsSync(file)) { console.log(`  MISSING: ${file}`); continue; }

  let html = fs.readFileSync(file, 'utf8');

  const ldMatch = html.match(/(<script type="application\/ld\+json">)\s*([\s\S]*?)\s*(<\/script>)/);
  if (!ldMatch) { console.log(`  NO JSON-LD: ${file}`); continue; }

  let schema;
  try {
    schema = JSON.parse(ldMatch[2]);
  } catch (e) {
    console.log(`  PARSE ERROR in ${file}: ${e.message}`);
    continue;
  }

  if (JSON.stringify(schema).includes('hasMerchantReturnPolicy')) {
    console.log(`  SKIP (already has hasMerchantReturnPolicy): ${file}`);
    continue;
  }

  addReturnPolicy(schema);

  const newBlock = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, newBlock);

  fs.writeFileSync(file, html, 'utf8');
  console.log(`  Updated: ${file}`);
  updated++;
}

console.log(`\n✓ Done — hasMerchantReturnPolicy added to ${updated} / ${FILES.length} files`);
console.log('\nNext steps:');
console.log('  1. Validate at https://search.google.com/test/rich-results');
console.log('  2. Push to GitHub Pages');
console.log('  3. Purge Cloudflare cache for all 4 product URLs');
console.log('  4. In Search Console → Request Indexing for each page');
