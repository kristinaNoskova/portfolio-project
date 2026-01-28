const HEADER_OFFSET = 70;
const SCROLL_OFFSET = 100;

let nav, navToggle, navMenu, navLinks, sections;
let activeSection = 'home';

function cacheElements() {
  nav = document.getElementById('header');
  navToggle = document.getElementById('nav-toggle');
  navMenu = document.getElementById('nav-menu');
  navLinks = document.querySelectorAll('.nav__link');
  sections = document.querySelectorAll('.section, .hero');

  if (!nav || !navToggle || !navMenu || navLinks.length === 0) {
    return false;
  }

  return true;
}

function updateActiveNav() {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeSection}`;
    link.classList.toggle('active', isActive);
  });
}

function toggleMobileMenu() {
  const isOpen = navMenu.classList.toggle('show');
  navToggle.classList.toggle('active', isOpen);
}

function closeMobileMenu() {
  if (!navMenu.classList.contains('show')) {
    return;
  }

  navMenu.classList.remove('show');
  navToggle.classList.remove('active');
}

function smoothScrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);
  if (!targetSection) {
    return;
  }

  const offsetTop = targetId === '#home'
    ? 0
    : targetSection.offsetTop - HEADER_OFFSET;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
}

function updateActiveNavOnScroll() {
  const scrollPos = window.scrollY + SCROLL_OFFSET;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      if (activeSection !== sectionId) {
        activeSection = sectionId;
        updateActiveNav();
      }
      break;
    }
  }
}

function handleNavLinkClick(e) {
  e.preventDefault();

  const href = e.currentTarget.getAttribute('href');

  closeMobileMenu();

  smoothScrollToSection(href);
}

function handleOutsideClick(e) {
  if (!nav.contains(e.target)) {
    closeMobileMenu();
  }
}

function attachEventListeners() {
  navToggle.addEventListener('click', toggleMobileMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', handleNavLinkClick);
  });

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

  document.addEventListener('click', handleOutsideClick);
}

export function initNavigation() {
  if (!cacheElements()) {
    return;
  }

  updateActiveNav();

  attachEventListeners();
}
