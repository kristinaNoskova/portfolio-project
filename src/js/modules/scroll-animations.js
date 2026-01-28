const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

const SKILL_BAR_DELAY = 200;

let observer = null;
let animatedElements = null;

function animateSkillBar(skillElement) {
  const progressBar = skillElement.querySelector('.skill__progress');
  if (!progressBar) {
    return;
  }

  const width = progressBar.getAttribute('data-width');
  if (!width) {
    return;
  }

  setTimeout(() => {
    progressBar.style.width = `${width}%`;
  }, SKILL_BAR_DELAY);
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const target = entry.target;
    target.classList.add('visible');

    if (target.classList.contains('skill')) {
      animateSkillBar(target);
    }
  });
}

function showAllElements() {
  animatedElements.forEach((element) => {
    element.classList.add('visible');

    if (element.classList.contains('skill')) {
      animateSkillBar(element);
    }
  });
}

export function initScrollAnimations() {
  animatedElements = document.querySelectorAll('.fade-in');

  if (animatedElements.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    showAllElements();
    return;
  }

  observer = new IntersectionObserver(handleIntersection, OBSERVER_OPTIONS);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

export function destroyScrollAnimations() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  animatedElements = null;
}
