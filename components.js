/* ============================================================
   components.js — Centralised Header & Footer for innsæi
   Include this file in <head> on every page:
     <script src="components.js"></script>
   ============================================================ */

(function () {

  /* ── HEADER ─────────────────────────────────────────────── */
  const HEADER = `
<!-- TOP RIBBON -->
<div id="ribbon">
  <div class="ribbon-ticker">
    <span class="ribbon-item">Profile Optimisation</span>
    <span class="ribbon-item">Multi-Platform Distribution</span>
    <span class="ribbon-item">Targeted Outreach</span>
    <span class="ribbon-item">Interview Preparation</span>
    <span class="ribbon-item">Offer Conversion</span>
    <span class="ribbon-item">Post-Placement Support</span>
    <span class="ribbon-item">Profile Optimisation</span>
    <span class="ribbon-item">Multi-Platform Distribution</span>
    <span class="ribbon-item">Targeted Outreach</span>
    <span class="ribbon-item">Interview Preparation</span>
    <span class="ribbon-item">Post-Placement Support</span>
  </div>
  <div class="ribbon-right">Continuous Process — <span>Outcome Driven</span></div>
</div>

<!-- NAV -->
<nav id="nav">
  <a href="index.html" class="nav-logo">INN<em>SÆI</em></a>
  <div class="nav-center">
    <a href="index.html"    data-page="index">Home</a>
    <a href="about.html"    data-page="about">About</a>
    <a href="services.html" data-page="services">Services</a>
    <a href="marketing.html" data-page="marketing">Marketing</a>
    <a href="careers.html"  data-page="careers">Careers</a>
    <a href="terms.html"    data-page="terms">Terms &amp; Conditions</a>
  </div>
  <div class="nav-right">
    <span class="nav-tel">-</span>
    <a href="contact.html" class="btn-nav">Contact Us</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <a href="index.html"    data-page="index">Home</a>
  <a href="about.html"    data-page="about">About</a>
  <a href="services.html" data-page="services">Services</a>
  <a href="marketing.html" data-page="marketing">Marketing</a>
  <a href="careers.html"  data-page="careers">Careers</a>
  <a href="terms.html"    data-page="terms">Terms &amp; Conditions</a>
  <a href="contact.html" class="mobile-menu-cta">Contact Us</a>
</div>
<div class="mobile-overlay" id="mobileOverlay"></div>
`;

  /* ── FOOTER ─────────────────────────────────────────────── */
  const FOOTER = `
<footer>
  <div class="ft-main">
    <div>
      <span class="ft-brand-logo">INN<em>SÆI</em></span>
      <span class="ft-brand-sub">IT Recruitment · Non-IT Recruitment · Est. 2024</span>
      <p class="ft-brand-copy">A global technology &amp; talent partner for candidates who believe their most important chapter is still ahead of them.</p>
      <div class="ft-social" style="margin-top:24px;">
        <a href="https://www.linkedin.com/in/durgesh-brahmbhatt-02989025a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" class="ft-soc" title="LinkedIn">in</a>
        <a href="#" class="ft-soc">&#x1D54F;</a>
        <a href="#" class="ft-soc">fb</a>
      </div>
    </div>
    <div>
      <span class="ft-col-h">Navigate</span>
      <ul class="ft-list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="marketing.html">Marketing</a></li>
        <li><a href="careers.html">Careers</a></li>
        <li><a href="privacy-policy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms &amp; Conditions</a></li>
        <li><a href="faq.html">FAQs</a></li>
      </ul>
    </div>
    <div>
      <span class="ft-col-h">Services</span>
      <ul class="ft-list">
        <li><a href="marketing.html">Profile Optimisation</a></li>
        <li><a href="marketing.html">Multi-Platform Distribution</a></li>
        <li><a href="marketing.html">Targeted Outreach</a></li>
        <li><a href="marketing.html">Interview Preparation</a></li>
        <li><a href="marketing.html">Offer Conversion</a></li>
        <li><a href="marketing.html">Post-Placement Support</a></li>
        <li><a href="marketing.html">End-to-End Process</a></li>
      </ul>
    </div>
    <div class="ft-contact">
      <span class="ft-col-h">Contact</span>
      <strong>-</strong>
      <a href="tel:">-</a>
      <strong style="margin-top:16px;">Email</strong>
      <a href="mailto:info@innsaeiglobaltech.com">info@innsaeiglobaltech.com</a>
      <strong style="margin-top:16px;">Address</strong>
      <a href="contact.html">-</a>
    </div>
  </div>
  <div class="ft-base">
    <p class="ft-copy-text">&copy; <span id="ft-year"></span> <em>INNSÆI</em> All rights reserved.</p>
  </div>
</footer>
`;

  /* ── INJECT ──────────────────────────────────────────────── */

  // Header: inject synchronously right now — body exists because this
  // script tag is the first child of <body> on every page.
  document.body.insertAdjacentHTML('afterbegin', HEADER);

  // Mark active nav link based on current filename
  const page = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  document.querySelectorAll('[data-page]').forEach(function (el) {
    if (el.getAttribute('data-page') === page) {
      el.classList.add('active');
    }
  });

  // Footer: defer until the full page content has been parsed so it
  // lands at the true end of <body>, not right after the script tag.
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', FOOTER);
    const yearEl = document.getElementById('ft-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

})();
