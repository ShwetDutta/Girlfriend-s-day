import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/sound';
import { Disc, Music, Heart, Sparkles } from 'lucide-react';

interface CassettePlayerProps {
  song: {
    title: string;
    artist: string;
    albumArt: string;
    audioUrl?: string;
    lyrics: string[];
  };
}

export const CassettePlayer: React.FC<CassettePlayerProps> = ({ song }) => {
  const [progress, setProgress] = useState(soundFx.getProgress());
  const [currentLyricIdx, setCurrentLyricIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = soundFx.subscribe((_playing, _muted, currentProgress) => {
      setProgress(currentProgress);
    });
    return unsubscribe;
  }, []);

  // Cycle lyrics carousel automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLyricIdx((prev) => (prev + 1) % (song.lyrics?.length || 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [song.lyrics?.length]);

  return (
    <section id="our-song" className="relative py-24 px-4 bg-gradient-to-b from-[#FAF0EE] via-[#FDF5F4] to-[#F6E6E8] paper-grain flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Decorative Sparkle Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C77D8A_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C77D8A]" />
            Chapter II
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#8C5A66] font-bold mt-2 mb-2">
            Our Song
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-md mx-auto">
            Playing softly in the background of our love story.
          </p>
        </div>

        {/* Vintage Cassette & Vinyl Player Card */}
        <div className="relative w-full max-w-xl bg-[#FAF0EE] rounded-3xl p-6 sm:p-10 polaroid-shadow border-2 border-[#E8B7C0] paper-grain mx-auto">
          
          {/* Cassette Tape Window & Reels */}
          <div className="relative w-full h-36 sm:h-44 bg-[#8C5A66] rounded-2xl p-4 overflow-hidden border-4 border-[#C77D8A]/40 shadow-inner flex items-center justify-around mb-8">
            
            {/* Left Tape Reel */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-[#FAF0EE]/80 bg-[#FAF0EE]/20 flex items-center justify-center shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#FAF0EE] border-2 border-[#8C5A66] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#8C5A66]" />
              </div>
            </motion.div>

            {/* Tape Center Ribbon View */}
            <div className="w-24 sm:w-32 h-10 bg-[#FAF0EE]/20 rounded-md border border-[#FAF0EE]/40 flex items-center justify-center text-xs font-mono text-[#FAF0EE]">
              <span className="tracking-widest">A-SIDE</span>
            </div>

            {/* Right Tape Reel */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-[#FAF0EE]/80 bg-[#FAF0EE]/20 flex items-center justify-center shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#FAF0EE] border-2 border-[#8C5A66] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#8C5A66]" />
              </div>
            </motion.div>
          </div>

          {/* Song Info & Vinyl Record Spinning Album Art */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            
            {/* Album Art with Vinyl Disc Spinner */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#8C5A66] bg-[#111111] p-1 shadow-xl shrink-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle,_#333_20%,_#111_80%)]"
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full border border-white/10" />
                <div className="absolute inset-4 rounded-full border border-white/10" />
                
                {/* Center Label Art */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FAF0EE] shadow-md relative">
                  <img
                    src={song.albumArt}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <Disc className="w-4 h-4 text-white/90" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Title & Artist */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#C77D8A] bg-[#FADADD]/60 px-2.5 py-0.5 rounded-full">
                  Playing Automatically
                </span>
                <Music className="w-3.5 h-3.5 text-[#C77D8A] animate-bounce" />
              </div>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#8C5A66] mt-1">
                {song.title}
              </h3>
              <p className="font-cormorant text-xl text-[#8C5A66]/80 font-medium">
                {song.artist}
              </p>
            </div>
          </div>

          {/* Automatic Progress Bar */}
          <div className="w-full bg-[#F6E6E8] h-2.5 rounded-full overflow-hidden mb-6 border border-[#E8B7C0]/40 relative">
            <div
              className="bg-gradient-to-r from-[#E8B7C0] to-[#C77D8A] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#8C5A66]/80 font-medium">
            <Heart className="w-4 h-4 text-[#C77D8A] fill-[#C77D8A] animate-pulse" />
            <span>Softly playing in the background</span>
          </div>

          {/* Lyrics Carousel Display */}
          {song.lyrics && song.lyrics.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E8B7C0]/40 text-center min-h-[60px] flex items-center justify-center">
              <p className="font-cormorant italic text-xl md:text-2xl text-[#C77D8A]">
                "{song.lyrics[currentLyricIdx]}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
