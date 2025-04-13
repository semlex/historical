import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useAnimateNumber = (
  value: number,
  ref: React.RefObject<HTMLElement | null>,
) => {
  const prev = useRef(value);

  useEffect(() => {
    if (ref.current && prev.current !== value) {
      const obj = { val: prev.current };

      gsap.to(obj, {
        val: value,
        duration: 0.3,
        ease: 'none',
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(obj.val).toString();
          }
        },
      });

      prev.current = value;
    }
  }, [value, ref]);
};
