const TYPE_SPEED = 100;
const DELETE_SPEED = 50;
const PAUSE_TIME = 2000;

let typingTimeout = null;

export function initTypingAnimation(element, words) {
  if (!element || !words || words.length === 0) {
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeout = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIndex === currentWord.length) {
      timeout = PAUSE_TIME;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    typingTimeout = setTimeout(() => type(), timeout);
  }

  type();
}

export function stopTypingAnimation() {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
}
