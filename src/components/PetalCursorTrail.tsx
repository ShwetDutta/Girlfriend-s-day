import React, { useEffect, useState } from 'react';

interface CursorPetal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  opacity: number;
}

const PETAL_COLORS = ['#FADADD', '#F6E6E8', '#E8B7C0', '#C77D8A'];

export const PetalCursorTrail: React.FC = () => {
  const [petals, setPetals] = useState<CursorPetal[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.4) return; // limit density

      const newPetal: CursorPetal = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 10,
        rotation: Math.random() * 360,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        opacity: 0.9,
      };

      setPetals((prev) => [...prev.slice(-15), newPetal]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setPetals((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + 1.2,
            x: p.x + Math.sin(p.y * 0.05) * 0.8,
            rotation: p.rotation + 2,
            opacity: p.opacity - 0.03,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 30);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute transition-opacity duration-300"
          style={{
            left: `${petal.x}px`,
            top: `${petal.y}px`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            opacity: petal.opacity,
            transform: `translate(-50%, -50%) rotate(${petal.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-sm">
            <path
              d="M15,0 C25,10 30,25 20,38 C15,42 5,38 0,25 C-3,10 5,0 15,0 Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
