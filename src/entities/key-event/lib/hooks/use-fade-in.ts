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
        onStart: () => {
          if (!ref.current) return;
          ref.current.style.display = 'none';
        },
      },
      {
        opacity: 1,
        y: 0,
        display: 'block',
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05,
        onStart: () => {
          if (!ref.current) return;
          ref.current.style.display = 'block';
        },
      },
    );
  }, [deps]);
};
