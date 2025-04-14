import { RefObject } from 'react';
import gsap from 'gsap';

export const useFadeOut = (ref: RefObject<HTMLElement | null>) => {
  return () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      opacity: 0,
      duration: 0.5,
      ease: '',
    });
  };
};
