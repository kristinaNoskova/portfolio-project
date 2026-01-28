const VISIBILITY_THRESHOLD = 300;

let scrollTopBtn = null;

function toggleVisibility() {
  const shouldShow = window.scrollY > VISIBILITY_THRESHOLD;
  scrollTopBtn.classList.toggle('show', shouldShow);
}

function scrollToTop(e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export function initScrollToTop() {
  scrollTopBtn = document.getElementById('scroll-top');

  if (!scrollTopBtn) {
    return;
  }

  toggleVisibility();

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  scrollTopBtn.addEventListener('click', scrollToTop);
}
