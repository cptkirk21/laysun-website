const fs = require('fs');

const BASE = 'https://laysun.co';

// ── SHARED OBJECTS ───────────────────────────────────────────────────────────

const organization = {
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  "name": "LaySun",
  "url": BASE,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE}/images/logo.webp`,
    "width": 200,
    "height": 60
  },
  "description": "Fire-rated artificial plants for commercial spaces. Factory-direct worldwide.",
  "foundingDate": "2011",
  "email": "info@laysun.co",
  "telephone": "+12138298485",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 25 Qiaofeng Road, Qishi Town",
    "addressLocality": "Dongguan",
    "addressRegion": "Guangdong",
    "addressCountry": "CN"
  },
  "sameAs": [
    "https://www.linkedin.com/in/shawn-kirkpatrick-37a89281/"
  ],
  "areaServed": "Worldwide",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 50 }
};

const website = {
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  "url": BASE,
  "name": "LaySun",
  "publisher": { "@id": `${BASE}/#organization` }
};

// ── PER-PAGE SCHEMAS ─────────────────────────────────────────────────────────

const schemas = {

  'index.html': [
    { "@context": "https://schema.org", ...organization },
    { "@context": "https://schema.org", ...website },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      "url": BASE,
      "name": "LaySun — Commercial Artificial Plants & Trees | Factory Direct",
      "description": "Fire-rated artificial plants for hotels, restaurants, and commercial spaces. Factory-direct worldwide.",
      "isPartOf": { "@id": `${BASE}/#website` },
      "about": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": BASE }]
      }
    }
  ],

  'about.html': [
    { "@context": "https://schema.org", ...organization },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "url": `${BASE}/about`,
      "name": "About LaySun — Commercial Artificial Plant Manufacturer",
      "description": "Our story, values, and why we're the trusted choice for fire-rated artificial plants in commercial spaces worldwide.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE}/about` }
        ]
      }
    }
  ],

  'products.html': [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "url": `${BASE}/products`,
      "name": "Artificial Trees & Plant Catalogue — LaySun Commercial",
      "description": "Browse LaySun's full range of commercial artificial trees — olive trees, palms, fiddle leaf figs, ficus, flowering trees and more.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Products", "item": `${BASE}/products` }
        ]
      },
      "hasPart": [
        { "@type": "Product", "name": "Artificial Olive Trees", "brand": { "@id": `${BASE}/#organization` }, "category": "Artificial Trees", "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "seller": { "@id": `${BASE}/#organization` } } },
        { "@type": "Product", "name": "Artificial Palm Trees", "brand": { "@id": `${BASE}/#organization` }, "category": "Artificial Trees", "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "seller": { "@id": `${BASE}/#organization` } } },
        { "@type": "Product", "name": "Artificial Fiddle Leaf Fig Trees", "brand": { "@id": `${BASE}/#organization` }, "category": "Artificial Trees", "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "seller": { "@id": `${BASE}/#organization` } } },
        { "@type": "Product", "name": "Artificial Living Wall Panels", "brand": { "@id": `${BASE}/#organization` }, "category": "Artificial Green Walls", "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "seller": { "@id": `${BASE}/#organization` } } },
        { "@type": "Product", "name": "Artificial Flowering Trees", "brand": { "@id": `${BASE}/#organization` }, "category": "Artificial Trees", "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "seller": { "@id": `${BASE}/#organization` } } }
      ]
    }
  ],

  'systems.html': [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "url": `${BASE}/systems`,
      "name": "Commercial Artificial Plant Systems",
      "description": "Indoor trees, living walls, potted collections, hedges, and custom installations for commercial spaces.",
      "provider": { "@id": `${BASE}/#organization` },
      "areaServed": "Worldwide",
      "serviceType": "Artificial Plant Supply & Installation",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Artificial Plant Systems",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Indoor Trees & Palms" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Living Wall Systems" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Potted Plant Collections" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hedge & Topiary Systems" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Sculptural Installations" } }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Systems", "item": `${BASE}/systems` }
        ]
      }
    }
  ],

  'manufacturing.html': [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `${BASE}/manufacturing`,
      "name": "Manufacturing — Fire-Rated PE Artificial Plants | LaySun",
      "description": "Fire-rated PE artificial plants engineered in our dedicated Dongguan facility. Materials, quality control, and certifications.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Manufacturing", "item": `${BASE}/manufacturing` }
        ]
      }
    }
  ],

  'projects.html': [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "url": `${BASE}/projects`,
      "name": "Commercial Artificial Plant Projects — Hotels, Restaurants & Offices | LaySun",
      "description": "LaySun project portfolio — artificial plant installations for hotels, restaurants, corporate offices, and retail worldwide.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${BASE}/projects` }
        ]
      }
    }
  ],

  'solutions.html': [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `${BASE}/solutions`,
      "name": "Artificial Plant Solutions by Industry | LaySun",
      "description": "Industry-specific artificial plant solutions for hotels, restaurants, corporate offices, retail, healthcare, and events.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${BASE}/solutions` }
        ]
      }
    }
  ],

  'blog.html': [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "url": `${BASE}/blog`,
      "name": "LaySun Blog — Commercial Artificial Plant Insights",
      "description": "Insights on artificial plants for commercial spaces — design trends, fire safety, material guides, and installation advice.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` }
        ]
      }
    }
  ],

  'contact.html': [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": `${BASE}/contact`,
      "name": "Contact LaySun",
      "description": "Contact LaySun for artificial plant enquiries, project quotes, and commercial orders.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${BASE}/contact` }
        ]
      }
    }
  ],

  'quote.html': [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `${BASE}/quote`,
      "name": "Request a Quote — Commercial Artificial Plants | LaySun",
      "description": "Request a quote for your commercial artificial plant project. We respond within 24 hours.",
      "publisher": { "@id": `${BASE}/#organization` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Request a Quote", "item": `${BASE}/quote` }
        ]
      }
    }
  ],

  'blog-hotel-trends-2025.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-hotel-trends-2025`,
      "headline": "5 Artificial Plant Trends Dominating Hotel Lobbies in 2025",
      "description": "The artificial plant trends hotel designers are requesting most in 2025 — from oversized palms to hanging installations and custom bespoke trees.",
      "image": `${BASE}/images/blog-hotel-trends.webp`,
      "datePublished": "2025-03-06",
      "dateModified": "2025-03-06",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Design",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "5 Artificial Plant Trends Dominating Hotel Lobbies in 2025", "item": `${BASE}/blog-hotel-trends-2025` }
        ]
      }
    }
  ],

  'blog-restaurant-green-walls.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-restaurant-green-walls`,
      "headline": "How Green Walls Increased This Restaurant's Revenue by 22%",
      "description": "A case study showing how a single artificial green wall installation transformed dwell time, social media reach, and covers per evening at a Sydney restaurant.",
      "image": `${BASE}/images/blog-restaurant-green-wall.webp`,
      "datePublished": "2024-11-28",
      "dateModified": "2024-11-28",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Case Study",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "How Green Walls Increased This Restaurant's Revenue by 22%", "item": `${BASE}/blog-restaurant-green-walls` }
        ]
      }
    }
  ],

  'blog-pe-vs-pvc.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-pe-vs-pvc`,
      "headline": "PE vs PVC: Why Material Matters in Artificial Plants",
      "description": "PE vs PVC in artificial plants — the definitive guide to material grades, realism, durability, and why PE is the commercial standard.",
      "image": `${BASE}/images/blog-pe-vs-pvc.webp`,
      "datePublished": "2025-02-09",
      "dateModified": "2025-02-09",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Guides",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "PE vs PVC: Why Material Matters in Artificial Plants", "item": `${BASE}/blog-pe-vs-pvc` }
        ]
      }
    }
  ],

  'blog-biophilic-design.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-biophilic-design`,
      "headline": "Biophilic Design on a Budget: Artificial Plants in Corporate Offices",
      "description": "How artificial plants deliver biophilic design benefits in corporate offices — with zero maintenance cost and full fire compliance.",
      "image": `${BASE}/images/blog-biophilic-office.webp`,
      "datePublished": "2024-08-17",
      "dateModified": "2024-08-17",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Design",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "Biophilic Design on a Budget", "item": `${BASE}/blog-biophilic-design` }
        ]
      }
    }
  ],

  'blog-outdoor-uv-guide.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-outdoor-uv-guide`,
      "headline": "Outdoor Artificial Plants: UV Rating Guide for Terrace & Pool Installations",
      "description": "UV ratings, expected lifespan, and what to look for when specifying outdoor artificial plants for terraces, pool areas, and commercial exterior spaces.",
      "image": `${BASE}/images/blog-outdoor-uv.webp`,
      "datePublished": "2024-10-03",
      "dateModified": "2024-10-03",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Guides",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "UV Rating Guide for Outdoor Artificial Plants", "item": `${BASE}/blog-outdoor-uv-guide` }
        ]
      }
    }
  ],

  'blog-specifying-checklist.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-specifying-checklist`,
      "headline": "How to Specify Artificial Plants: A Checklist for Interior Designers",
      "description": "A practical checklist for interior designers specifying artificial plants — covering fire certification, material grade, sizing, vessel options, and supplier vetting.",
      "image": `${BASE}/images/blog-specifying-checklist.webp`,
      "datePublished": "2024-05-22",
      "dateModified": "2024-05-22",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Guides",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "How to Specify Artificial Plants: A Checklist", "item": `${BASE}/blog-specifying-checklist` }
        ]
      }
    }
  ],

  'blog-post.html': [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": `${BASE}/blog-post`,
      "headline": "NFPA 701 Explained: What Hotel Designers Need to Know About Artificial Plant Fire Codes",
      "description": "NFPA 701 explained — what hotel designers need to know about artificial plant fire codes in commercial properties.",
      "image": `${BASE}/images/blog-featured-nfpa701.webp`,
      "datePublished": "2025-01-14",
      "dateModified": "2025-01-14",
      "author": { "@type": "Organization", "@id": `${BASE}/#organization` },
      "publisher": { "@id": `${BASE}/#organization` },
      "articleSection": "Fire Safety",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": "NFPA 701 Explained", "item": `${BASE}/blog-post` }
        ]
      }
    }
  ]
};

// ── INJECT ───────────────────────────────────────────────────────────────────

let updated = 0;
for (const [file, schemaArray] of Object.entries(schemas)) {
  if (!fs.existsSync(file)) { console.log(`  MISSING: ${file}`); continue; }

  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('application/ld+json')) {
    console.log(`  SKIP (already has schema): ${file}`); continue;
  }

  const scriptBlocks = schemaArray
    .map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`)
    .join('\n  ');

  content = content.replace('</head>', `  ${scriptBlocks}\n</head>`);
  fs.writeFileSync(file, content);
  console.log(`  Updated: ${file}`);
  updated++;
}

console.log(`\n✓ Done — schema added to ${updated} pages`);
