/* ================================================
   LAYSUN.CO — MAIN JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR ──────────────────────────────────────
  const navbar  = document.querySelector('.navbar');
  const burger  = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
    backTop?.classList.toggle('show', window.scrollY > 450);
  }, { passive: true });

  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks?.classList.toggle('open');
    document.body.style.overflow = navLinks?.classList.contains('open') ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Dropdown toggle (mobile)
  document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      btn.closest('.nav-dropdown-wrap').classList.toggle('open');
    });
  });

  // Active link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── BACK TO TOP ─────────────────────────────────
  const backTop = document.querySelector('.back-top');
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── LIGHTBOX ────────────────────────────────────
  const lb        = document.querySelector('.lightbox');
  const lbImg     = lb?.querySelector('.lb-img');
  const lbPh      = lb?.querySelector('.lb-ph');
  const lbCaption = lb?.querySelector('.lb-caption');
  let lbItems = [];
  let lbCur   = 0;

  function showLb(idx) {
    if (!lb || !lbItems.length) return;
    lbCur = (idx + lbItems.length) % lbItems.length;
    const it = lbItems[lbCur];
    if (lbImg && lbPh) {
      if (it.src) {
        lbImg.src = it.src; lbImg.alt = it.alt || '';
        lbImg.style.display = 'block'; lbPh.style.display = 'none';
      } else {
        lbPh.textContent = it.ph || '';
        lbImg.style.display = 'none'; lbPh.style.display = 'flex';
      }
    }
    if (lbCaption) lbCaption.innerHTML = it.caption || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() { lb?.classList.remove('active'); document.body.style.overflow = ''; }
  function navLb(dir) { showLb(lbCur + dir); }

  // Gallery items (projects page)
  function buildGalleryItems() {
    return Array.from(document.querySelectorAll('.gallery-item'))
      .filter(el => el.style.display !== 'none')
      .map(el => {
        const img  = el.querySelector('img');
        const info = el.querySelector('.gallery-info');
        const h4   = info?.querySelector('h4');
        const sp   = info?.querySelector('span');
        return {
          src:     img?.src || '',
          alt:     img?.alt || '',
          caption: h4 ? `<strong>${h4.textContent}</strong>${sp ? ' &mdash; ' + sp.textContent : ''}` : '',
          ph:      el.querySelector('.gph')?.textContent.trim() || '',
        };
      });
  }

  const galleryEls = Array.from(document.querySelectorAll('.gallery-item'));
  if (galleryEls.length) {
    lbItems = buildGalleryItems();
    galleryEls.forEach(el => {
      el.addEventListener('click', () => {
        lbItems = buildGalleryItems();
        const visible = Array.from(document.querySelectorAll('.gallery-item')).filter(e => e.style.display !== 'none');
        showLb(visible.indexOf(el));
      });
    });
  }

  // Standalone data-lb images (about page etc.)
  document.querySelectorAll('img[data-lb]').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lbItems = [{ src: img.src, alt: img.alt || '', caption: img.dataset.lb || '' }];
      showLb(0);
    });
  });

  // Product card images — prev/next through visible cards
  const prodCardImgs = Array.from(document.querySelectorAll('.prod-card-img img'));
  if (prodCardImgs.length) {
    prodCardImgs.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const visibleImgs = Array.from(document.querySelectorAll('.prod-card:not(.hidden) .prod-card-img img'));
        lbItems = visibleImgs.map(im => {
          const card = im.closest('.prod-card');
          const name = card?.querySelector('h3')?.textContent || '';
          const cat  = card?.querySelector('.prod-cat-tag')?.textContent || '';
          return { src: im.src, alt: im.alt || '', caption: `<strong>${name}</strong>${cat ? ' &mdash; ' + cat : ''}` };
        });
        showLb(visibleImgs.indexOf(img));
      });
    });
  }

  lb?.querySelector('.lb-close')?.addEventListener('click', closeLb);
  lb?.querySelector('.lb-prev')?.addEventListener('click', () => navLb(-1));
  lb?.querySelector('.lb-next')?.addEventListener('click', () => navLb(1));
  lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lb?.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  navLb(-1);
    if (e.key === 'ArrowRight') navLb(1);
  });

  // ── GALLERY FILTER ──────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
      });
      // Rebuild gallery lightbox items after filter
      lbItems = buildGalleryItems();
    });
  });

  // ── ACCORDION ───────────────────────────────────
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const open = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.accordion-body').style.maxHeight = '0';
      });

      if (!open) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ── FORMS ────────────────────────────────────────
  const FORM_KEYS = {
    contact: '6841019e-539b-419e-acdb-954a225d2523',
    quote:   'da6a2a6e-1d41-469c-a844-24b99ce78b60'
  };

  document.querySelectorAll('form[data-form]').forEach(form => {
    const id  = form.getAttribute('data-form');
    const key = FORM_KEYS[id];

    if (!key) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const msg = document.querySelector(`[data-success="${id}"]`);
        if (msg) { form.style.display = 'none'; msg.classList.add('show'); }
      });
      return;
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn     = form.querySelector('[type=submit]');
      const msg     = document.querySelector(`[data-success="${id}"]`);
      const origTxt = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const data = new FormData(form);
        const obj  = { access_key: key };
        for (const [k, v] of data.entries()) {
          if (obj[k] !== undefined) {
            if (!Array.isArray(obj[k])) obj[k] = [obj[k]];
            obj[k].push(v);
          } else {
            obj[k] = v;
          }
        }
        for (const k in obj) {
          if (Array.isArray(obj[k])) obj[k] = obj[k].join(', ');
        }

        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(obj)
        });
        const json = await res.json();

        if (json.success) {
          form.style.display = 'none';
          if (msg) msg.classList.add('show');
        } else {
          throw new Error(json.message || 'Submission failed');
        }
      } catch {
        btn.textContent = origTxt;
        btn.disabled = false;
        alert('Sorry, something went wrong. Please email us directly at info@laysun.co');
      }
    });
  });

  // ── SCROLL REVEAL ───────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-a]').forEach(el => obs.observe(el));

});
