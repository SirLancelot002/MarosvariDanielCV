import { useEffect, useState } from 'react';

type Quality = 'low' | 'medium' | 'high';
const STORAGE_KEY = 'cv-site-quality-pref';

function getStaticHint(): Quality {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as any).deviceMemory ?? 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

function useAdaptiveQuality(): Quality {
  const [quality, setQuality] = useState<Quality>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Quality | null;
    return saved ?? getStaticHint();
  });

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    let frameCount = 0;
    let rafId: number;
    const start = performance.now();

    const tick = () => {
      frameCount++;
      const elapsed = performance.now() - start;
      if (elapsed < 1000) {
        rafId = requestAnimationFrame(tick);
      } else {
        const fps = (frameCount / elapsed) * 1000;
        const measured: Quality = fps >= 50 ? 'high' : fps >= 30 ? 'medium' : 'low';
        setQuality(measured);
        localStorage.setItem(STORAGE_KEY, measured);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return quality;
}

export default useAdaptiveQuality;