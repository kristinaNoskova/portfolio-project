import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'iconify-icon';

import { initTypingAnimation } from './modules/typing-animation.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollToTop } from './modules/scroll-to-top.js';
import {initProjectsSlider} from './modules/projects-slider.js';
import { initAccordion } from './modules/accordion.js';

const TYPING_WORDS = ['Frontend Developer', 'Веб-разработчик', 'Создаю красивые сайты'];

document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.getElementById('typing-text');

  initTypingAnimation(typingText, TYPING_WORDS);
  initScrollAnimations();
  initNavigation();
  initScrollToTop();
  initProjectsSlider();
  initAccordion();
});
