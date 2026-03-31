import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When any child with class `sec-item` enters the viewport,
 * it gets the `in-view` class which starts its CSS animation.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold }
    );
    el.querySelectorAll('.sec-item').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return ref;
}