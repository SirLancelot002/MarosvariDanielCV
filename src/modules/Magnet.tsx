import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';

interface MagnetPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number | MagnetPadding;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

function resolvePadding(padding: number | MagnetPadding): Required<MagnetPadding> {
  if (typeof padding === 'number') {
    const safePadding = Math.max(0, padding);
    return {
      top: safePadding,
      right: safePadding,
      bottom: safePadding,
      left: safePadding
    };
  }

  const defaultPadding = 100;
  return {
    top: Math.max(0, padding.top ?? defaultPadding),
    right: Math.max(0, padding.right ?? defaultPadding),
    bottom: Math.max(0, padding.bottom ?? defaultPadding),
    left: Math.max(0, padding.left ?? defaultPadding)
  };
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const sidePadding = resolvePadding(padding);

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const inHorizontalRange = e.clientX >= left - sidePadding.left && e.clientX <= left + width + sidePadding.right;
      const inVerticalRange = e.clientY >= top - sidePadding.top && e.clientY <= top + height + sidePadding.bottom;

      if (inHorizontalRange && inVerticalRange) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);

  const transitionStyle = isActive ? activeTransition : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
