const sharp = require('sharp');
const path = require('path');

const SRC = 'C:\\Users\\Shawn\\Pictures\\factory tree images\\产品图片\\产品图片\\';
const DEST = 'C:\\Users\\Shawn\\Desktop\\laysun-website\\images\\';

const products = [
  // ── OLIVE TREES ──────────────────────────────────────────────────────────
  { s: '橄榄/LS新款橄榄系列.JPG',                     d: 'prod-olive-ls-new.webp' },
  { s: '橄榄/LS真木杆橄榄184cm.JPG',                   d: 'prod-olive-ls-wood-trunk.webp' },
  { s: '橄榄/LS老桩粗杆橄榄系列.JPG',                  d: 'prod-olive-ls-old-stump.webp' },
  { s: '橄榄/LS大冠幅橄榄184cm.JPG',                   d: 'prod-olive-ls-wide-canopy.webp' },
  { s: '橄榄/LS大树橄榄304.JPG',                       d: 'prod-olive-ls-large-tree.webp' },
  { s: '橄榄/多叉橄榄树系列.JPG',                      d: 'prod-olive-multi-branch.webp' },
  { s: '橄榄/粗枝大两叉橄榄系列大.JPG',                d: 'prod-olive-thick-double-fork.webp' },
  { s: '橄榄/圆盆扇形橄榄系列.JPG',                    d: 'prod-olive-fan-shape.webp' },
  { s: '橄榄/球形立体橄榄系列.JPG',                    d: 'prod-olive-spherical.webp' },
  { s: '橄榄/大树头立体橄榄系列.JPG',                  d: 'prod-olive-large-head.webp' },
  { s: '橄榄/交叉黑橄榄系列图.JPG',                    d: 'prod-olive-cross-black.webp' },
  { s: '橄榄/双叉直杆橄榄系列图.JPG',                  d: 'prod-olive-double-fork-straight.webp' },
  { s: '橄榄/直杆黑橄榄系列.JPG',                      d: 'prod-olive-straight-black.webp' },
  { s: '橄榄/白盆细枝橄榄系列.JPG',                    d: 'prod-olive-white-pot-fine.webp' },
  { s: '橄榄/678FT橄榄树系列.JPG',                     d: 'prod-olive-standard-678ft.webp' },
  { s: '橄榄/橄榄树白盆系列.JPG',                      d: 'prod-olive-white-pot.webp' },
  { s: '橄榄/单杆三叉橄榄系列.JPG',                    d: 'prod-olive-single-three-branch.webp' },
  { s: '橄榄/2025款直身粗杆橄榄系列.JPG',              d: 'prod-olive-2025-thick-straight.webp' },
  { s: '橄榄/绿骨多叉橄榄184CM.JPG',                   d: 'prod-olive-green-stem.webp' },
  { s: '橄榄/KL植绒橄榄184cm.JPG',                     d: 'prod-olive-velvet.webp' },

  // ── FIDDLE LEAF FIG ───────────────────────────────────────────────────────
  { s: '琴叶榕/弯杆琴叶榕系列.JPG',                    d: 'prod-flfig-curved.webp' },
  { s: '琴叶榕/真木杆琴叶榕184cm.JPG',                 d: 'prod-flfig-wood-trunk.webp' },
  { s: '琴叶榕/2026款多叉琴叶榕214CM.JPG',             d: 'prod-flfig-multi-branch.webp' },
  { s: '琴叶榕/大树头迷你榕244cm.JPG',                  d: 'prod-ficus-large-head.webp' },

  // ── FICUS / CLOTH FIG ─────────────────────────────────────────────────────
  { s: '布叶榕/三杆真木杆布叶榕系列图.JPG',            d: 'prod-ficus-three-trunk.webp' },
  { s: '布叶榕/两杆真木杆布叶榕黑色四方盆系列图.JPG',  d: 'prod-ficus-two-trunk.webp' },
  { s: '布叶榕/弯杆布叶榕系列.JPG',                    d: 'prod-ficus-curved.webp' },
  { s: '其他/白边布叶榕154cm.JPG',                      d: 'prod-ficus-variegated.webp' },

  // ── DRACAENA (巴西铁) ─────────────────────────────────────────────────────
  { s: '巴西铁/两杆巴西铁系列.JPG',                    d: 'prod-dracaena-two-trunk.webp' },
  { s: '巴西铁/大叶巴西铁系列.JPG',                    d: 'prod-dracaena-large-leaf.webp' },
  { s: '巴西铁/多杆巴西铁154cm（7寸盆）.JPG',           d: 'prod-dracaena-multi-trunk.webp' },

  // ── PALMS ─────────────────────────────────────────────────────────────────
  { s: '贵妃葵/圆盆贵妃葵系列.JPG',                    d: 'prod-palm-queen-round.webp' },
  { s: '贵妃葵/白直盆贵妃葵系列图.JPG',                d: 'prod-palm-queen-white.webp' },
  { s: '其他/单杆葵系列.JPG',                           d: 'prod-palm-fan-single.webp' },
  { s: '其他/2025双杆葵 244cm274cm.JPG',                d: 'prod-palm-fan-double.webp' },

  // ── CAMELLIA (山茶花) ─────────────────────────────────────────────────────
  { s: '山茶花和绣球花/红色山茶花系列.JPG',            d: 'prod-camellia-red.webp' },
  { s: '山茶花和绣球花/三杆白色山茶花135cm（四方白盆）.JPG', d: 'prod-camellia-white.webp' },
  { s: '山茶花和绣球花/三叉粉色山茶花124cm.JPG',       d: 'prod-camellia-pink.webp' },
  { s: '山茶花和绣球花/黄色山茶花184cm.JPG',           d: 'prod-camellia-yellow.webp' },

  // ── HYDRANGEA (绣球花) ────────────────────────────────────────────────────
  { s: '山茶花和绣球花/浅粉绣球花154cm.JPG',           d: 'prod-hydrangea-pink.webp' },
  { s: '山茶花和绣球花/浅紫绣球花124cm.JPG',           d: 'prod-hydrangea-purple.webp' },
  { s: '山茶花和绣球花/浅蓝绣球花154cm.JPG',           d: 'prod-hydrangea-blue.webp' },

  // ── BOUGAINVILLEA (三角梅) ────────────────────────────────────────────────
  { s: '三角梅/真木杆单杆三角梅184CM（不拆装）.JPG',   d: 'prod-bougainvillea-wood-trunk.webp' },
  { s: '三角梅/粉红色三角梅系列.JPG',                  d: 'prod-bougainvillea-pink.webp' },

  // ── CHERRY BLOSSOM (樱花) ─────────────────────────────────────────────────
  { s: '其他/樱花/樱花系列.JPG',                        d: 'prod-cherry-pink.webp' },
  { s: '其他/樱花/白色樱花184cm.JPG',                   d: 'prod-cherry-white.webp' },
  { s: '其他/樱花/红色樱花184cm.JPG',                   d: 'prod-cherry-red.webp' },

  // ── OTHER TREES ───────────────────────────────────────────────────────────
  { s: '其他/柠檬树154cm.JPG',                          d: 'prod-other-lemon.webp' },
  { s: '其他/苹果树154cm.JPG',                          d: 'prod-other-apple.webp' },
  { s: '其他/螺旋杆发财树124cm.JPG',                    d: 'prod-other-money-spiral.webp' },
  { s: '其他/多枝发财树124cm.JPG',                      d: 'prod-other-money-multi.webp' },
  { s: '其他/枫树（青叶）175cm.JPG',                    d: 'prod-other-maple-green.webp' },
  { s: '其他/枫树（黄叶）184cm.JPG',                    d: 'prod-other-maple-yellow.webp' },
  { s: '马醉木/马醉木150cm.jpg',                        d: 'prod-other-andromeda.webp' },
  { s: '其他/尤加利184cm.JPG',                          d: 'prod-other-eucalyptus.webp' },
  { s: '其他/旅人蕉154cm.JPG',                          d: 'prod-other-travelers-palm.webp' },
  { s: '其他/美人蕉184cm.jpg',                          d: 'prod-other-canna.webp' },
  { s: '其他/海棠花184cm.JPG',                          d: 'prod-other-begonia.webp' },
  { s: '其他/吊兰树系列.jpg',                           d: 'prod-other-spider-plant.webp' },
  { s: '其他/剑兰系列.jpg',                             d: 'prod-other-agapanthus.webp' },
];

async function run() {
  let ok = 0, fail = 0;
  for (const p of products) {
    const src = path.join(SRC, p.s);
    const dest = path.join(DEST, p.d);
    try {
      await sharp(src)
        .rotate()
        .resize(800, 800, { fit: 'cover', position: 'centre' })
        .webp({ quality: 82 })
        .toFile(dest);
      console.log('✓', p.d);
      ok++;
    } catch (e) {
      console.error('✗', p.s, '—', e.message);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} OK, ${fail} failed`);
}

run();
