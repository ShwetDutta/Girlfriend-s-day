import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/sound';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const MusicAudioBar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [isPlaying, setIsPlaying] = useState(soundFx.isPlaying());

  useEffect(() => {
    const unsubscribe = soundFx.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const toggleMute = () => {
    soundFx.toggleMute();
  };

  const togglePlay = () => {
    soundFx.togglePlay();
  };

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
      {/* Play/Pause Quick Toggle */}
      <button
        onClick={togglePlay}
        className="px-3 py-2 rounded-full bg-[#FAF0EE]/90 hover:bg-[#FAF0EE] backdrop-blur-md border border-[#E8B7C0] shadow-md text-[#8C5A66] text-xs font-sans font-medium flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        title="Play / Pause Background Music"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-[#C77D8A]" />
            <span className="hidden sm:inline">Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-[#C77D8A]" />
            <span className="hidden sm:inline">Play Music</span>
          </>
        )}
      </button>

      {/* Mute Toggle Button */}
      <button
        onClick={toggleMute}
        className="px-3 py-2 rounded-full bg-[#FAF0EE]/90 hover:bg-[#FAF0EE] backdrop-blur-md border border-[#E8B7C0] shadow-md text-[#8C5A66] text-xs font-sans font-medium flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        title="Toggle Audio"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-[#8C5A66]" />
            <span className="hidden sm:inline">Muted</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-[#C77D8A] animate-pulse" />
            <span className="hidden sm:inline">Sound On</span>
          </>
        )}
      </button>
    </div>
  );
};
