// shared.js — injects nav and footer into every page

const NAV_ITEMS = [
  { href:'index.html',      icon:'🏠', label:'Home' },
  { href:'about.html',      icon:'👤', label:'About' },
  { href:'skills.html',     icon:'🛠', label:'Skills' },
  { href:'posts.html',      icon:'📌', label:'Posts' },
  { href:'newsletter.html', icon:'📰', label:'Newsletter' },
  { href:'contact.html',    icon:'✉',  label:'Contact', cta:true },
];

function buildNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const topbar = `
  <div class="topbar">
    <span>HR Manager · Organizational Development · Strategic HR · People &amp; Culture</span>
    <div class="topbar-right">
      <a href="mailto:hrrecruiter.b07@gmail.com">hrrecruiter.b07@gmail.com</a>
      <span>|</span>
      <a href="https://linkedin.com/in/bansi-patel-hr" target="_blank">LinkedIn</a>
    </div>
  </div>`;

  const links = NAV_ITEMS.map(n => {
    const active = page === n.href ? 'active' : '';
    const cta    = n.cta ? 'nav-cta-btn' : '';
    return `<li><a href="${n.href}" class="${active} ${cta}"><span class="nav-icon">${n.icon}</span>${n.label}</a></li>`;
  }).join('');

  const navbar = `
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="index.html" class="nav-logo">Bansi <span>Patel</span></a>
      <ul class="nav-menu" id="navMenu">${links}</ul>
      <div class="hamburger" onclick="document.getElementById('navMenu').classList.toggle('open')">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', navbar + topbar);
}

function buildFooter() {
  const footer = `
  <footer>
    <div class="footer-main">
      <div>
        <div class="footer-brand">Bansi <span>Patel</span></div>
        <p class="footer-tagline">HR Manager driving organizational growth through strategic people management, inclusive culture, and data-driven HR practices.</p>
        <div class="footer-social">
          <a href="https://linkedin.com/in/bansi-patel-hr" target="_blank" class="fsoc" title="LinkedIn">in</a>
          <a href="mailto:hrrecruiter.b07@gmail.com" class="fsoc" title="Email">✉</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <ul class="footer-links">
          ${NAV_ITEMS.map(n=>`<li><a href="${n.href}">${n.label}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Expertise</div>
        <ul class="footer-links">
          <li><a href="skills.html">Talent Development</a></li>
          <li><a href="skills.html">Performance Management</a></li>
          <li><a href="skills.html">Organizational Development</a></li>
          <li><a href="skills.html">Employee Engagement</a></li>
          <li><a href="skills.html">HR Policy Design</a></li>
          <li><a href="skills.html">Leadership Development</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <ul class="footer-links">
          <li><a href="mailto:hrrecruiter.b07@gmail.com">hrrecruiter.b07@gmail.com</a></li>
          <li><a href="https://linkedin.com/in/bansi-patel-hr" target="_blank">linkedin.com/in/bansi-patel-hr</a></li>
          <li style="color:rgba(255,255,255,.4);font-size:.84rem;margin-top:6px;">Ahmedabad, Gujarat, India</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2025 Bansi Patel. All rights reserved.</span>
      <div class="footer-bottom-links">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', footer);
}

function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sr,.sr-l,.sr-r').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  initScrollReveal();
});
