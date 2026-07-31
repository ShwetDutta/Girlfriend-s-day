import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speedY: number;
  speedX: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  shapeType: number;
}

const PETAL_COLORS = ['#FADADD', '#F6E6E8', '#E8B7C0', '#C77D8A', '#E098A6'];

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate initial petals
    const initialPetals: Petal[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      rotation: Math.random() * 360,
      speedY: Math.random() * 0.15 + 0.05,
      speedX: Math.sin(i) * 0.08,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.35,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      shapeType: i % 3,
    }));

    setPetals(initialPetals);

    let animationFrameId: number;

    const animate = () => {
      setPetals((prevPetals) =>
        prevPetals.map((petal) => {
          let newY = petal.y + petal.speedY;
          let newX = petal.x + Math.sin(newY * 0.05) * 0.08 + petal.speedX;
          let newRotation = petal.rotation + petal.rotationSpeed;

          if (newY > 105) {
            newY = -5;
            newX = Math.random() * 100;
          }

          return {
            ...petal,
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute transition-transform ease-linear"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          {petal.shapeType === 0 ? (
            /* Oval Rose Petal */
            <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-sm">
              <path
                d="M15,0 C25,10 30,25 20,38 C15,42 5,38 0,25 C-3,10 5,0 15,0 Z"
                fill={petal.color}
              />
            </svg>
          ) : petal.shapeType === 1 ? (
            /* Curved Heart Petal */
            <svg viewBox="0 0 30 35" className="w-full h-full drop-shadow-sm">
              <path
                d="M15,5 C18,0 28,2 29,12 C30,22 18,32 15,35 C12,32 0,22 1,12 C2,2 12,0 15,5 Z"
                fill={petal.color}
              />
            </svg>
          ) : (
            /* Blossom Leaf Petal */
            <svg viewBox="0 0 25 35" className="w-full h-full drop-shadow-sm">
              <path
                d="M12.5,0 C22,12 25,25 12.5,35 C0,25 3,12 12.5,0 Z"
                fill={petal.color}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
