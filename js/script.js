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

if (menuButton && nav) menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? 'Menu' : 'Close';
  menuButton.classList.toggle('is-open', !open);
  nav.classList.toggle('is-open', !open);
});

if (nav && menuButton) nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    menuButton.classList.remove('is-open');
    nav.classList.remove('is-open');
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
