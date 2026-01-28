import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const applyStageEffect = (swiper) => {
  swiper.slides.forEach((slide) => {
    const progress = slide.progress;
    if (isNaN(progress)) {
      return;
    }

    const absProgress = Math.abs(progress);

    const scale = 1 - absProgress * 0.15;
    const opacity = Math.max(1 - absProgress * 0.4, 0.1);
    const translateZ = -absProgress * 250;
    const rotateY = progress * 30;
    const translateX = progress * -10;

    slide.style.transform = `
      translateX(${translateX}%)
      translateZ(${translateZ}px)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;
    slide.style.opacity = opacity;
    slide.style.zIndex = Math.round(10 - absProgress);
  });
};

export function initProjectsSlider() {
  const sliderElement = document.querySelector('.projects__swiper');
  if (!sliderElement) {
    return;
  }

  return new Swiper(sliderElement, {
    modules: [Navigation],
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    speed: 1000,
    watchSlidesProgress: true,
    navigation: {
      prevEl: '.projects__prev',
      nextEl: '.projects__next',
    },

    on: {
      init(swiper) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            swiper.update();
            applyStageEffect(swiper);
          });
        });
      },
      setTranslate: applyStageEffect,

      setTransition(swiper, speed) {
        swiper.slides.forEach((slide) => {
          slide.style.transitionDuration = `${speed}ms`;
        });
      }
    },
  });
}
