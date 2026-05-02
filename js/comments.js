/* ================================================
   LAYSUN.CO — DISQUS AUTO-LOADER
   Detects page URL and identifier automatically.
   Usage: add <div id="disqus_thread"></div> and
   <script src="js/comments.js"></script> — done.
   ================================================ */
(function () {
  if (!document.getElementById('disqus_thread')) return;

  var path       = window.location.pathname;
  var file       = path.split('/').pop() || '';
  var identifier = file.replace(/^blog-/, '').replace(/\.html$/, '') || path;

  window.disqus_config = function () {
    this.page.url        = window.location.origin + path;
    this.page.identifier = identifier;
  };

  var d = document, s = d.createElement('script');
  s.src   = 'https://laysun.disqus.com/embed.js';
  s.async = true;
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}());
