/* ===================================================
   LAYSUN.CO — BLOG INDEX RENDERER
   Fetches blog-index.json and populates:
     #featured-post   — the hero split section
     #blog-grid       — the card grid (paginated)
     #blog-pagination — page buttons
   Falls back silently to hardcoded HTML if fetch fails.
   CSP-safe: no eval(), no inline handlers.
   =================================================== */

(function () {
  'use strict';

  var JSON_URL       = 'blog-index.json';
  var POSTS_PER_PAGE = 6;

  var allGridPosts   = [];
  var currentPage    = 1;

  /* Escape text for insertion into HTML attribute or content */
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* Build a safe href from a slug — only a-z, 0-9, and hyphens allowed */
  function postHref(slug) {
    return 'blog-' + String(slug).replace(/[^a-z0-9-]/gi, '') + '.html';
  }

  /* Render the featured post into #featured-post */
  function renderFeatured(post) {
    var el = document.getElementById('featured-post');
    if (!el || !post) return;

    var media = document.createElement('div');
    media.className = 'split-media';
    var img = document.createElement('img');
    img.src     = post.image || '';
    img.alt     = post.title || '';
    img.loading = 'lazy';
    media.appendChild(img);

    var text = document.createElement('div');
    text.className = 'split-text';

    var meta = document.createElement('div');
    meta.className = 'blog-meta';
    meta.innerHTML =
      '<span class="cat">' + esc(post.category) + '</span>' +
      '<span>•</span>' +
      '<span>' + esc(post.date) + '</span>' +
      (post.readTime
        ? '<span>•</span><span>' + esc(post.readTime) + '</span>'
        : '');

    var h2 = document.createElement('h2');
    h2.style.cssText = 'font-size:clamp(1.5rem,3vw,2rem);margin-bottom:1rem;';
    h2.textContent = post.title || '';

    var p = document.createElement('p');
    p.textContent = post.description || '';

    var a = document.createElement('a');
    a.href      = postHref(post.slug);
    a.className = 'btn btn-primary mt-3';
    a.textContent = 'Read Article →';

    text.appendChild(meta);
    text.appendChild(h2);
    text.appendChild(p);
    text.appendChild(a);

    el.innerHTML = '';
    el.appendChild(media);
    el.appendChild(text);
  }

  /* Build a single blog card element */
  function buildCard(post) {
    var a = document.createElement('a');
    a.href      = postHref(post.slug);
    a.className = 'blog-card';
    a.setAttribute('data-a', '');

    var imgWrap = document.createElement('div');
    imgWrap.className = 'blog-card-img';
    var img = document.createElement('img');
    img.src     = post.image || '';
    img.alt     = post.title || '';
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    var body = document.createElement('div');
    body.className = 'blog-body';

    var meta = document.createElement('div');
    meta.className = 'blog-meta';
    meta.innerHTML =
      '<span class="cat">' + esc(post.category) + '</span>' +
      '<span>•</span>' +
      '<span>' + esc(post.date) + '</span>';

    var h3 = document.createElement('h3');
    h3.textContent = post.title || '';

    var p = document.createElement('p');
    p.textContent = post.description || '';

    var cta = document.createElement('span');
    cta.className = 'card-link';
    cta.textContent = 'Read more →';

    body.appendChild(meta);
    body.appendChild(h3);
    body.appendChild(p);
    body.appendChild(cta);

    a.appendChild(imgWrap);
    a.appendChild(body);
    return a;
  }

  /* Wire up IntersectionObserver for scroll-reveal on new cards */
  function observeCards(gridEl) {
    if (typeof IntersectionObserver === 'undefined') return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    gridEl.querySelectorAll('[data-a]').forEach(function (el) {
      obs.observe(el);
    });
  }

  /* Render one page of the grid */
  function renderPage(page) {
    currentPage = page;

    var start     = (page - 1) * POSTS_PER_PAGE;
    var pagePosts = allGridPosts.slice(start, start + POSTS_PER_PAGE);

    var gridEl = document.getElementById('blog-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    pagePosts.forEach(function (post) {
      gridEl.appendChild(buildCard(post));
    });
    observeCards(gridEl);

    renderPagination();
  }

  /* Render pagination buttons into #blog-pagination */
  function renderPagination() {
    var paginationEl = document.getElementById('blog-pagination');
    if (!paginationEl) return;

    var totalPages = Math.ceil(allGridPosts.length / POSTS_PER_PAGE);

    if (totalPages <= 1) {
      paginationEl.style.display = 'none';
      return;
    }

    paginationEl.style.display = '';

    var inner = document.createElement('div');
    inner.style.cssText = 'display:inline-flex;gap:.5rem;align-items:center;';

    for (var i = 1; i <= totalPages; i++) {
      var btn = document.createElement('button');
      btn.className  = 'filter-btn' + (i === currentPage ? ' active' : '');
      btn.style.cssText = 'width:40px;height:40px;padding:0;border-radius:50%;';
      btn.textContent   = String(i);

      /* IIFE to capture correct page number in closure */
      (function (pageNum) {
        btn.addEventListener('click', function () {
          renderPage(pageNum);
          var gridEl = document.getElementById('blog-grid');
          if (gridEl) {
            gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }(i));

      inner.appendChild(btn);
    }

    paginationEl.innerHTML = '';
    paginationEl.appendChild(inner);
  }

  /* Main render — called after successful JSON fetch */
  function render(data) {
    var posts = Array.isArray(data.posts) ? data.posts : [];

    /* Sort everything newest-first, then auto-feature the top post */
    posts.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    var featured = posts[0] || null;
    allGridPosts = posts.slice(1);

    renderFeatured(featured);
    renderPage(1);
  }

  /* Boot — wait for DOM then fetch */
  document.addEventListener('DOMContentLoaded', function () {
    fetch(JSON_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        /* Fetch failed — hardcoded HTML remains visible as fallback */
        console.warn('[blog.js] Could not load blog-index.json:', err.message);
      });
  });

}());