import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/sound';
import { Play, Pause, Volume2, VolumeX, Disc, Music } from 'lucide-react';

interface CassettePlayerProps {
  songTitle: string;
  artist: string;
  albumArt: string;
  lyrics: string[];
}

export const CassettePlayer: React.FC<CassettePlayerProps> = ({
  songTitle,
  artist,
  albumArt,
  lyrics,
}) => {
  const [isPlaying, setIsPlaying] = useState(soundFx.isPlaying());
  const [progress, setProgress] = useState(soundFx.getProgress());
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [currentLyricIdx, setCurrentLyricIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = soundFx.subscribe((playing, muted, currentProgress) => {
      setIsPlaying(playing);
      setIsMuted(muted);
      setProgress(currentProgress);
    });
    return unsubscribe;
  }, []);

  const togglePlay = () => {
    soundFx.togglePlay();
  };

  const toggleMute = () => {
    soundFx.toggleMute();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = (clickX / rect.width) * 100;
    soundFx.seek(newPercentage);
  };

  // Cycle lyrics carousel when music is playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentLyricIdx((prev) => (prev + 1) % (lyrics.length || 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, lyrics.length]);

  return (
    <section id="our-song" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#FADADD]/20 via-[#FDF5F4] to-[#F6E6E8] paper-grain flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm">
            Chapter V
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            Our Melody
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-md mx-auto">
            The song that plays softly whenever I think of your sweet smile.
          </p>
        </div>

        {/* Vintage Cassette Player Card */}
        <div className="relative w-full max-w-xl bg-[#FAF0EE] rounded-3xl p-6 sm:p-10 polaroid-shadow border-2 border-[#E8B7C0] paper-grain mx-auto">
          
          {/* Cassette Tape Window & Reels */}
          <div className="relative w-full h-36 sm:h-44 bg-[#8C5A66] rounded-2xl p-4 overflow-hidden border-4 border-[#C77D8A]/40 shadow-inner flex items-center justify-around mb-8">
            
            {/* Left Tape Reel */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
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
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-[#FAF0EE]/80 bg-[#FAF0EE]/20 flex items-center justify-center shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#FAF0EE] border-2 border-[#8C5A66] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#8C5A66]" />
              </div>
            </motion.div>
          </div>

          {/* Song Info & Album Art */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            
            {/* Album Art with Disk Spinner */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#E8B7C0] shadow-md shrink-0">
              <img
                src={albumArt}
                alt={songTitle}
                className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <Disc className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Title & Artist */}
            <div className="text-center sm:text-left flex-1">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#C77D8A] bg-[#FADADD]/60 px-2.5 py-0.5 rounded-full">
                Now Playing
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#8C5A66] mt-1 line-clamp-1">
                {songTitle}
              </h3>
              <p className="font-cormorant text-lg text-[#8C5A66]/80 font-medium">
                {artist}
              </p>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div
            onClick={handleSeek}
            className="w-full bg-[#F6E6E8] h-2.5 rounded-full overflow-hidden mb-6 border border-[#E8B7C0]/40 cursor-pointer relative"
            title="Click to seek"
          >
            <div
              className="bg-gradient-to-r from-[#E8B7C0] to-[#C77D8A] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-[#F6E6E8] hover:bg-[#FADADD] text-[#8C5A66] transition-colors cursor-pointer"
              title="Toggle Mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Big Play / Pause Button */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-[#C77D8A] to-[#8C5A66] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
            </button>

            <div className="flex items-center gap-1.5 text-xs font-sans text-[#8C5A66]/80 font-medium">
              <Music className={`w-4 h-4 text-[#C77D8A] ${isPlaying ? 'animate-bounce' : ''}`} />
              <span>{isPlaying ? 'Playing' : 'Paused'}</span>
            </div>
          </div>

          {/* Lyrics Carousel Display */}
          {lyrics && lyrics.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E8B7C0]/40 text-center min-h-[60px] flex items-center justify-center">
              <p className="font-cormorant italic text-xl text-[#C77D8A]">
                "{lyrics[currentLyricIdx]}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
