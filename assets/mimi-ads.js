/* Mimi English — ads + right column (see mimi-ads.css). */
(function () {
  'use strict';
  var isMobile = window.matchMedia('(max-width: 820px)').matches;
  // Monetag In-Page Push (zone 12297676) — loaded on desktop AND mobile (same tag). Banner count/position are set
  // in the Monetag dashboard. The matching service worker (zone 12297653) lives inside /sw.js with the offline cache.
  if (!window.__mimiMonetag) {
    window.__mimiMonetag = 1;
    (function (s) { s.dataset.zone = '12297676'; s.src = 'https://nap5k.com/tag.min.js'; })
      ([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
  }
  if (isMobile) {
    // OPTIONAL: paste a separate banner code here to render inside #mimi-ad-top (the 62px strip at the top).
  }

  function init() {
    if (window.matchMedia('(max-width: 1365px)').matches || document.getElementById('mimi-side')) return;
    var cur = document.getElementById('cur'), learn = document.getElementById('v-learn');
    var side = document.createElement('aside');
    side.id = 'mimi-side'; side.setAttribute('role', 'complementary');
    var panel = document.createElement('div'); panel.className = 'mimi-side-panel';
    var go = document.createElement('div'); go.className = 'mimi-side-go';
    go.innerHTML = '<button type="button">📚 Danh sách bài học</button>';
    go.firstChild.addEventListener('click', function () { var b = document.querySelector('#tabs button[data-v="learn"]'); if (b) b.click(); });
    panel.appendChild(go);
    if (cur) panel.appendChild(cur);
    var slots = document.createElement('div'); slots.className = 'mimi-side-slots'; slots.setAttribute('aria-hidden', 'true');
    slots.innerHTML = '<div></div><div></div><div></div>';
    side.appendChild(panel); side.appendChild(slots);
    document.body.appendChild(side);
    var root = document.documentElement;
    root.classList.add('has-ad-side');
    function sync() { root.classList.toggle('mimi-learn', !!(learn && learn.classList.contains('on'))); }
    sync();
    if (learn) new MutationObserver(sync).observe(learn, { attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
