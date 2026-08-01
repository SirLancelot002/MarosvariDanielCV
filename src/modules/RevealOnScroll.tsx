import { useEffect, useRef, useState, type ReactNode } from 'react';
import './RevealOnScroll.css';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

function RevealOnScroll({ children, className = '', threshold = 0.15 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // only animate in once
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default RevealOnScroll;