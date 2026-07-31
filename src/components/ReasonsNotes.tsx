import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoveReasonNote } from '../data/loveStory';
import { soundFx } from '../utils/sound';
import { Heart, X, Sparkles } from 'lucide-react';

interface ReasonsNotesProps {
  notes: LoveReasonNote[];
}

export const ReasonsNotes: React.FC<ReasonsNotesProps> = ({
  notes,
}) => {
  const [activeNote, setActiveNote] = useState<LoveReasonNote | null>(null);

  const handleNoteClick = (note: LoveReasonNote) => {
    soundFx.playPaperUnfold();
    setActiveNote(note);
  };

  return (
    <section id="reasons-i-love-you" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#FADADD]/30 via-[#FDF5F4] to-[#F6E6E8] paper-grain">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm">
            Chapter III
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            Reasons I Love You
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-lg mx-auto">
            A scattered bouquet of handwritten notes, each holding a piece of my heart.
          </p>
        </div>

        {/* Scattered Sticky Notes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 pt-4">
          {notes.map((note, idx) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              style={{
                backgroundColor: note.color || '#FADADD',
                rotate: `${note.rotation}deg`,
              }}
              onClick={() => handleNoteClick(note)}
              className="relative p-6 rounded-lg polaroid-shadow cursor-pointer paper-grain border border-[#E8B7C0]/50 flex flex-col justify-between min-h-[170px] transition-all group"
            >
              {/* Paper Clip / Tape Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 washi-tape opacity-80" />

              {/* Note Content */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#8C5A66]/60">
                  Reason #{idx + 1}
                </span>
                <h3 className="font-handwriting text-2xl text-[#8C5A66] font-bold mt-1 line-clamp-1">
                  {note.title}
                </h3>
                <p className="font-cormorant text-base text-[#8C5A66]/90 line-clamp-2 mt-1 leading-snug">
                  {note.noteText}
                </p>
              </div>

              {/* Read Prompt */}
              <div className="mt-3 flex items-center justify-between text-xs font-sans text-[#C77D8A] pt-2 border-t border-[#8C5A66]/10">
                <span className="font-medium group-hover:underline">Tap note</span>
                <Heart className="w-3.5 h-3.5 fill-[#C77D8A]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Note Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#8C5A66]/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.85, rotate: activeNote.rotation }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: activeNote.rotation }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: activeNote.color || '#FAF0EE' }}
              className="relative w-full max-w-md p-8 md:p-10 rounded-2xl polaroid-shadow border-2 border-[#E8B7C0] paper-grain text-center"
            >
              <button
                onClick={() => setActiveNote(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#8C5A66] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-white/80 border border-[#E8B7C0] flex items-center justify-center text-[#C77D8A] mx-auto mb-4 shadow-sm">
                <Heart className="w-6 h-6 fill-[#C77D8A]" />
              </div>

              <h3 className="font-handwriting text-3xl text-[#8C5A66] font-bold mb-3">
                {activeNote.title}
              </h3>

              <p className="font-cormorant text-xl text-[#8C5A66] leading-relaxed italic">
                "{activeNote.noteText}"
              </p>

              <p className="mt-6 font-sans text-xs uppercase tracking-widest text-[#8C5A66]/60">
                Forever In My Heart ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
