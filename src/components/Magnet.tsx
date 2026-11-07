import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 3.5,
  padding = 40,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distLeft = rect.left - padding;
      const distRight = rect.right + padding;
      const distTop = rect.top - padding;
      const distBottom = rect.bottom + padding;

      if (
        e.clientX >= distLeft &&
        e.clientX <= distRight &&
        e.clientY >= distTop &&
        e.clientY <= distBottom
      ) {
        setIsHovered(true);
        const offsetX = (e.clientX - centerX) / strength;
        const offsetY = (e.clientY - centerY) / strength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, padding]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};
