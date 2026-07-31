import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/sound';
import { Heart, Sparkles, MailOpen } from 'lucide-react';

interface EnvelopeIntroProps {
  girlfriendName: string;
  senderName: string;
  occasion: string;
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  girlfriendName,
  senderName,
  occasion,
  onOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundFx.playSealPop();
    
    setTimeout(() => {
      soundFx.playPaperUnfold();
    }, 250);

    setTimeout(() => {
      soundFx.startAmbientMusic();
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDF5F4] via-[#FADADD]/30 to-[#F6E6E8] paper-grain select-none">
      
      {/* Blooming Floral Edges (Matching the video's lush watercolor flower border) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Top-Left Floral Cluster */}
        <svg
          viewBox="0 0 400 400"
          className="absolute -top-16 -left-16 w-80 md:w-112 h-auto text-[#E8B7C0] opacity-85 filter drop-shadow-md"
        >
          <g fill="currentColor">
            <circle cx="120" cy="120" r="90" fill="#FADADD" opacity="0.8" />
            <circle cx="90" cy="160" r="65" fill="#C77D8A" opacity="0.6" />
            <circle cx="170" cy="90" r="50" fill="#E8B7C0" opacity="0.7" />
            {/* Flower petals details */}
            <path d="M120 30 Q150 120 120 210 Q90 120 120 30 Z" fill="#8C5A66" opacity="0.25" />
            <path d="M30 120 Q120 150 210 120 Q120 90 30 120 Z" fill="#8C5A66" opacity="0.25" />
            <circle cx="120" cy="120" r="25" fill="#8C5A66" opacity="0.8" />
            <circle cx="120" cy="120" r="12" fill="#FDF5F4" />
          </g>
        </svg>

        {/* Top-Right Floral Cluster */}
        <svg
          viewBox="0 0 400 400"
          className="absolute -top-16 -right-16 w-80 md:w-112 h-auto text-[#C77D8A] opacity-85 filter drop-shadow-md"
        >
          <g fill="currentColor">
            <circle cx="280" cy="120" r="85" fill="#E8B7C0" opacity="0.75" />
            <circle cx="310" cy="170" r="60" fill="#FADADD" opacity="0.85" />
            <circle cx="220" cy="90" r="55" fill="#C77D8A" opacity="0.65" />
            <path d="M280 35 Q310 120 280 205 Q250 120 280 35 Z" fill="#8C5A66" opacity="0.25" />
            <circle cx="280" cy="120" r="22" fill="#8C5A66" opacity="0.8" />
            <circle cx="280" cy="120" r="10" fill="#FDF5F4" />
          </g>
        </svg>

        {/* Bottom-Left Floral Cluster */}
        <svg
          viewBox="0 0 400 400"
          className="absolute -bottom-16 -left-16 w-80 md:w-112 h-auto text-[#E8B7C0] opacity-80 filter drop-shadow-md"
        >
          <g fill="currentColor">
            <circle cx="130" cy="270" r="80" fill="#C77D8A" opacity="0.6" />
            <circle cx="80" cy="220" r="60" fill="#FADADD" opacity="0.8" />
            <circle cx="130" cy="270" r="20" fill="#8C5A66" opacity="0.75" />
          </g>
        </svg>

        {/* Bottom-Right Floral Cluster */}
        <svg
          viewBox="0 0 400 400"
          className="absolute -bottom-16 -right-16 w-80 md:w-112 h-auto text-[#FADADD] opacity-80 filter drop-shadow-md"
        >
          <g fill="currentColor">
            <circle cx="270" cy="270" r="85" fill="#E8B7C0" opacity="0.7" />
            <circle cx="320" cy="220" r="65" fill="#C77D8A" opacity="0.6" />
            <circle cx="270" cy="270" r="22" fill="#8C5A66" opacity="0.75" />
          </g>
        </svg>
      </motion.div>

      {/* Main Content & Envelope Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-20 flex flex-col items-center justify-center px-4 max-w-lg text-center"
      >
        {/* Top Header Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="px-3 py-1 text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#8C5A66]/80 bg-[#FADADD]/60 backdrop-blur-sm border border-[#E8B7C0]/50 rounded-full shadow-sm">
            {occasion}
          </span>
          <p className="mt-3 text-sm font-sans tracking-widest text-[#8C5A66]/70 uppercase animate-pulse">
            Tap the envelope
          </p>
        </motion.div>

        {/* Sender Name Above Envelope */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66] mb-2 tracking-wide"
        >
          FROM <span className="font-handwriting text-2xl md:text-3xl text-[#C77D8A] ml-1">{senderName}</span>
        </motion.p>

        {/* The Vintage Envelope */}
        <div className="relative my-4 cursor-pointer group" onClick={handleEnvelopeClick}>
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={
              isOpening
                ? { scale: [1, 1.05, 0], rotate: [0, -2, 5], opacity: [1, 1, 0] }
                : isHovered
                ? { rotate: [-1.5, 1.5, -1.5], scale: 1.03 }
                : { rotate: 0, scale: 1 }
            }
            transition={
              isOpening
                ? { duration: 0.9, ease: "easeInOut" }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative w-80 sm:w-96 h-56 sm:h-64 bg-[#FAF0EE] rounded-lg border-2 border-[#E8B7C0]/60 shadow-xl paper-grain overflow-hidden p-6 flex flex-col items-center justify-between"
          >
            {/* Envelope Top Flap Graphic */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#F2DFE2] to-[#FAF0EE] border-b border-[#E8B7C0]/40 clip-path-envelope-flap shadow-inner pointer-events-none" />

            {/* Floral Motif Illustration on Envelope */}
            <div className="z-10 mt-2 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F6E6E8] border border-[#E8B7C0] flex items-center justify-center text-[#C77D8A] shadow-inner mb-1">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>
              <p className="font-handwriting text-lg text-[#C77D8A]">A Bouquet For You</p>
            </div>

            {/* Wax Seal Button in Center */}
            <div className="z-20 relative my-auto">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full wax-seal flex items-center justify-center text-white cursor-pointer shadow-lg transform transition-transform"
              >
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white/90 fill-white/80 animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Envelope Postage Stamp */}
            <div className="absolute top-3 right-3 w-10 h-12 postage-stamp bg-[#FDF5F4] flex flex-col items-center justify-center p-1 text-[10px] text-[#8C5A66] font-cormorant font-bold uppercase">
              <Heart className="w-3.5 h-3.5 text-[#C77D8A] fill-[#C77D8A]" />
              <span>LOVE</span>
            </div>

            {/* Bottom Letter Peeking Indicator */}
            <div className="z-10 text-xs font-sans tracking-widest text-[#8C5A66]/60 uppercase flex items-center gap-1">
              <MailOpen className="w-3.5 h-3.5 text-[#C77D8A]" />
              <span>Click Wax Seal To Open</span>
            </div>
          </motion.div>
        </div>

        {/* Girlfriend Name Below Envelope */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-cormorant text-2xl md:text-3xl font-semibold text-[#8C5A66] mt-2 tracking-wide"
        >
          FOR <span className="font-handwriting text-3xl md:text-4xl text-[#C77D8A] ml-2">{girlfriendName} ❤️</span>
        </motion.p>
      </motion.div>
    </div>
  );
};
