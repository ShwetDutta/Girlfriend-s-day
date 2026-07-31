import React, { useState } from 'react';
import { soundFx } from '../utils/sound';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicAudioBar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  const toggleSound = () => {
    soundFx.playClick();
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="px-3.5 py-2 rounded-full bg-[#FAF0EE]/90 hover:bg-[#FAF0EE] backdrop-blur-md border border-[#E8B7C0] shadow-md text-[#8C5A66] text-xs font-sans font-medium flex items-center gap-2 transition-all hover:scale-105"
        title="Toggle Audio & Music"
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
