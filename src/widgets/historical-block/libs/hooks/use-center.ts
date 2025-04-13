import { useState, useEffect, RefObject } from 'react';

export const useCenter = (
  containerRef: RefObject<HTMLElement | null>,
  elementRef: RefObject<HTMLElement | null>,
) => {
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const updateCenter = () => {
    if (containerRef.current && elementRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();

      const centerX =
        elementRect.left + elementRect.width / 2 - containerRect.left;
      const centerY =
        elementRect.top + elementRect.height / 2 - containerRect.top;

      setCenter({ x: centerX, y: centerY });
    }
  };

  useEffect(() => {
    updateCenter();
    window.addEventListener('resize', updateCenter);

    return () => {
      window.removeEventListener('resize', updateCenter);
    };
  }, [containerRef, elementRef]);

  return center;
};
