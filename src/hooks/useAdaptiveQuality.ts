import { useEffect, useState } from 'react';

export type Quality = 'low' | 'medium' | 'high';

const STORAGE_KEY = 'cv-site-quality-pref';
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // re-measure once a week
const QUALITY_CHANGE_EVENT = 'cv-site-quality-change';

interface StoredQuality {
  value: Quality;
  timestamp: number;
}

function getStaticHint(): Quality {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as any).deviceMemory ?? 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

function readCached(): Quality | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed: StoredQuality = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > EXPIRY_MS) return null; // expired, re-measure
    return parsed.value;
  } catch {
    return null;
  }
}

function writeCached(value: Quality) {
  const data: StoredQuality = { value, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function useAdaptiveQuality(): Quality {
  const [quality, setQuality] = useState<Quality>(() => readCached() ?? getStaticHint());

  useEffect(() => {
    if (readCached()) return; // still valid, skip re-measuring

    let frameCount = 0;
    let rafId: number;
    const warmupMs = 300; // ignore the first ~300ms (page-load jank, layout thrashing)
    const sampleMs = 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < warmupMs) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      frameCount++;
      if (elapsed < warmupMs + sampleMs) {
        rafId = requestAnimationFrame(tick);
      } else {
        const fps = (frameCount / sampleMs) * 1000;
        const measured: Quality = fps >= 50 ? 'high' : fps >= 30 ? 'medium' : 'low';
        setQuality(measured);
        writeCached(measured);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Pick up manual quality changes made elsewhere (e.g. the quality menu) without a reload
  useEffect(() => {
    const onManualChange = (e: Event) => {
      const detail = (e as CustomEvent<Quality>).detail;
      if (detail) setQuality(detail);
    };
    window.addEventListener(QUALITY_CHANGE_EVENT, onManualChange);
    return () => window.removeEventListener(QUALITY_CHANGE_EVENT, onManualChange);
  }, []);

  return quality;
}

export function setManualQuality(value: Quality) {
  writeCached(value);
  window.dispatchEvent(new CustomEvent<Quality>(QUALITY_CHANGE_EVENT, { detail: value }));
}

export function clearQualityCache() {
  localStorage.removeItem(STORAGE_KEY);
}

export default useAdaptiveQuality;