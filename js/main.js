/* ============================================================
   HAUS COMMUNITY FOTOGRAFÍA — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- HEADER: scroll & active nav ---- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  }, { passive: true });

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }

  /* ---- MOBILE MENU ---- */
  const menuBtn    = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.header__mobile-link');

  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  /* ---- REVEAL ANIMATION ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- PORTFOLIO FILTER ---- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---- LIGHTBOX ---- */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbCaption   = document.getElementById('lightbox-caption');
  const lbClose     = document.getElementById('lightbox-close');
  const lbPrev      = document.getElementById('lightbox-prev');
  const lbNext       = document.getElementById('lightbox-next');

  let visibleItems  = [];
  let currentIdx    = 0;

  function getVisible() {
    return Array.from(portfolioItems).filter(i => !i.classList.contains('hidden'));
  }

  function openLightbox(idx) {
    visibleItems = getVisible();
    currentIdx   = idx;
    showSlide(currentIdx);
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showSlide(idx) {
    const item = visibleItems[idx];
    if (!item) return;
    lbImg.src    = item.dataset.img;
    lbImg.alt    = item.dataset.alt || '';
    lbCaption.textContent = item.dataset.alt || '';
  }

  portfolioItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      visibleItems = getVisible();
      const visIdx = visibleItems.indexOf(item);
      openLightbox(visIdx > -1 ? visIdx : 0);
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        visibleItems = getVisible();
        const visIdx = visibleItems.indexOf(item);
        openLightbox(visIdx > -1 ? visIdx : 0);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length;
    showSlide(currentIdx);
  });
  lbNext.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % visibleItems.length;
    showSlide(currentIdx);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')  { currentIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length; showSlide(currentIdx); }
      if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % visibleItems.length; showSlide(currentIdx); }
    }
  });

  /* ---- SMOOTH SCROLL (for browsers that don't support CSS scroll-behavior) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- INIT ---- */
  updateActiveNav();
})();
