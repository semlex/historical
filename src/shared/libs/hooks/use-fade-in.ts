import { RefObject } from 'react';
import gsap from 'gsap';

export const useFadeIn = (ref: RefObject<HTMLElement | null>) => {
  return () => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power1.inOut',
        stagger: 0.05,
      },
    );
  };
};
