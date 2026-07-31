import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiddenLoveNote } from '../data/loveStory';
import { soundFx } from '../utils/sound';
import { Heart, Sparkles, X, Mail } from 'lucide-react';

interface HiddenLoveNotesProps {
  notes: HiddenLoveNote[];
}

export const HiddenLoveNotes: React.FC<HiddenLoveNotesProps> = ({ notes }) => {
  const [activeNote, setActiveNote] = useState<HiddenLoveNote | null>(null);
  const [openedNoteIds, setOpenedNoteIds] = useState<Set<string>>(new Set());

  const handleNoteClick = (note: HiddenLoveNote) => {
    soundFx.playSealPop();
    setActiveNote(note);
    setOpenedNoteIds((prev) => new Set(prev).add(note.id));
  };

  return (
    <>
      {/* Scattered Secret Love Badges */}
      {notes.map((note) => {
        const isOpened = openedNoteIds.has(note.id);
        return (
          <motion.div
            key={note.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            whileHover={{ scale: 1.3, opacity: 1, rotate: [0, -10, 10, 0] }}
            onClick={() => handleNoteClick(note)}
            className="fixed z-30 cursor-pointer p-2 rounded-full bg-[#FAF0EE] border-2 border-[#E8B7C0] shadow-md hover:shadow-lg transition-all group"
            style={{
              left: `${note.position.x}%`,
              top: `${note.position.y}%`,
            }}
            title="A secret note for Hafsa..."
          >
            <div className="relative flex items-center justify-center">
              <Mail className={`w-5 h-5 ${isOpened ? 'text-[#C77D8A]' : 'text-[#8C5A66]'} animate-pulse`} />
              <Heart className="w-2.5 h-2.5 fill-[#C77D8A] text-[#C77D8A] absolute -top-1 -right-1" />
            </div>
          </motion.div>
        );
      })}

      {/* Secret Note Modal Popup */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#8C5A66]/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-[#FAF0EE] rounded-2xl p-6 text-center border-2 border-[#E8B7C0] polaroid-shadow paper-grain"
            >
              <button
                onClick={() => setActiveNote(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F6E6E8] hover:bg-[#FADADD] flex items-center justify-center text-[#8C5A66] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#FADADD] border border-[#E8B7C0] flex items-center justify-center text-[#C77D8A] mx-auto mb-3 shadow-inner">
                <Heart className="w-6 h-6 fill-[#C77D8A] animate-bounce" />
              </div>

              <span className="text-[10px] uppercase font-sans tracking-widest text-[#C77D8A] font-bold bg-[#FADADD]/60 px-3 py-1 rounded-full border border-[#E8B7C0]/40">
                Secret Note For Hafsa
              </span>

              <p className="font-handwriting text-3xl text-[#8C5A66] font-bold mt-4 mb-2">
                "{activeNote.message}"
              </p>

              <p className="text-xs font-cormorant italic text-[#8C5A66]/80 mt-3">
                ❤️ Just a little reminder of how special you are.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
