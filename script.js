'use strict';

/* =========================================================
   Personal Portfolio — script.js
   ========================================================= */

// ---- Mobile nav toggle ----
const menuButton = document.querySelector('[data-testid="mobile-nav-toggle"]');
const mobileNav  = document.getElementById('mobile-nav');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  mobileNav?.classList.toggle('is-open');
  if (mobileNav) {
    mobileNav.setAttribute('aria-hidden', String(expanded));
  }
});

// Close mobile nav when a link is clicked
mobileNav?.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

// ---- Login modal ----
const loginModal = document.getElementById('login-modal');
const modalClose = document.getElementById('modal-close');

function openLoginModal() {
  if (!loginModal) return;
  loginModal.classList.add('is-open');
  loginModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Focus the first input after transition
  setTimeout(() => {
    loginModal.querySelector('input')?.focus();
  }, 260);
}

function closeLoginModal() {
  if (!loginModal) return;
  loginModal.classList.remove('is-open');
  loginModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  clearLoginError();
}

// All login trigger buttons
['login-trigger', 'mobile-login-trigger', 'cta-login-trigger'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', openLoginModal);
});

modalClose?.addEventListener('click', closeLoginModal);

// Close on backdrop click
loginModal?.addEventListener('click', (e) => {
  if (e.target === loginModal) closeLoginModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && loginModal?.classList.contains('is-open')) {
    closeLoginModal();
  }
});

// ---- Login form handling ----
const loginForm  = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

function clearLoginError() {
  if (loginError) loginError.textContent = '';
}

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  clearLoginError();

  const email    = loginForm.querySelector('#login-email')?.value.trim();
  const password = loginForm.querySelector('#login-password')?.value;

  if (!email || !password) {
    if (loginError) loginError.textContent = 'Please enter your email and password.';
    return;
  }

  // Demo: show loading state then a friendly message
  const submitBtn = loginForm.querySelector('[type="submit"]');
  if (submitBtn) {
    submitBtn.textContent = 'Signing in\u2026';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    if (loginError) {
      loginError.style.color = '#16a34a';
      loginError.textContent = '\u2714 Authenticated. Redirecting to your portal\u2026';
    }
    setTimeout(closeLoginModal, 1800);
    if (submitBtn) {
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
    }
  }, 1200);
});

// ---- Primary CTA "See How I Work" demo button ----
const demoBtn = document.querySelector('[data-testid="interactive-demo"]');
// The button in the hero triggers smooth scroll to the process section
demoBtn?.addEventListener('click', () => {
  const processSection = document.getElementById('process');
  if (processSection) {
    processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ---- Smooth scrolling for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      mobileNav?.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });
});

// ---- Scroll-triggered fade-in ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.feature-card, .screen-card, .process-step').forEach(el => {
  revealObserver.observe(el);
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav-link--active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => activeObserver.observe(section));
