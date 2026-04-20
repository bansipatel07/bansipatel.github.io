/* shared.js — nav + footer + scroll reveal for all pages */
(function () {

  const PAGES = [
    { href:'index.html',      ico:'🏠', label:'Home' },
    { href:'about.html',      ico:'👤', label:'About' },
    { href:'skills.html',     ico:'🛠', label:'Skills' },
    { href:'posts.html',      ico:'📌', label:'Posts' },
    { href:'newsletter.html', ico:'📰', label:'Newsletter' },
  ];

  const cur = location.pathname.split('/').pop() || 'index.html';

  /* ── NAV ── */
  function buildNav() {
    const links = PAGES.map(p => {
      const active = cur === p.href ? 'active' : '';
      return `<li><a href="${p.href}" class="${active}"><span class="nav-ico">${p.ico}</span>${p.label}</a></li>`;
    }).join('');

    const html = `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="nav-logo">Bansi Patel</a>
        <ul class="nav-center" id="navMenu">${links}</ul>
        <a href="contact.html" class="nav-center nav-cta" style="display:flex;align-items:center;gap:6px;padding:9px 20px;border-radius:8px;font-size:.82rem;font-weight:700;color:#fff;text-decoration:none;">✉ Contact</a>
        <div class="hamburger" onclick="document.getElementById('navMenu').classList.toggle('open')" style="margin-left:12px">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>`;
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ── FOOTER ── */
  function buildFooter() {
    const navLinks = PAGES.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('');
    const html = `
    <footer>
      <div class="footer-main">
        <div>
          <div class="footer-brand">Bansi Patel</div>
          <p class="footer-tagline">HR Manager driving organizational growth through strategic people management, inclusive culture building, and data-driven HR practices.</p>
          <div class="footer-social">
            <a href="https://linkedin.com/in/bansi-patel-hr" target="_blank" class="fsoc" title="LinkedIn">in</a>
            <a href="mailto:hrrecruiter.b07@gmail.com" class="fsoc" title="Email">✉</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Navigate</div>
          <ul class="footer-links">${navLinks}<li><a href="contact.html">Contact</a></li></ul>
        </div>
        <div>
          <div class="footer-col-title">Expertise</div>
          <ul class="footer-links">
            <li><a href="skills.html">Talent Development</a></li>
            <li><a href="skills.html">Performance Management</a></li>
            <li><a href="skills.html">Organizational Development</a></li>
            <li><a href="skills.html">Employee Engagement</a></li>
            <li><a href="skills.html">Leadership Development</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Contact</div>
          <ul class="footer-links">
            <li><a href="mailto:hrrecruiter.b07@gmail.com">hrrecruiter.b07@gmail.com</a></li>
            <li><a href="https://linkedin.com/in/bansi-patel-hr" target="_blank">linkedin.com/in/bansi-patel-hr</a></li>
            <li style="color:rgba(255,255,255,.2);font-size:.8rem;margin-top:6px;cursor:default">Ahmedabad, Gujarat, India</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2025 Bansi Patel. All rights reserved.</span>
        <div class="footer-links-row">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
  }

  /* ── COUNTER ANIMATION ── */
  function initCounters() {
    const items = document.querySelectorAll('.metric-num');
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count || el.textContent) || 0;
        const sup = el.querySelector('sup') ? el.querySelector('sup').outerHTML : '';
        let start = 0, dur = 1600;
        const step = ts => {
          if (!start) start = ts;
          const pct = Math.min((ts - start) / dur, 1);
          el.innerHTML = Math.floor(pct * target) + sup;
          if (pct < 1) requestAnimationFrame(step);
          else el.innerHTML = target + sup;
        };
        requestAnimationFrame(step);
        e.target.closest('.metric-item')?.classList.add('visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    items.forEach(el => {
      el.dataset.count = parseInt(el.textContent) || 0;
      obs.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    initReveal();
    initCounters();
  });

})();
