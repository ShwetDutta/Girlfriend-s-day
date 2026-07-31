import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/sound';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';

interface LoveLetterProps {
  salutation: string;
  paragraphs: string[];
  closing: string;
  signature: string;
  girlfriendName: string;
  senderName: string;
  onScrollToStory: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  salutation,
  paragraphs,
  closing,
  signature,
  girlfriendName,
  senderName,
  onScrollToStory,
}) => {
  // Typewriter effect logic
  const fullText = paragraphs.join("\n\n");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
    let index = 0;
    const speed = 25; // ms per char

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
        if (index % 12 === 0) {
          soundFx.playClick();
        }
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 paper-grain bg-gradient-to-b from-[#FDF5F4] via-[#F6E6E8] to-[#FDF5F4]">
      
      {/* Background Decorative Rose Petal Vines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C77D8A_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-[#FAF0EE] rounded-xl p-8 md:p-14 shadow-2xl border-2 border-[#E8B7C0]/50 paper-grain animate-sway my-auto"
      >
        {/* Decorative Washi Tape at Top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape flex items-center justify-center text-xs font-handwriting text-[#8C5A66]">
          National Girlfriend's Day
        </div>

        {/* Top Floating Heart Stamp */}
        <div className="flex justify-between items-start mb-6 border-b border-[#E8B7C0]/40 pb-4">
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-[#8C5A66]/70">
              A Personal Love Letter
            </span>
            <h2 className="font-cormorant text-2xl md:text-3xl text-[#8C5A66] font-semibold">
              To My Beloved {girlfriendName}
            </h2>
          </div>
        </div>

        {/* Salutation */}
        <h3 className="font-handwriting text-3xl md:text-4xl text-[#C77D8A] mb-6">
          {salutation}
        </h3>

        {/* Letter Body with Typewriter Effect */}
        <div className="font-cormorant text-lg md:text-xl text-[#8C5A66] leading-relaxed whitespace-pre-line min-h-[160px] tracking-wide">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-5 bg-[#C77D8A] ml-1 animate-pulse" />
          )}
        </div>

        {/* Closing & Signature */}
        <div className="mt-8 pt-6 border-t border-[#E8B7C0]/30 flex flex-col items-end">
          <p className="font-cormorant italic text-lg text-[#8C5A66]/80">{closing}</p>
          <p className="font-handwriting text-3xl md:text-4xl text-[#C77D8A] mt-1 font-bold">
            {signature}
          </p>
        </div>

        {/* Little Wax Seal Watermark in Corner */}
        <div className="absolute bottom-6 left-6 opacity-30 pointer-events-none">
          <div className="w-10 h-10 rounded-full wax-seal flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-white" />
          </div>
        </div>
      </motion.div>

      {/* Down Arrow / Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-12 flex flex-col items-center cursor-pointer group"
        onClick={onScrollToStory}
      >
        <span className="font-cormorant italic text-lg text-[#8C5A66]/80 mb-1 group-hover:text-[#C77D8A] transition-colors flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-[#C77D8A]" />
          Scroll down to explore our journey
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-[#FADADD]/60 border border-[#E8B7C0] flex items-center justify-center text-[#C77D8A] shadow-sm"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
};
