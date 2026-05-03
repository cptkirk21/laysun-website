/**
 * generate-catalog.js
 * Generates two files:
 *   laysun-catalog-2026.csv   — Alibaba-ready bulk product upload
 *   laysun-catalog-2026.html  — Print-ready catalog (open in Chrome → Print → Save as PDF)
 *
 * Run with: node generate-catalog.js
 */

const fs = require('fs');

const BASE_URL  = 'https://laysun.co';
const ORIGIN    = 'Dongguan, Guangdong, China';
const BRAND     = 'LaySun';
const PORT      = 'Guangzhou / Shenzhen';
const PAYMENT   = 'T/T, L/C, Western Union, PayPal';
const SUPPLY    = '2000 pcs/month';
const CERTS     = 'NFPA 701, EN 13501, GB 8624 B1';
const PACKAGING = 'Individual export carton with foam padding; custom branding available';

// ── PRODUCT DATA ─────────────────────────────────────────────────────────────
const products = [

  // ── ARTIFICIAL PALM TREES ────────────────────────────────────────────────
  {
    sku: 'LS-PALM-QP-ROUND', collection: 'Artificial Palm Trees',
    name: 'Commercial Artificial Queen Palm Tree — Round Pot',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–30 days',
    p1: '129.00', p2: '103.00', p3: '80.00',
    material: 'Injection-moulded PE foliage, steel armature, fibreglass trunk, round ceramic-look pot',
    desc: 'Premium artificial Queen Palm purpose-built for hotel lobbies, resort pool areas and commercial atriums. Botanical-specimen PE fronds, individually hand-positioned for natural drape. Full NFPA 701 fire certification included. Factory-direct from Dongguan.',
    image: `${BASE_URL}/images/prod-palm-queen-round.webp`,
    keywords: 'artificial queen palm tree, commercial artificial palm, hotel lobby palm, fake palm indoor, NFPA 701 palm tree',
    url: `${BASE_URL}/artificial-palm-trees`,
  },
  {
    sku: 'LS-PALM-QP-WHITE', collection: 'Artificial Palm Trees',
    name: 'Commercial Artificial Queen Palm Tree — White Pot',
    sizes: '4 ft, 5 ft, 6 ft', moq: 1, leadTime: '15–30 days',
    p1: '119.00', p2: '95.00', p3: '74.00',
    material: 'Injection-moulded PE foliage, steel armature, fibreglass trunk, white ceramic-look pot',
    desc: 'Contemporary white-pot Queen Palm for minimalist hotel lobbies and corporate reception areas. Same premium PE foliage and steel armature as our classic round-pot model. NFPA 701 certified.',
    image: `${BASE_URL}/images/prod-palm-queen-white.webp`,
    keywords: 'artificial queen palm white pot, contemporary artificial palm, minimalist palm tree, office lobby palm',
    url: `${BASE_URL}/artificial-palm-trees`,
  },
  {
    sku: 'LS-PALM-FAN-SINGLE', collection: 'Artificial Palm Trees',
    name: 'Commercial Artificial Single-trunk Fan Palm Tree',
    sizes: '7 ft, 8 ft, 9 ft, 10 ft', moq: 1, leadTime: '20–35 days',
    p1: '199.00', p2: '159.00', p3: '122.00',
    material: 'PE fan fronds, steel armature, textured fibreglass trunk, weighted planter base',
    desc: 'Large-format single-trunk fan palm for double-height atriums, airport lounges, casino floors and shopping centre food courts. Available 7–10 ft with UV-stabilised PE foliage for outdoor pool deck applications. NFPA 701 certified.',
    image: `${BASE_URL}/images/prod-palm-fan-single.webp`,
    keywords: 'artificial fan palm tree, large indoor palm, washingtonia palm artificial, 10ft artificial palm, commercial fan palm',
    url: `${BASE_URL}/artificial-palm-trees`,
  },
  {
    sku: 'LS-PALM-FAN-DOUBLE', collection: 'Artificial Palm Trees',
    name: 'Commercial Artificial Double-trunk Fan Palm Tree',
    sizes: '8 ft, 9 ft', moq: 1, leadTime: '20–35 days',
    p1: '269.00', p2: '215.00', p3: '166.00',
    material: 'PE fan fronds, dual steel armature cores, textured fibreglass trunks, weighted base',
    desc: 'Statement double-trunk fan palm for landmark hospitality installations — resort lobbies, casino atriums, luxury retail. Dual-trunk configuration adds dramatic visual impact at 8–9 ft. NFPA 701 certified.',
    image: `${BASE_URL}/images/prod-palm-fan-double.webp`,
    keywords: 'double trunk artificial palm, twin trunk palm tree, large commercial palm, resort lobby palm',
    url: `${BASE_URL}/artificial-palm-trees`,
  },

  // ── ARTIFICIAL OLIVE TREES ────────────────────────────────────────────────
  {
    sku: 'LS-OLIVE-LS-NEW', collection: 'Artificial Olive Trees',
    name: 'LS New Style Commercial Artificial Olive Tree',
    sizes: '4 ft, 5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage with silk olive leaves, steel wire branches, fibreglass trunk, pot included',
    desc: 'LaySun\'s flagship 2025 olive tree design with dense natural canopy and realistic gnarled trunk. Ideal for hotel lobbies, restaurant entrances and retail spaces. NFPA 701 fire-rated.',
    image: `${BASE_URL}/images/prod-olive-ls-new.webp`,
    keywords: 'artificial olive tree commercial, fake olive tree indoor, hotel olive tree, restaurant olive tree, NFPA 701 olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-WOOD-TRUNK', collection: 'Artificial Olive Trees',
    name: 'LS Real Wood Trunk Artificial Olive Tree',
    sizes: '4 ft, 5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '20–30 days',
    p1: '115.00', p2: '92.00', p3: '71.00',
    material: 'PE foliage, natural preserved wood trunk, steel wire branches, decorative pot',
    desc: 'Authentic real wood trunk gives unmatched realism for high-end hospitality and luxury retail. Natural dried and preserved timber trunk with PE olive foliage. Popular for boutique hotels and designer interiors.',
    image: `${BASE_URL}/images/prod-olive-ls-wood-trunk.webp`,
    keywords: 'real wood trunk artificial olive tree, authentic olive tree fake, luxury artificial olive tree, preserved wood trunk tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-OLD-STUMP', collection: 'Artificial Olive Trees',
    name: 'LS Old Stump Thick Trunk Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '20–30 days',
    p1: '105.00', p2: '84.00', p3: '65.00',
    material: 'PE foliage, thick fibreglass old-stump trunk with texture detail, heavy planter base',
    desc: 'Aged thick-trunk olive tree with a distinctive old-world character. Heavy stump-style base and gnarled trunk detail make this a standout piece for Mediterranean-themed hospitality and upscale dining.',
    image: `${BASE_URL}/images/prod-olive-ls-old-stump.webp`,
    keywords: 'old stump olive tree artificial, thick trunk olive tree, aged olive tree fake, Mediterranean artificial tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-WIDE-CANOPY', collection: 'Artificial Olive Trees',
    name: 'LS Wide Canopy Artificial Olive Tree',
    sizes: '6 ft, 7 ft, 8 ft, 9 ft', moq: 1, leadTime: '20–30 days',
    p1: '135.00', p2: '108.00', p3: '84.00',
    material: 'Dense PE foliage, extended steel armature frame, fibreglass trunk, large planter',
    desc: 'Extra-wide canopy for spacious commercial environments — hotel atriums, airport lounges, corporate reception halls. Wide-spreading branch architecture fills large open volumes effectively.',
    image: `${BASE_URL}/images/prod-olive-ls-wide-canopy.webp`,
    keywords: 'wide canopy artificial olive tree, large olive tree fake, atrium olive tree, corporate lobby olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-LARGE-TREE', collection: 'Artificial Olive Trees',
    name: 'LS Large Tree Artificial Olive — 9–10 ft',
    sizes: '9 ft, 10 ft', moq: 1, leadTime: '25–40 days',
    p1: '179.00', p2: '143.00', p3: '111.00',
    material: 'High-density PE foliage, reinforced steel armature, large fibreglass trunk, weighted base',
    desc: 'Flagship large-format olive tree at 9–10 ft for landmark hotel lobbies and major commercial installations. Reinforced frame for stability. Custom sizing and pot finishes available on request.',
    image: `${BASE_URL}/images/prod-olive-ls-large-tree.webp`,
    keywords: 'large artificial olive tree 10ft, oversized fake olive tree, giant artificial tree commercial, hotel atrium tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-MULTI-BRANCH', collection: 'Artificial Olive Trees',
    name: 'Multi-branch Artificial Olive Tree',
    sizes: '4 ft, 5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, multiple steel armature branches, fibreglass trunk, planter pot',
    desc: 'Multi-stem branching architecture for a full, lush Mediterranean silhouette. Popular for restaurant terraces, hotel courtyards and retail window displays.',
    image: `${BASE_URL}/images/prod-olive-multi-branch.webp`,
    keywords: 'multi branch artificial olive tree, bush olive tree fake, full canopy olive tree, restaurant olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-THICK-FORK', collection: 'Artificial Olive Trees',
    name: 'Thick Branch Double-fork Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '15–25 days',
    p1: '99.00', p2: '79.00', p3: '61.00',
    material: 'PE foliage, thick double-fork steel frame, fibreglass trunk, planter',
    desc: 'Bold double-forked trunk silhouette with heavy branches — strong architectural character for modern commercial interiors. Popular with interior designers specifying statement trees.',
    image: `${BASE_URL}/images/prod-olive-thick-double-fork.webp`,
    keywords: 'double fork olive tree artificial, architectural fake tree, statement artificial olive, designer olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-FAN-SHAPE', collection: 'Artificial Olive Trees',
    name: 'Fan-shape Artificial Olive Tree — Round Pot',
    sizes: '5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '15–25 days',
    p1: '99.00', p2: '79.00', p3: '61.00',
    material: 'PE foliage, fan-spread steel armature, fibreglass trunk, round planter pot',
    desc: 'Fan-spread canopy trained to a flat, graphic silhouette — suits narrow corridors, wall-adjacent placement and retail shop-in-shop displays. Pairs well with picture-frame lighting.',
    image: `${BASE_URL}/images/prod-olive-fan-shape.webp`,
    keywords: 'fan shape artificial olive tree, flat canopy olive tree, espalier fake tree, narrow space olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-SPHERICAL', collection: 'Artificial Olive Trees',
    name: 'Spherical 3D Canopy Artificial Olive Tree',
    sizes: '3 ft, 4 ft, 5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '20–30 days',
    p1: '109.00', p2: '87.00', p3: '68.00',
    material: 'Dense PE foliage, spherical wire cage armature, fibreglass trunk, planter',
    desc: 'Perfect globe canopy — a contemporary topiary-style olive tree for high-end retail, luxury hotel lobbies and event design. Six sizes from 3–8 ft for multiple applications.',
    image: `${BASE_URL}/images/prod-olive-spherical.webp`,
    keywords: 'spherical olive tree artificial, ball canopy fake tree, topiary olive tree, globe artificial tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-LARGE-HEAD', collection: 'Artificial Olive Trees',
    name: 'Large Tree Head 3D Artificial Olive Tree',
    sizes: '6 ft, 7 ft, 8 ft', moq: 1, leadTime: '20–30 days',
    p1: '125.00', p2: '100.00', p3: '78.00',
    material: 'Dense PE foliage, large 3D wire-frame head, fibreglass trunk, planter',
    desc: 'Oversized dense-canopy olive tree with a dramatic round head — visually dominant for hotel atrium centerpieces and major retail installations.',
    image: `${BASE_URL}/images/prod-olive-large-head.webp`,
    keywords: 'large head olive tree artificial, oversized canopy fake tree, atrium centerpiece tree, dense olive tree artificial',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-CROSS-BLACK', collection: 'Artificial Olive Trees',
    name: 'Cross Black Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '99.00', p2: '79.00', p3: '61.00',
    material: 'PE foliage, cross-branch steel frame, dark fibreglass trunk, planter',
    desc: 'Distinctive cross-branched trunk architecture with a dark finish — bold contemporary aesthetic for designer hotel bars, high-end restaurants and exclusive retail.',
    image: `${BASE_URL}/images/prod-olive-cross-black.webp`,
    keywords: 'cross branch olive tree artificial, dark trunk fake tree, contemporary artificial tree, black trunk olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-FORK-STRAIGHT', collection: 'Artificial Olive Trees',
    name: 'Double-fork Straight Trunk Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, straight double-fork steel frame, fibreglass trunk, planter',
    desc: 'Clean straight trunk with a natural double-fork split — versatile and widely specified for corporate offices, hotel corridors and retail environments.',
    image: `${BASE_URL}/images/prod-olive-double-fork-straight.webp`,
    keywords: 'straight trunk olive tree artificial, double fork fake tree, corporate olive tree, office artificial tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-STRAIGHT-BLACK', collection: 'Artificial Olive Trees',
    name: 'Straight Black Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '15–25 days',
    p1: '99.00', p2: '79.00', p3: '61.00',
    material: 'PE foliage, straight steel frame, black-finish fibreglass trunk, planter',
    desc: 'Architectural straight-trunk olive with matte black trunk finish — a premium choice for contemporary hotel interiors, corporate HQ lobbies and boutique retail.',
    image: `${BASE_URL}/images/prod-olive-straight-black.webp`,
    keywords: 'black trunk artificial tree, straight black olive tree, modern fake tree, architectural artificial olive',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-WHITE-POT-FINE', collection: 'Artificial Olive Trees',
    name: 'White Pot Fine Branch Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, fine steel wire branches, fibreglass trunk, white ceramic-look pot',
    desc: 'Delicate fine-branch canopy in a contemporary white pot — perfect for minimalist interior design, Scandi-style hotels and premium corporate spaces.',
    image: `${BASE_URL}/images/prod-olive-white-pot-fine.webp`,
    keywords: 'white pot olive tree artificial, fine branch fake tree, minimalist artificial tree, Scandi hotel tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-STANDARD', collection: 'Artificial Olive Trees',
    name: 'Standard Artificial Olive Tree',
    sizes: '6 ft, 7 ft, 8 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, steel wire branches, fibreglass trunk, standard planter pot',
    desc: 'Our most versatile commercial olive tree — a reliable workhorse specification for hotels, restaurants and corporate offices at 6–8 ft.',
    image: `${BASE_URL}/images/prod-olive-standard-678ft.webp`,
    keywords: 'standard artificial olive tree, 6ft 7ft 8ft olive tree fake, commercial olive tree, hotel olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-WHITE-POT', collection: 'Artificial Olive Trees',
    name: 'White Pot Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, steel wire branches, fibreglass trunk, white round pot',
    desc: 'Classic olive canopy in a clean white round pot — a hotel designer favourite for its versatility across Mediterranean, contemporary and Japandi interior styles.',
    image: `${BASE_URL}/images/prod-olive-white-pot.webp`,
    keywords: 'white pot olive tree, artificial olive tree pot, hotel designer olive tree, Japandi fake tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-SINGLE-3BRANCH', collection: 'Artificial Olive Trees',
    name: 'Single Trunk Three-branch Artificial Olive Tree',
    sizes: '4 ft, 5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, single trunk with three-branch steel frame, fibreglass trunk, planter',
    desc: 'Single trunk with a balanced three-branch split — natural and proportioned. A popular specification for hotel room entries, restaurant dividers and retail corridor plantings.',
    image: `${BASE_URL}/images/prod-olive-single-three-branch.webp`,
    keywords: 'three branch olive tree artificial, single trunk olive fake, balanced olive tree, corridor olive tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-2025-THICK', collection: 'Artificial Olive Trees',
    name: '2025 Thick Straight Trunk Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft, 8 ft', moq: 1, leadTime: '15–25 days',
    p1: '109.00', p2: '87.00', p3: '68.00',
    material: 'PE foliage, thick straight fibreglass trunk, steel wire branches, planter',
    desc: 'New 2025 model with an extra-thick straight trunk for a more mature, established appearance. High demand from luxury hotel designers specifying updated interiors.',
    image: `${BASE_URL}/images/prod-olive-2025-thick-straight.webp`,
    keywords: '2025 artificial olive tree, thick trunk olive fake, new model olive tree, mature olive tree artificial',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-GREEN-STEM', collection: 'Artificial Olive Trees',
    name: 'Green Stem Multi-branch Artificial Olive Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '89.00', p2: '71.00', p3: '55.00',
    material: 'PE foliage, green-finish steel wire branches, fibreglass trunk, planter',
    desc: 'Young green stem variant — lighter, fresher aesthetic with visible green branches contrasting with silver-green PE foliage. Suits eco-themed retail and biophilic office design.',
    image: `${BASE_URL}/images/prod-olive-green-stem.webp`,
    keywords: 'green stem olive tree artificial, young olive tree fake, biophilic office tree, eco retail tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },
  {
    sku: 'LS-OLIVE-VELVET', collection: 'Artificial Olive Trees',
    name: 'Velvet Flock Artificial Olive Tree',
    sizes: '5 ft, 6 ft', moq: 1, leadTime: '20–30 days',
    p1: '119.00', p2: '95.00', p3: '74.00',
    material: 'Velvet-flock coated foliage, steel wire branches, fibreglass trunk, planter',
    desc: 'Unique velvet-flocked foliage finish for a tactile, ultra-realistic leaf texture. Preferred for close-contact display contexts — boutique hotel reception, luxury retail pop-up, event design.',
    image: `${BASE_URL}/images/prod-olive-velvet.webp`,
    keywords: 'velvet flock olive tree, flocked artificial tree, luxury fake olive tree, tactile artificial tree, event tree',
    url: `${BASE_URL}/artificial-olive-trees`,
  },

  // ── ARTIFICIAL FIDDLE LEAF FIG & FICUS ───────────────────────────────────
  {
    sku: 'LS-FLF-CURVED', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Curved Trunk Fiddle Leaf Fig Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '79.00', p2: '63.00', p3: '49.00',
    material: 'Large PE fiddle leaf fig leaves, curved steel armature trunk, weighted planter base',
    desc: 'The most-specified artificial fiddle leaf fig for interior designers — curved trunk, large dramatic leaves, ideal for hotel lobbies, corporate offices and residential commercial. NFPA 701 fire-rated.',
    image: `${BASE_URL}/images/prod-flfig-curved.webp`,
    keywords: 'artificial fiddle leaf fig, fake fiddle leaf fig commercial, curved trunk fiddle leaf, hotel fiddle leaf fig, NFPA 701 fiddle leaf',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FLF-WOOD-TRUNK', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Real Wood Trunk Fiddle Leaf Fig Tree',
    sizes: '6 ft', moq: 1, leadTime: '20–30 days',
    p1: '109.00', p2: '87.00', p3: '68.00',
    material: 'Large PE fiddle leaf fig leaves, natural preserved wood trunk, planter base',
    desc: 'Natural wood trunk gives unrivalled authenticity for premium hospitality interiors. Preserved timber trunk with hand-placed PE leaves — a top specification for luxury boutique hotels and designer showrooms.',
    image: `${BASE_URL}/images/prod-flfig-wood-trunk.webp`,
    keywords: 'real wood trunk fiddle leaf fig, authentic fake fiddle leaf, luxury artificial fiddle leaf, preserved wood tree',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FLF-MULTI', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Multi-branch Fiddle Leaf Fig Tree',
    sizes: '7 ft', moq: 1, leadTime: '20–30 days',
    p1: '119.00', p2: '95.00', p3: '74.00',
    material: 'PE fiddle leaf fig leaves, multi-stem steel armature, weighted planter',
    desc: 'Multi-stem fiddle leaf fig with a full, lush silhouette — more dramatic visual impact than single-stem. Popular for hotel lounge areas and large corporate reception spaces.',
    image: `${BASE_URL}/images/prod-flfig-multi-branch.webp`,
    keywords: 'multi branch fiddle leaf fig artificial, multi stem fiddle leaf fake, full fiddle leaf tree, lounge fiddle leaf fig',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FICUS-LARGE-HEAD', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Large Head Mini Ficus Tree',
    sizes: '8 ft', moq: 1, leadTime: '20–30 days',
    p1: '129.00', p2: '103.00', p3: '80.00',
    material: 'Dense PE ficus leaves, large-head wire armature, fibreglass trunk, planter',
    desc: 'Oversized dense-canopy ficus with a proportionally large head — a bold statement piece for hotel atriums and large-volume commercial spaces at 8 ft.',
    image: `${BASE_URL}/images/prod-ficus-large-head.webp`,
    keywords: 'large head ficus artificial, oversized ficus tree, big canopy ficus fake, atrium ficus tree',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FICUS-THREE-TRUNK', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Three-trunk Real Wood Ficus Tree',
    sizes: '5 ft, 6 ft', moq: 1, leadTime: '20–30 days',
    p1: '139.00', p2: '111.00', p3: '86.00',
    material: 'PE ficus leaves, three natural wood trunks, planter base',
    desc: 'Three-stem real wood ficus — dramatic multi-trunk configuration for high-impact hotel lobby installations. Natural wood trunks provide authentic texture and warmth.',
    image: `${BASE_URL}/images/prod-ficus-three-trunk.webp`,
    keywords: 'three trunk ficus artificial, multi trunk real wood ficus, natural ficus tree fake, luxury ficus tree',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FICUS-TWO-TRUNK', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Two-trunk Real Wood Ficus Tree',
    sizes: '5 ft, 6 ft', moq: 1, leadTime: '20–30 days',
    p1: '119.00', p2: '95.00', p3: '74.00',
    material: 'PE ficus leaves, twin natural wood trunks, planter base',
    desc: 'Twin natural wood trunk ficus for a balanced, organic composition. Widely used in hotel room lobbies, spa reception and premium co-working environments.',
    image: `${BASE_URL}/images/prod-ficus-two-trunk.webp`,
    keywords: 'two trunk ficus artificial, twin trunk wood ficus, spa ficus tree, co-working artificial tree',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FICUS-CURVED', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Curved Trunk Ficus Tree',
    sizes: '4 ft, 5 ft, 6 ft', moq: 1, leadTime: '15–25 days',
    p1: '79.00', p2: '63.00', p3: '49.00',
    material: 'PE ficus leaves, curved fibreglass trunk, steel wire branches, planter',
    desc: 'Graceful curved-trunk ficus — a versatile specification at 4–6 ft for hotel corridors, restaurant dividers and retail displays. Strong seller in European hospitality markets.',
    image: `${BASE_URL}/images/prod-ficus-curved.webp`,
    keywords: 'curved trunk ficus artificial, curved fake ficus, restaurant ficus tree, hotel corridor ficus',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },
  {
    sku: 'LS-FICUS-VARIEGATED', collection: 'Artificial Fiddle Leaf Fig & Ficus',
    name: 'Commercial Artificial Variegated White-edge Ficus Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '20–30 days',
    p1: '95.00', p2: '76.00', p3: '59.00',
    material: 'Variegated PE ficus leaves (green with white edges), steel armature, fibreglass trunk, planter',
    desc: 'Distinctive white-edged variegated ficus — a design-forward choice for boutique hotels, contemporary retail and creative workspaces. Unusual variegated colouring attracts social media attention.',
    image: `${BASE_URL}/images/prod-ficus-variegated.webp`,
    keywords: 'variegated ficus artificial, white edge ficus fake, designer ficus tree, boutique hotel tree, unique artificial tree',
    url: `${BASE_URL}/artificial-fiddle-leaf-fig`,
  },

  // ── ARTIFICIAL FLOWERING TREES ───────────────────────────────────────────
  {
    sku: 'LS-FLOWER-CAMELLIA-RED', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Red Camellia Tree',
    sizes: '2.5 ft, 3 ft, 4 ft, 5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '45.00', p2: '36.00', p3: '28.00',
    material: 'Silk/PE red camellia blooms, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Striking red camellia tree for hotel lobbies, event design and restaurant entrances. Vibrant silk camellia blooms at 2.5–7 ft. Fire-rated. Strong seasonal demand from hospitality buyers worldwide.',
    image: `${BASE_URL}/images/prod-camellia-red.webp`,
    keywords: 'artificial red camellia tree, fake camellia tree, floral artificial tree, hotel event tree, silk camellia tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-CAMELLIA-WHITE', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial White Camellia Tree',
    sizes: '4.5 ft, 6 ft', moq: 1, leadTime: '15–25 days',
    p1: '48.00', p2: '38.00', p3: '30.00',
    material: 'Silk/PE white camellia blooms, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Elegant white camellia tree — a perennial choice for luxury hotel lobbies, bridal events and high-end retail displays. Clean and timeless in white.',
    image: `${BASE_URL}/images/prod-camellia-white.webp`,
    keywords: 'artificial white camellia tree, white floral tree fake, bridal event tree, luxury hotel flower tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-CAMELLIA-PINK', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Pink Camellia Tree',
    sizes: '4 ft', moq: 1, leadTime: '15–25 days',
    p1: '45.00', p2: '36.00', p3: '28.00',
    material: 'Silk/PE pink camellia blooms, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Soft pink camellia tree — a romantic accent piece for boutique hotels, beauty spas, bridal suites and luxury retail displays.',
    image: `${BASE_URL}/images/prod-camellia-pink.webp`,
    keywords: 'artificial pink camellia tree, pink floral fake tree, spa hotel tree, romantic artificial tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-CAMELLIA-YELLOW', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Yellow Camellia Tree',
    sizes: '6 ft', moq: 1, leadTime: '15–25 days',
    p1: '48.00', p2: '38.00', p3: '30.00',
    material: 'Silk/PE yellow camellia blooms, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Bold yellow camellia tree for sunny, energetic commercial interiors — restaurant entrances, retail shopfronts and event installations requiring a warm colour accent.',
    image: `${BASE_URL}/images/prod-camellia-yellow.webp`,
    keywords: 'artificial yellow camellia tree, yellow floral fake tree, bold flower tree commercial, warm colour artificial tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-HYDRANGEA-PINK', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Pink Hydrangea Tree',
    sizes: '5 ft', moq: 1, leadTime: '15–25 days',
    p1: '55.00', p2: '44.00', p3: '34.00',
    material: 'Silk/PE pink hydrangea clusters, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Lush pink hydrangea ball tree — a popular choice for luxury wedding venues, boutique hotel lobbies and spa reception areas.',
    image: `${BASE_URL}/images/prod-hydrangea-pink.webp`,
    keywords: 'artificial pink hydrangea tree, fake hydrangea tree, wedding venue tree artificial, spa hotel flower tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-HYDRANGEA-PURPLE', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Purple Hydrangea Tree',
    sizes: '4 ft', moq: 1, leadTime: '15–25 days',
    p1: '55.00', p2: '44.00', p3: '34.00',
    material: 'Silk/PE purple hydrangea clusters, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Rich purple hydrangea tree — luxurious accent for high-end event design, boutique hotel lobbies and upscale dining.',
    image: `${BASE_URL}/images/prod-hydrangea-purple.webp`,
    keywords: 'artificial purple hydrangea tree, fake purple flower tree, luxury event tree, boutique hotel purple tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-HYDRANGEA-BLUE', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Blue Hydrangea Tree',
    sizes: '5 ft', moq: 1, leadTime: '15–25 days',
    p1: '55.00', p2: '44.00', p3: '34.00',
    material: 'Silk/PE blue hydrangea clusters, wire branch frame, fibreglass trunk, decorative pot',
    desc: 'Cool blue hydrangea tree — a calming presence for spa interiors, healthcare lobbies and contemporary hotel reception areas.',
    image: `${BASE_URL}/images/prod-hydrangea-blue.webp`,
    keywords: 'artificial blue hydrangea tree, blue flower tree fake, spa hydrangea tree, healthcare lobby tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-BOUG-WOOD', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Real Wood Trunk Bougainvillea Tree',
    sizes: '6 ft, 7.5 ft, 8 ft', moq: 1, leadTime: '20–35 days',
    p1: '95.00', p2: '76.00', p3: '59.00',
    material: 'Silk bougainvillea bracts, natural preserved wood trunk with vine texture, planter base',
    desc: 'Magnificent bougainvillea tree with a genuine natural wood trunk — dripping with silk bracts. A dramatic centrepiece for resort lobbies, Mediterranean-themed restaurants and outdoor terrace displays.',
    image: `${BASE_URL}/images/prod-bougainvillea-wood-trunk.webp`,
    keywords: 'artificial bougainvillea tree real wood, fake bougainvillea tree large, resort lobby bougainvillea, Mediterranean artificial tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-BOUG-PINK', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Pink Bougainvillea Tree',
    sizes: '5 ft, 6 ft, 7 ft', moq: 1, leadTime: '15–25 days',
    p1: '65.00', p2: '52.00', p3: '40.00',
    material: 'Silk pink bougainvillea bracts, steel wire trunk with vine texture, planter base',
    desc: 'Vivid pink bougainvillea tree for outdoor-feel commercial interiors, resort pools, restaurant terraces and tropical-themed retail displays. UV-stabilised version available.',
    image: `${BASE_URL}/images/prod-bougainvillea-pink.webp`,
    keywords: 'artificial pink bougainvillea tree, fake bougainvillea indoor, tropical artificial tree, resort bougainvillea',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-CHERRY-PINK', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Pink Cherry Blossom Tree',
    sizes: '4 ft, 5 ft, 6 ft', moq: 1, leadTime: '15–25 days',
    p1: '55.00', p2: '44.00', p3: '34.00',
    material: 'Silk/polyester pink cherry blossom blooms, twisted branch wire frame, planter base',
    desc: 'Classic pink cherry blossom tree — the #1 event and retail flowering tree worldwide. Stunning in Japanese restaurant entrances, hotel lobbies for seasonal display and wedding venue design.',
    image: `${BASE_URL}/images/prod-cherry-pink.webp`,
    keywords: 'artificial pink cherry blossom tree, fake sakura tree, wedding cherry blossom tree, Japanese restaurant tree',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-CHERRY-WHITE', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial White Cherry Blossom Tree',
    sizes: '5 ft, 6 ft', moq: 1, leadTime: '15–25 days',
    p1: '55.00', p2: '44.00', p3: '34.00',
    material: 'Silk/polyester white cherry blossom blooms, twisted branch wire frame, planter base',
    desc: 'Pure white cherry blossom tree — an elegant neutral-toned choice for luxury hotel lobbies, bridal events, minimalist retail and any interior requiring understated floral impact.',
    image: `${BASE_URL}/images/prod-cherry-white.webp`,
    keywords: 'artificial white cherry blossom tree, white sakura tree fake, bridal tree artificial, elegant flower tree commercial',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
  {
    sku: 'LS-FLOWER-CHERRY-RED', collection: 'Artificial Flowering Trees',
    name: 'Commercial Artificial Red Cherry Blossom Tree',
    sizes: '5 ft, 6 ft', moq: 1, leadTime: '15–25 days',
    p1: '55.00', p2: '44.00', p3: '34.00',
    material: 'Silk/polyester deep red cherry blossom blooms, twisted branch wire frame, planter base',
    desc: 'Dramatic deep-red cherry blossom tree — bold and striking for hotel event spaces, Asian-theme restaurant design, CNY display and luxury retail.',
    image: `${BASE_URL}/images/prod-cherry-red.webp`,
    keywords: 'artificial red cherry blossom tree, deep red sakura tree fake, Chinese New Year tree, bold flower tree commercial',
    url: `${BASE_URL}/artificial-flowering-trees`,
  },
];

// ── COLLECTION METADATA ───────────────────────────────────────────────────────
const collectionMeta = {
  'Artificial Palm Trees': {
    alibabaCategory: 'Artificial Plant & Flower/Artificial Trees/Artificial Palm Trees',
    tags: 'artificial palm tree, commercial palm, hotel palm tree, fake palm, NFPA 701 palm',
  },
  'Artificial Olive Trees': {
    alibabaCategory: 'Artificial Plant & Flower/Artificial Trees/Artificial Olive Trees',
    tags: 'artificial olive tree, commercial olive tree, fake olive tree, hotel olive, NFPA 701 olive',
  },
  'Artificial Fiddle Leaf Fig & Ficus': {
    alibabaCategory: 'Artificial Plant & Flower/Artificial Trees/Artificial Ficus Trees',
    tags: 'artificial fiddle leaf fig, fake ficus tree, commercial ficus, hotel fiddle leaf fig',
  },
  'Artificial Flowering Trees': {
    alibabaCategory: 'Artificial Plant & Flower/Artificial Trees/Artificial Flower Trees',
    tags: 'artificial flowering tree, fake cherry blossom, artificial camellia, silk flower tree commercial',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. GENERATE CSV
// ─────────────────────────────────────────────────────────────────────────────

function csvEscape(v) {
  const s = String(v ?? '');
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"` : s;
}

const CSV_HEADERS = [
  'SKU', 'Product Title', 'Alibaba Category', 'Collection',
  'Brief Description',
  'Available Sizes', 'Material', 'Certifications',
  'Unit Price – 1–9 units (USD FOB)', 'Unit Price – 10–99 units (USD FOB)', 'Unit Price – 100+ units (USD FOB)',
  'Minimum Order Quantity', 'Supply Ability (per month)', 'Lead Time',
  'Place of Origin', 'Brand', 'Port of Export', 'Payment Terms', 'Packaging',
  'Product Image URL', 'Product Page URL', 'Keywords'
];

function csvSizeToSkuSuffix(size) {
  return size.trim().replace(/\./g, '-').replace(/\s+ft$/i, 'FT').replace(/\s+/g, '-').toUpperCase();
}

const csvRows = [CSV_HEADERS.join(',')];
let csvRowCount = 0;
for (const p of products) {
  const meta = collectionMeta[p.collection] || {};
  const sizeList = p.sizes.split(',').map(s => s.trim()).filter(Boolean);
  for (const size of sizeList) {
    const variantSku = `${p.sku}-${csvSizeToSkuSuffix(size)}`;
    const variantTitle = `${p.name} – ${size}`;
    csvRows.push([
      variantSku, variantTitle, meta.alibabaCategory || '', p.collection,
      p.desc,
      size, p.material, CERTS,
      p.p1, p.p2, p.p3,
      p.moq, SUPPLY, p.leadTime,
      ORIGIN, BRAND, PORT, PAYMENT, PACKAGING,
      p.image, p.url, p.keywords
    ].map(csvEscape).join(','));
    csvRowCount++;
  }
}

fs.writeFileSync('laysun-catalog-2026.csv', csvRows.join('\n'), 'utf8');
console.log(`✓ CSV written: laysun-catalog-2026.csv (${csvRowCount} size variants across ${products.length} products)`);

// ─────────────────────────────────────────────────────────────────────────────
// 2. GENERATE HTML CATALOG (print → Save as PDF in Chrome)
// ─────────────────────────────────────────────────────────────────────────────

const collections = [...new Set(products.map(p => p.collection))];

function sizeToSkuSuffix(size) {
  // "5 ft" → "5FT", "2.5 ft" → "2-5FT", "10 ft" → "10FT"
  return size.trim().replace(/\./g, '-').replace(/\s+ft$/i, 'FT').replace(/\s+/g, '-').toUpperCase();
}

function productGrid(collectionName) {
  return products
    .filter(p => p.collection === collectionName)
    .map(p => {
      const sizeList = p.sizes.split(',').map(s => s.trim()).filter(Boolean);
      const skuRows = sizeList.map(size => {
        const suffix = sizeToSkuSuffix(size);
        const variantSku = `${p.sku}-${suffix}`;
        return `<tr><td class="sku-size">${size}</td><td class="sku-code">${variantSku}</td></tr>`;
      }).join('');
      const firstSku = sizeList.length ? `${p.sku}-${sizeToSkuSuffix(sizeList[0])}` : p.sku;
      return `
      <div class="prod-card" data-sku="${firstSku}">
        <div class="prod-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="prod-body">
          <h3>${p.name}</h3>
          <table class="sku-variants">
            <thead><tr><th>Size</th><th>SKU</th></tr></thead>
            <tbody>${skuRows}</tbody>
          </table>
          <div class="price-line">From <strong>$${p.p3}</strong> / unit (100+ units)</div>
          <div class="price-tiers">
            <span>1–9: $${p.p1}</span>
            <span>10–99: $${p.p2}</span>
            <span>100+: $${p.p3}</span>
          </div>
        </div>
      </div>`;
    }).join('');
}

function pricingTable(name) {
  const sample = products.find(p => p.collection === name);
  if (!sample) return '';
  return `
    <table class="price-table">
      <thead><tr><th>Order Quantity</th><th>Unit Price (USD, FOB Dongguan)</th></tr></thead>
      <tbody>
        <tr><td>1 – 9 units</td><td><strong>From $${sample.p1}</strong></td></tr>
        <tr class="alt"><td>10 – 99 units</td><td><strong>From $${sample.p2}</strong></td></tr>
        <tr><td>100+ units</td><td><strong>From $${sample.p3}</strong></td></tr>
      </tbody>
    </table>
    <p class="price-note">Prices are starting rates for standard sizes. Larger formats, real wood trunk and premium styles quoted on request. Shipping, import duties and inland freight are additional.</p>`;
}

const collectionDescriptions = {
  'Artificial Palm Trees': '4 palm varieties — Queen Palms and Fan Palms — purpose-built for hotel lobbies, resort pool areas and large commercial atriums. Available 4–10 ft. NFPA 701, EN 13501 and GB 8624 B1 fire certified.',
  'Artificial Olive Trees': '20 olive tree styles from 3–10 ft. Standard, real wood trunk, spherical 3D, wide canopy, velvet flock and more. The most comprehensive commercial artificial olive tree range available factory-direct worldwide.',
  'Artificial Fiddle Leaf Fig & Ficus': '8 fiddle leaf fig and ficus varieties — curved trunk, real wood trunk, multi-branch and variegated styles. 4–8 ft. The top-specified artificial tree for hotel lobbies and corporate offices globally.',
  'Artificial Flowering Trees': '12 flowering tree varieties — camellia, hydrangea, bougainvillea and cherry blossom in multiple colours. 2.5–8 ft. Premium silk and PE blooms for events, hospitality and retail.',
};

const sectionsHTML = collections.map((name, i) => `
  <section class="collection-section${i > 0 ? ' page-break' : ''}">
    <div class="section-header">
      <div class="section-number">0${i + 1}</div>
      <div>
        <h2>${name}</h2>
        <p class="section-desc">${collectionDescriptions[name] || ''}</p>
      </div>
    </div>
    ${pricingTable(name)}
    <div class="prod-grid">
      ${productGrid(name)}
    </div>
  </section>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LaySun 2026 Product Catalog — Artificial Plants &amp; Trees | B2B Factory Direct</title>
<meta name="description" content="Browse all 44 products with full SKU variants, size options and volume pricing. Fire-rated artificial trees and green walls, factory-direct from Dongguan.">
<link rel="canonical" href="https://laysun.co/laysun-catalog-2026.html">
<style>
  /* ── Base ─────────────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', Arial, sans-serif;
    background: #faf6ef;
    color: #1e1e1e;
    font-size: 13px;
    line-height: 1.6;
  }
  a { color: #b8936a; }
  h1, h2, h3 { font-family: Georgia, 'Times New Roman', serif; color: #1e3520; }

  /* ── Cover ────────────────────────────────────────────────── */
  .cover {
    min-height: 100vh;
    background: #1e3520;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 80px 72px;
    page-break-after: always;
  }
  .cover-brand {
    font-family: Georgia, serif;
    font-size: 52px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }
  .cover-tagline {
    font-size: 18px;
    color: #b8936a;
    font-family: Georgia, serif;
    font-style: italic;
    margin-bottom: 48px;
  }
  .cover-title {
    font-size: 36px;
    font-family: Georgia, serif;
    color: #e5dccf;
    line-height: 1.2;
    max-width: 600px;
    margin-bottom: 16px;
  }
  .cover-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    margin-bottom: 64px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .cover-divider { width: 60px; height: 3px; background: #b8936a; margin-bottom: 48px; }
  .cover-stats {
    display: flex;
    gap: 48px;
    margin-bottom: 64px;
  }
  .cover-stat-num {
    font-size: 36px;
    font-family: Georgia, serif;
    color: #fff;
    line-height: 1;
  }
  .cover-stat-label {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }
  .cover-contact {
    border-top: 1px solid rgba(255,255,255,0.15);
    padding-top: 32px;
    width: 100%;
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
  }
  .cover-contact-item { color: rgba(255,255,255,0.6); font-size: 12px; }
  .cover-contact-item strong { color: #fff; display: block; }

  /* ── Specs bar ────────────────────────────────────────────── */
  .specs-bar {
    background: #2d5a3d;
    padding: 28px 72px;
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
    page-break-after: always;
  }
  .spec-item { color: rgba(255,255,255,0.7); font-size: 12px; }
  .spec-item strong { color: #fff; display: block; font-size: 13px; margin-bottom: 2px; }

  /* ── Collection sections ──────────────────────────────────── */
  .collection-section { padding: 56px 72px 48px; }
  .page-break { page-break-before: always; }

  .section-header {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e5dccf;
  }
  .section-number {
    font-family: Georgia, serif;
    font-size: 48px;
    color: #e5dccf;
    line-height: 1;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: -4px;
  }
  .section-header h2 { font-size: 28px; color: #1e3520; margin-bottom: 6px; }
  .section-desc { color: #5a6050; font-size: 12.5px; max-width: 720px; }

  /* ── Pricing table ────────────────────────────────────────── */
  .price-table {
    width: 100%;
    max-width: 480px;
    border-collapse: collapse;
    margin: 20px 0 8px;
    font-size: 12px;
  }
  .price-table th {
    background: #e5dccf;
    padding: 8px 14px;
    text-align: left;
    font-weight: 600;
    color: #1e3520;
  }
  .price-table td { border: 1px solid #ddd5c2; padding: 8px 14px; }
  .price-table tr.alt td { background: #f0e9dc; }
  .price-note {
    font-size: 11px;
    color: #5a6050;
    margin-bottom: 28px;
    max-width: 600px;
  }

  /* ── Product grid ─────────────────────────────────────────── */
  .prod-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 8px;
  }
  .prod-card {
    background: #fff;
    border: 1px solid #ddd5c2;
    border-radius: 10px;
    overflow: hidden;
    break-inside: avoid;
  }
  .prod-img-wrap {
    aspect-ratio: 1/1;
    background: #e5dccf;
    overflow: hidden;
  }
  .prod-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .prod-body { padding: 12px 14px 14px; }
  .prod-body h3 {
    font-size: 12px;
    font-family: 'Inter', Arial, sans-serif;
    font-weight: 600;
    color: #1e1e1e;
    line-height: 1.3;
    margin-bottom: 8px;
  }
  .sku-variants {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 8px;
    font-size: 10px;
  }
  .sku-variants thead tr {
    background: #1e3520;
    color: #fff;
  }
  .sku-variants thead th {
    padding: 3px 6px;
    text-align: left;
    font-weight: 600;
    font-size: 9px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .sku-variants tbody tr:nth-child(even) { background: #f0e9dc; }
  .sku-variants tbody tr:nth-child(odd) { background: #faf6ef; }
  .sku-size {
    padding: 3px 6px;
    color: #3a4a3a;
    white-space: nowrap;
    font-weight: 500;
  }
  .sku-code {
    padding: 3px 6px;
    font-family: 'Courier New', monospace;
    color: #1e3520;
    font-weight: 700;
    font-size: 9.5px;
    letter-spacing: 0.04em;
  }
  .price-line { font-size: 12px; color: #1e1e1e; margin-bottom: 4px; }
  .price-tiers {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .price-tiers span {
    font-size: 9.5px;
    background: #f0e9dc;
    color: #5a6050;
    border-radius: 20px;
    padding: 2px 7px;
  }

  /* ── Footer strip ─────────────────────────────────────────── */
  .catalog-footer {
    background: #1e3520;
    padding: 28px 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .catalog-footer-brand { font-family: Georgia, serif; font-size: 22px; color: #fff; }
  .catalog-footer p { font-size: 11px; color: rgba(255,255,255,0.5); }
  .catalog-footer a { color: #b8936a; }

  /* ── Print ────────────────────────────────────────────────── */
  @media print {
    body { background: #fff; font-size: 12px; }
    .cover { min-height: 297mm; padding: 60px 54px; }
    .collection-section { padding: 40px 54px 36px; }
    .specs-bar { padding: 20px 54px; }
    .prod-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .prod-card { break-inside: avoid; }
    .catalog-footer { padding: 20px 54px; }
    a { color: #b8936a !important; }
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-brand">LaySun</div>
  <div class="cover-tagline">Fire-rated artificial plants — factory-direct worldwide</div>
  <div class="cover-title">Commercial Artificial Plants &amp; Trees</div>
  <div class="cover-subtitle">Product Catalogue 2026 &nbsp;·&nbsp; B2B Factory-Direct Pricing</div>
  <div class="cover-divider"></div>
  <div class="cover-stats">
    <div>
      <div class="cover-stat-num">44</div>
      <div class="cover-stat-label">Products</div>
    </div>
    <div>
      <div class="cover-stat-num">4</div>
      <div class="cover-stat-label">Collections</div>
    </div>
    <div>
      <div class="cover-stat-num">3</div>
      <div class="cover-stat-label">Fire Certifications</div>
    </div>
    <div>
      <div class="cover-stat-num">15+</div>
      <div class="cover-stat-label">Years Manufacturing</div>
    </div>
  </div>
  <div class="cover-contact">
    <div class="cover-contact-item"><strong>Website</strong>laysun.co</div>
    <div class="cover-contact-item"><strong>Email</strong>info@laysun.co</div>
    <div class="cover-contact-item"><strong>WhatsApp</strong>+1 213-829-8485</div>
    <div class="cover-contact-item"><strong>Factory</strong>No. 25 Qiaofeng Road, Qishi Town, Dongguan, Guangdong, China</div>
  </div>
</div>

<!-- SPECS BAR -->
<div class="specs-bar">
  <div class="spec-item"><strong>Fire Certifications</strong>NFPA 701 · EN 13501 · GB 8624 B1</div>
  <div class="spec-item"><strong>Foliage Material</strong>Injection-moulded PE &amp; Silk</div>
  <div class="spec-item"><strong>MOQ</strong>1 unit (no minimum order)</div>
  <div class="spec-item"><strong>Lead Time</strong>15–40 days (custom: +1–2 weeks)</div>
  <div class="spec-item"><strong>Supply Ability</strong>2,000 pcs / month</div>
  <div class="spec-item"><strong>Port</strong>Guangzhou / Shenzhen</div>
  <div class="spec-item"><strong>Payment</strong>T/T · L/C · PayPal · Western Union</div>
  <div class="spec-item"><strong>Customisation</strong>OEM/ODM — pot, size, colour, fire rating</div>
</div>

${sectionsHTML}

<!-- FOOTER -->
<div class="catalog-footer">
  <div>
    <div class="catalog-footer-brand">LaySun</div>
    <p>No. 25 Qiaofeng Road, Qishi Town, Dongguan, Guangdong, China</p>
  </div>
  <div style="text-align:right;">
    <p><a href="https://laysun.co">laysun.co</a> &nbsp;|&nbsp; info@laysun.co &nbsp;|&nbsp; WhatsApp: +1 213-829-8485</p>
    <p>© 2026 LaySun. All prices USD FOB Dongguan. Subject to change without notice.</p>
  </div>
</div>

<!-- LIGHTBOX -->
<div id="lb-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:9999;align-items:center;justify-content:center;flex-direction:column;">
  <button id="lb-close" style="position:absolute;top:18px;right:24px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;">&#x2715;</button>
  <button id="lb-prev" style="position:absolute;left:18px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;cursor:pointer;padding:10px 14px;border-radius:6px;">&#8592;</button>
  <button id="lb-next" style="position:absolute;right:18px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;cursor:pointer;padding:10px 14px;border-radius:6px;">&#8594;</button>
  <img id="lb-img" src="" alt="" style="max-width:88vw;max-height:78vh;border-radius:6px;box-shadow:0 8px 40px rgba(0,0,0,0.6);object-fit:contain;">
  <div id="lb-caption" style="margin-top:14px;color:#fff;font-size:13px;text-align:center;max-width:600px;line-height:1.5;"></div>
</div>

<script>
(function() {
  var overlay = document.getElementById('lb-overlay');
  var lbImg = document.getElementById('lb-img');
  var lbCaption = document.getElementById('lb-caption');
  var cards = [];
  var current = 0;

  function openAt(idx) {
    current = idx;
    var card = cards[idx];
    var img = card.querySelector('img');
    var name = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
    var sku = card.dataset.sku || '';
    lbImg.src = img ? img.src : '';
    lbImg.alt = name;
    lbCaption.innerHTML = '<strong>' + name + '</strong>' + (sku ? '<br><span style="font-family:monospace;color:#b8936a;font-size:12px;">' + sku + '</span>' : '');
    overlay.style.display = 'flex';
  }

  document.addEventListener('DOMContentLoaded', function() {
    cards = Array.from(document.querySelectorAll('.prod-card'));
    cards.forEach(function(card, i) {
      var wrap = card.querySelector('.prod-img-wrap');
      if (wrap) {
        wrap.style.cursor = 'zoom-in';
        wrap.addEventListener('click', function() { openAt(i); });
      }
    });
    document.getElementById('lb-close').addEventListener('click', function() { overlay.style.display = 'none'; });
    document.getElementById('lb-prev').addEventListener('click', function() { openAt((current - 1 + cards.length) % cards.length); });
    document.getElementById('lb-next').addEventListener('click', function() { openAt((current + 1) % cards.length); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.style.display = 'none'; });
    document.addEventListener('keydown', function(e) {
      if (overlay.style.display === 'none') return;
      if (e.key === 'Escape') overlay.style.display = 'none';
      if (e.key === 'ArrowLeft') openAt((current - 1 + cards.length) % cards.length);
      if (e.key === 'ArrowRight') openAt((current + 1) % cards.length);
    });
  });
})();
</script>

</body>
</html>`;

fs.writeFileSync('laysun-catalog-2026.html', html, 'utf8');
console.log('✓ HTML catalog written: laysun-catalog-2026.html');
console.log('\nTo save as PDF:');
console.log('  1. Open laysun-catalog-2026.html in Chrome');
console.log('  2. Ctrl+P (or Cmd+P on Mac)');
console.log('  3. Destination: Save as PDF');
console.log('  4. Paper size: A4 or Letter, Margins: Minimum');
console.log('  5. Enable "Background graphics" for full colour output');
