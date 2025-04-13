import { RefObject, useEffect } from 'react';
import gsap from 'gsap';

export const useFadeIn = <T>(ref: RefObject<HTMLElement | null>, deps: T) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        display: 'block',
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.05,
      },
    );
  }, [deps]);
};
