/* ================================================
   LAYSUN.CO — DISQUS AUTO-LOADER
   Detects page URL and identifier automatically.
   Usage: add <div id="disqus_thread"></div> and
   <script src="js/comments.js"></script> — done.
   ================================================ */
(function () {
  if (!document.getElementById('disqus_thread')) return;

  var path = window.location.pathname;
  var file = path.split('/').pop() || '';
  var identifier = file.replace(/^blog-/, '').replace(/\.html$/, '') || path;
  var status = document.getElementById('comments-status');

  window.disqus_config = function () {
    this.page.url = window.location.origin + path;
    this.page.identifier = identifier;
    this.callbacks.onReady = [function () {
      if (status) status.hidden = true;
    }];
  };

  var d = document, s = d.createElement('script');
  s.src = 'https://laysun.disqus.com/embed.js';
  s.async = true;
  s.setAttribute('data-timestamp', +new Date());
  s.onerror = function () {
    if (status) status.textContent = 'Comments could not load. A browser privacy setting, content blocker, or network restriction may be blocking Disqus.';
  };
  (d.head || d.body).appendChild(s);
}());