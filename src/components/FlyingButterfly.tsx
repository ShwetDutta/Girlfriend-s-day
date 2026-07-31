import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const FlyingButterfly: React.FC = () => {
  const [butterfly, setButterfly] = useState<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  useEffect(() => {
    const triggerButterfly = () => {
      const startX = -50;
      const startY = Math.random() * 60 + 20; // 20% to 80% viewport height
      const endX = window.innerWidth + 50;
      const endY = startY + (Math.random() * 200 - 100);

      setButterfly({
        id: Date.now(),
        startX,
        startY,
        endX,
        endY,
      });

      // Clear after flight
      setTimeout(() => {
        setButterfly(null);
      }, 12000);
    };

    // Trigger initial butterfly after 5s, then every 20-30s
    const firstTimeout = setTimeout(triggerButterfly, 4000);
    const interval = setInterval(triggerButterfly, 22000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!butterfly) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <motion.div
        key={butterfly.id}
        initial={{ x: butterfly.startX, y: `${butterfly.startY}vh`, opacity: 0 }}
        animate={{
          x: butterfly.endX,
          y: [`${butterfly.startY}vh`, `${butterfly.startY - 10}vh`, `${butterfly.startY + 10}vh`, `${butterfly.startY}vh`],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 12, ease: "easeInOut" }}
        className="absolute w-8 h-8 text-[#C77D8A]"
      >
        <div className="relative w-full h-full animate-bounce">
          {/* Animated Butterfly SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E8B7C0] stroke-[#C77D8A]">
            <g className="animate-pulse">
              <path d="M50,50 Q20,10 10,40 Q20,70 50,50 Z" fill="#FADADD" opacity="0.9" />
              <path d="M50,50 Q80,10 90,40 Q80,70 50,50 Z" fill="#FADADD" opacity="0.9" />
              <path d="M50,50 Q25,80 15,60 Q30,50 50,50 Z" fill="#E8B7C0" opacity="0.8" />
              <path d="M50,50 Q75,80 85,60 Q70,50 50,50 Z" fill="#E8B7C0" opacity="0.8" />
              <circle cx="50" cy="50" r="3" fill="#8C5A66" />
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
