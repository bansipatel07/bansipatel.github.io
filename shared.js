(function () {
  'use strict';
  var NAV = [
    { href:'index.html',      ico:'🏠', label:'Home'       },
    { href:'about.html',      ico:'👤', label:'About'      },
    { href:'skills.html',     ico:'🛠',  label:'Skills'     },
    { href:'posts.html',      ico:'📌', label:'Posts'      },
    { href:'newsletter.html', ico:'📰', label:'Newsletter' }
  ];
  function curPage() {
    var p = location.pathname.split('/').pop();
    return (p && p.indexOf('.html') > -1) ? p : 'index.html';
  }
  function buildNav() {
    var cur = curPage();
    var lis = NAV.map(function (p) {
      var active = cur === p.href ? ' class="active"' : '';
      return '<li><a href="' + p.href + '"' + active + '><span class="ico">' + p.ico + '</span>' + p.label + '</a></li>';
    }).join('');
    var nav =
      '<nav class="navbar">' +
        '<div class="navbar-inner">' +
          '<a href="index.html" class="nav-logo">Bansi Patel</a>' +
          '<ul class="nav-links" id="navMenu">' + lis + '</ul>' +
          '<a href="contact.html" class="nav-contact">✉&nbsp; Contact</a>' +
          '<div class="nav-hamburger" id="navHam"><span></span><span></span><span></span></div>' +
        '</div>' +
      '</nav>';
    document.body.insertAdjacentHTML('afterbegin', nav);
    document.getElementById('navHam').addEventListener('click', function () {
      document.getElementById('navMenu').classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.getElementById('navMenu').classList.remove('open');
      });
    });
  }
  function buildFooter() {
    var navLinks = NAV.map(function (p) {
      return '<li><a href="' + p.href + '">' + p.label + '</a></li>';
    }).join('') + '<li><a href="contact.html">Contact</a></li>';
    var foot =
      '<footer>' +
        '<div class="footer-body">' +
          '<div>' +
            '<div class="fb-brand">Bansi Patel</div>' +
            '<p class="fb-tagline">HR Manager helping organizations grow through strategic people management, inclusive culture building, and data-driven HR practices.</p>' +
            '<div class="fb-social">' +
              '<a href="https://linkedin.com/in/bansi-patel-hr" target="_blank" class="fsoc">in</a>' +
              '<a href="mailto:hrrecruiter.b07@gmail.com" class="fsoc">✉</a>' +
            '</div>' +
          '</div>' +
          '<div><div class="fc-title">Navigate</div><ul class="fc-links">' + navLinks + '</ul></div>' +
          '<div><div class="fc-title">Expertise</div><ul class="fc-links">' +
            '<li><a href="skills.html">Talent Development</a></li>' +
            '<li><a href="skills.html">Performance Management</a></li>' +
            '<li><a href="skills.html">Organizational Development</a></li>' +
            '<li><a href="skills.html">Employee Engagement</a></li>' +
            '<li><a href="skills.html">Leadership Development</a></li>' +
          '</ul></div>' +
          '<div><div class="fc-title">Contact</div><ul class="fc-links">' +
            '<li><a href="mailto:hrrecruiter.b07@gmail.com">hrrecruiter.b07@gmail.com</a></li>' +
            '<li><a href="https://linkedin.com/in/bansi-patel-hr" target="_blank">linkedin.com/in/bansi-patel-hr</a></li>' +
            '<li style="color:rgba(255,255,255,.22);font-size:.8rem;margin-top:4px;cursor:default">Ahmedabad, Gujarat, India</li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-foot">' +
          '<span class="footer-copy">© 2025 Bansi Patel. All rights reserved.</span>' +
          '<div class="f-foot-links"><a href="index.html">Home</a><a href="about.html">About</a><a href="contact.html">Contact</a></div>' +
        '</div>' +
      '</footer>';
    document.body.insertAdjacentHTML('beforeend', foot);
  }
  function initReveal() {
    if (!window.IntersectionObserver) {
      document.querySelectorAll('[data-sr]').forEach(function (el) { el.classList.add('revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-sr]').forEach(function (el) { io.observe(el); });
  }
  function initCounters() {
    var els = document.querySelectorAll('.m-num[data-count]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseInt(el.getAttribute('data-count'), 10);
        var sup = el.querySelector('sup') ? el.querySelector('sup').outerHTML : '';
        var t0 = null, dur = 1400;
        (function tick(ts) {
          if (!t0) t0 = ts;
          var pct = Math.min((ts - t0) / dur, 1), ease = 1 - Math.pow(1 - pct, 3);
          el.innerHTML = Math.floor(ease * target) + sup;
          if (pct < 1) requestAnimationFrame(tick); else el.innerHTML = target + sup;
        })(performance.now());
        var item = el.closest('.m-item'); if (item) item.classList.add('revealed');
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }
  document.addEventListener('DOMContentLoaded', function () { buildNav(); buildFooter(); initReveal(); initCounters(); });
}());
