(function () {
  'use strict';
  if (window.__laysunAnalyticsLoaded) return;
  window.__laysunAnalyticsLoaded = true;

  const measurementId = 'G-YJDVC02Y28';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // Keep campaign parameters and the original referrer on the first pageview.
  window.gtag('config', measurementId, {
    page_location: window.location.href,
    page_referrer: document.referrer,
    page_title: document.title,
    send_page_view: true
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(script);

  window.laysunTrack = function (name, params, done) {
    let completed = false;
    const finish = function () {
      if (completed) return;
      completed = true;
      if (done) done();
    };
    const event = Object.assign({}, params, {
      page_location: window.location.href,
      page_title: document.title,
      transport_type: 'beacon'
    });
    // Navigation must still work when analytics is blocked or unavailable.
    if (done) {
      event.event_callback = finish;
      event.event_timeout = 800;
      setTimeout(finish, 900);
    }
    try { window.gtag('event', name, event); } catch (_) { finish(); }
  };

  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    let name;
    let method;
    if (url.protocol === 'mailto:') { name = 'email_click'; method = 'email'; }
    else if (url.protocol === 'tel:') { name = 'phone_click'; method = 'phone'; }
    else if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) {
      name = 'whatsapp_click'; method = 'whatsapp';
    } else if (url.hostname === 'calendar.app.google' || url.hostname === 'calendar.google.com') {
      name = 'booking_click'; method = 'consultation';
    } else if (url.origin === window.location.origin && /^\/quote(?:\.html)?\/?$/.test(url.pathname)) {
      name = 'quote_request_click'; method = 'quote';
    }
    if (!name) return;
    // Do not collect message text, email addresses, or submitted form fields.
    window.laysunTrack(name, { contact_method: method });
  });
})();
