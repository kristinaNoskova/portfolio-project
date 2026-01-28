export function initAccordion () {
  const accordionButtons = document.querySelectorAll('.experience__button');

  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const contentId = button.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      button.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('is-open');
    });
  });
}
