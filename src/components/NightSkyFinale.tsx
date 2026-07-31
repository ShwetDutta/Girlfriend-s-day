import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { Heart, Sparkles, Moon, Star, X, Gift, RefreshCw } from 'lucide-react';

interface NightSkyFinaleProps {
  heading: string;
  subheading: string;
  buttonText: string;
  girlfriendName: string;
  senderName: string;
  surpriseLines: string[];
  loveMessage: string;
  foreverPrompt: string;
  onReplayIntro: () => void;
}

export const NightSkyFinale: React.FC<NightSkyFinaleProps> = ({
  heading,
  subheading,
  buttonText,
  girlfriendName,
  senderName,
  surpriseLines,
  loveMessage,
  foreverPrompt,
  onReplayIntro,
}) => {
  const [showFullNightSky, setShowFullNightSky] = useState(false);
  const [revealStep, setRevealStep] = useState(0);

  // Trigger night sky surprise sequence
  const triggerSurpriseSequence = () => {
    soundFx.playChime(783.99); // high G chime
    setShowFullNightSky(true);
    setRevealStep(1);

    // Confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FADADD', '#E8B7C0', '#C77D8A', '#FFD700', '#FFFFFF'],
    });

    // Step sequence timer for text fade ins
    setTimeout(() => setRevealStep(2), 2200);
    setTimeout(() => setRevealStep(3), 4500);
    setTimeout(() => setRevealStep(4), 6800);
  };

  return (
    <section id="night-sky" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#1C1427] via-[#2A1B35] to-[#120B19] text-white flex flex-col justify-center items-center overflow-hidden">
      
      {/* Twinkling Night Stars & Crescent Moon Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Crescent Moon Graphic */}
        <div className="absolute top-12 right-12 md:top-20 md:right-24 w-24 h-24 md:w-32 md:h-32 text-[#FFE3B3]/90 drop-shadow-[0_0_20px_rgba(255,227,179,0.4)] animate-pulse-glow">
          <Moon className="w-full h-full fill-[#FFE3B3]" />
        </div>

        {/* Twinkling Star Field */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-80 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Floating Golden Fireflies */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`ff-${i}`}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_12px_#FFD700]"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
          />
        ))}
      </div>

      {/* Center Finale Message Card */}
      <div className="relative z-20 max-w-2xl text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#FADADD] bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            Under The Stars
          </span>

          <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#FADADD] font-bold leading-tight mb-4 drop-shadow-md whitespace-pre-line">
            "{heading}"
          </h2>

          <p className="font-cormorant text-xl sm:text-2xl text-white/80 max-w-lg mx-auto mb-8">
            {subheading}
          </p>

          <p className="font-playfair text-2xl sm:text-3xl text-[#E8B7C0] font-semibold mb-10">
            ❤️ Happy National Girlfriend's Day, {girlfriendName} ❤️
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={triggerSurpriseSequence}
              className="px-8 py-4 bg-gradient-to-r from-[#E8B7C0] via-[#C77D8A] to-[#E8B7C0] text-white font-sans text-base font-semibold rounded-full shadow-[0_10px_25px_rgba(232,183,192,0.4)] hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Gift className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
              <span>{buttonText}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onReplayIntro();
              }}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 font-sans text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Replay Intro Envelope</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Magical Night Sky Transition Overlay */}
      <AnimatePresence>
        {showFullNightSky && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#0B0711] via-[#1A0F2B] to-[#07040B] text-white flex flex-col items-center justify-center px-6 overflow-hidden select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFullNightSky(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Moon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-10 md:top-16 w-32 h-32 md:w-44 md:h-44 text-[#FFE3B3] drop-shadow-[0_0_35px_rgba(255,227,179,0.6)]"
            >
              <Moon className="w-full h-full fill-[#FFE3B3]" />
            </motion.div>

            {/* Thousands of Twinkling Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 80 }).map((_, i) => (
                <div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white animate-ping opacity-75"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDuration: `${Math.random() * 3 + 1.5}s`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Floating Golden Fireflies */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={`ffly-${i}`}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 20, -20, 0],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_15px_#FFD700]"
                  style={{
                    left: `${Math.random() * 95}%`,
                    top: `${Math.random() * 95}%`,
                  }}
                />
              ))}
            </div>

            {/* Falling Flower Petals */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div
                  key={`petal-${i}`}
                  animate={{
                    y: ['-10vh', '110vh'],
                    x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5,
                  }}
                  className="absolute w-4 h-5 opacity-70"
                >
                  <svg viewBox="0 0 30 40" className="w-full h-full fill-[#FADADD]">
                    <path d="M15,0 C25,10 30,25 20,38 C15,42 5,38 0,25 C-3,10 5,0 15,0 Z" />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Sequential Handwritten Text Fade-Ins */}
            <div className="relative z-20 max-w-2xl text-center flex flex-col items-center justify-center space-y-6 pt-20">
              
              {/* Line 1: If I had one wish... */}
              {revealStep >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="font-handwriting text-3xl sm:text-4xl text-[#FADADD] font-medium tracking-wide drop-shadow-md"
                >
                  {surpriseLines[0] || "If I had one wish..."}
                </motion.p>
              )}

              {/* Line 2: I'd wish to experience every lifetime with you. */}
              {revealStep >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#E8B7C0] font-semibold tracking-wide drop-shadow-lg"
                >
                  {surpriseLines[1] || "I'd wish to experience every lifetime with you."}
                </motion.p>
              )}

              {/* Line 3: I love you, Hafsa ❤️ */}
              {revealStep >= 3 && (
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight pt-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  {loveMessage || `I love you, ${girlfriendName} ❤️`}
                </motion.h2>
              )}

              {/* Line 4: Forever? + Glowing Heart */}
              {revealStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="pt-6 flex flex-col items-center gap-3"
                >
                  <p className="font-handwriting text-3xl sm:text-4xl text-[#FFD700]">
                    {foreverPrompt || "Forever?"}
                  </p>
                  <div className="w-16 h-16 rounded-full bg-[#E8B7C0]/20 border-2 border-[#E8B7C0] flex items-center justify-center text-[#E8B7C0] shadow-[0_0_30px_#E8B7C0]">
                    <Heart className="w-9 h-9 fill-[#C77D8A] text-[#E8B7C0] animate-pulse" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
