import { RefObject, useEffect } from 'react';
import gsap from 'gsap';

export const useFadeOut = <T>(
  ref: RefObject<HTMLElement | null>,
  deps: T,
  onComplete: () => void,
) => {
  useEffect(() => {
    if (!ref.current) return;

    const fadeOut = gsap.to(ref.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete,
    });

    return () => {
      fadeOut.kill();
    };
  }, [deps]);
};
