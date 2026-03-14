const fs = require('fs');

const BASE_URL = 'https://laysun.co';
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-airport.webp`;

// Per-page metadata: [slug (no .html), og:type, og:image]
const pages = {
  'index': {
    slug: '',
    type: 'website',
    image: `${BASE_URL}/images/hero-airport.webp`,
    titleOverride: 'LaySun — Commercial Artificial Plants & Trees | Factory Direct',
  },
  'about': {
    slug: '/about',
    type: 'website',
    image: `${BASE_URL}/images/about-team-triptych.webp`,
    titleOverride: 'About LaySun — Commercial Artificial Plant Manufacturer',
  },
  'products': {
    slug: '/products',
    type: 'website',
    image: `${BASE_URL}/images/prod-olive-ls-new.webp`,
    titleOverride: 'Artificial Trees & Plant Catalogue — LaySun Commercial',
  },
  'systems': {
    slug: '/systems',
    type: 'website',
    image: `${BASE_URL}/images/purpose-built-systems.webp`,
    titleOverride: 'Artificial Plant Systems — Indoor Trees, Green Walls & More | LaySun',
  },
  'manufacturing': {
    slug: '/manufacturing',
    type: 'website',
    image: `${BASE_URL}/images/factory-production-floor.webp`,
    titleOverride: 'Manufacturing — Fire-Rated PE Artificial Plants | LaySun',
  },
  'projects': {
    slug: '/projects',
    type: 'website',
    image: `${BASE_URL}/images/project-hotel-lobby-la.webp`,
    titleOverride: 'Commercial Artificial Plant Projects — Hotels, Restaurants & Offices | LaySun',
  },
  'solutions': {
    slug: '/solutions',
    type: 'website',
    image: `${BASE_URL}/images/solution-hotel.webp`,
    titleOverride: 'Artificial Plant Solutions by Industry — Hotels, Restaurants & More | LaySun',
  },
  'blog': {
    slug: '/blog',
    type: 'website',
    image: `${BASE_URL}/images/blog-hotel-trends.webp`,
    titleOverride: 'Blog — Commercial Artificial Plant Insights & Design Guides | LaySun',
  },
  'contact': {
    slug: '/contact',
    type: 'website',
    image: DEFAULT_IMAGE,
  },
  'quote': {
    slug: '/quote',
    type: 'website',
    image: DEFAULT_IMAGE,
  },
  'blog-hotel-trends-2025': {
    slug: '/blog-hotel-trends-2025',
    type: 'article',
    image: `${BASE_URL}/images/blog-hotel-trends.webp`,
  },
  'blog-restaurant-green-walls': {
    slug: '/blog-restaurant-green-walls',
    type: 'article',
    image: `${BASE_URL}/images/blog-restaurant-green-wall.webp`,
  },
  'blog-pe-vs-pvc': {
    slug: '/blog-pe-vs-pvc',
    type: 'article',
    image: `${BASE_URL}/images/blog-pe-vs-pvc.webp`,
  },
  'blog-biophilic-design': {
    slug: '/blog-biophilic-design',
    type: 'article',
    image: `${BASE_URL}/images/blog-biophilic-office.webp`,
  },
  'blog-outdoor-uv-guide': {
    slug: '/blog-outdoor-uv-guide',
    type: 'article',
    image: `${BASE_URL}/images/blog-outdoor-uv.webp`,
  },
  'blog-specifying-checklist': {
    slug: '/blog-specifying-checklist',
    type: 'article',
    image: `${BASE_URL}/images/blog-specifying-checklist.webp`,
  },
  'blog-post': {
    slug: '/blog-post',
    type: 'article',
    image: `${BASE_URL}/images/blog-featured-nfpa701.webp`,
  },
  'privacy-policy': { slug: '/privacy-policy', type: 'website', image: DEFAULT_IMAGE },
  'terms-conditions': { slug: '/terms-conditions', type: 'website', image: DEFAULT_IMAGE },
  'shipping-policy': { slug: '/shipping-policy', type: 'website', image: DEFAULT_IMAGE },
  'returns-policy': { slug: '/returns-policy', type: 'website', image: DEFAULT_IMAGE },
  'warranty-policy': { slug: '/warranty-policy', type: 'website', image: DEFAULT_IMAGE },
  'cookie-policy': { slug: '/cookie-policy', type: 'website', image: DEFAULT_IMAGE },
};

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of htmlFiles) {
  const key = file.replace('.html', '');
  const meta = pages[key];
  if (!meta) { console.log(`  SKIP (no config): ${file}`); continue; }

  let content = fs.readFileSync(file, 'utf8');

  // Skip if OG tags already exist
  if (content.includes('og:title')) {
    console.log(`  SKIP (already has OG): ${file}`);
    continue;
  }

  // Extract existing title and description
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/);

  const title = meta.titleOverride || (titleMatch ? titleMatch[1] : 'LaySun');
  const desc = descMatch ? descMatch[1] : 'LaySun — Commercial artificial plants for hotels, restaurants and commercial spaces.';
  const url = `${BASE_URL}${meta.slug}`;

  // Update title if override provided
  if (meta.titleOverride && titleMatch) {
    content = content.replace(/<title>[^<]+<\/title>/, `<title>${meta.titleOverride}</title>`);
  }

  // Build the meta block
  const metaBlock = `
  <!-- Canonical -->
  <link rel="canonical" href="${url}">

  <!-- Open Graph -->
  <meta property="og:type" content="${meta.type}">
  <meta property="og:site_name" content="LaySun">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${meta.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${meta.image}">
`;

  // Inject before </head>
  content = content.replace('</head>', metaBlock + '</head>');

  fs.writeFileSync(file, content);
  console.log(`  Updated: ${file}`);
  updated++;
}

console.log(`\n✓ Done — ${updated} files updated`);
