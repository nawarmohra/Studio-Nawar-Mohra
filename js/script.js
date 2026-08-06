const loader = document.querySelector('.loader');
const loaderWord = document.querySelector('.loader__word');
const greetings = ['Hello', 'Hej', 'Bonjour', 'مرحبا'];
let greetingIndex = 0;

const greetingTimer = loaderWord ? setInterval(() => {
  greetingIndex = (greetingIndex + 1) % greetings.length;
  loaderWord.textContent = greetings[greetingIndex];
}, 230) : null;

window.addEventListener('load', () => {
  setTimeout(() => {
    if (greetingTimer) clearInterval(greetingTimer);
    if (loader) loader.classList.add('is-hidden');
  }, 900);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function closeMenu() {
  if (!menuButton || !nav) return;

  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  menuButton.classList.remove('is-open');

  nav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
}

function openMenu() {
  if (!menuButton || !nav) return;

  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.textContent = 'Close';
  menuButton.classList.add('is-open');

  nav.classList.add('is-open');
  document.body.classList.add('nav-open');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen =
      menuButton.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const siteHeader = document.querySelector('.site-header');

function updateHeader() {
  if (!siteHeader) return;

  siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });