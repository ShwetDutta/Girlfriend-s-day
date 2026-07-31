import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrapbookMemory } from '../data/loveStory';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Maximize2,
  Camera,
  Bookmark
} from 'lucide-react';

interface ScrapbookGalleryProps {
  memories: ScrapbookMemory[];
}

export const ScrapbookGallery: React.FC<ScrapbookGalleryProps> = ({ memories }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Keyboard navigation for Lightbox (Esc, Left, Right)
  useEffect(() => {
    if (activePhotoIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhotoIdx(null);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) => (prev !== null ? (prev > 0 ? prev - 1 : memories.length - 1) : null));
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) => (prev !== null ? (prev < memories.length - 1 ? prev + 1 : 0) : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx, memories.length]);

  const activeMemory = activePhotoIdx !== null ? memories[activePhotoIdx] : null;

  // Helper for washi tape styling classes
  const getTapeClass = (color?: string) => {
    switch (color) {
      case 'rose':
        return 'bg-[#FADADD]/80 border-[#E8B7C0] text-[#8C5A66]';
      case 'lavender':
        return 'bg-[#E6E6FA]/90 border-[#D8BFD8] text-[#6A5ACD]';
      case 'gold':
        return 'bg-[#FEF08A]/90 border-[#FDE047] text-[#854D0E]';
      case 'mint':
        return 'bg-[#DCFCE7]/90 border-[#86EFAC] text-[#166534]';
      case 'pink':
      default:
        return 'bg-[#FFE4E6]/90 border-[#FECDD3] text-[#9F1239]';
    }
  };

  return (
    <section id="our-story" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#FDF5F4] via-[#F6E6E8] to-[#FAF0EE] paper-grain overflow-hidden">
      
      {/* Scrapbook Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/60 rounded-full shadow-sm mb-3">
            <Camera className="w-3.5 h-3.5 text-[#C77D8A]" />
            Chapter I
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-[#8C5A66] font-bold mb-4">
            Our Scrapbook of Memories
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-xl mx-auto">
            Every snapshot, every laugh, every moment with you, Hafsa.
          </p>
        </motion.div>
      </div>

      {/* Alternating Scrapbook Photo Stream */}
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        {memories.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`flex flex-col ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-12`}
            >
              
              {/* Photo Frame Container with Polaroid Swing Hover Effect */}
              <motion.div
                whileHover={{
                  scale: 1.035,
                  rotate: item.rotation > 0 ? item.rotation + 3 : item.rotation - 3,
                  y: -6,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                onClick={() => setActivePhotoIdx(idx)}
                className="relative cursor-pointer group shrink-0 w-full max-w-md sm:w-[380px]"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                {/* Washi Tape Strip at top */}
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape z-20 flex items-center justify-center text-xs font-handwriting border shadow-xs ${getTapeClass(
                    item.tapeColor
                  )}`}
                >
                  <span className="truncate px-2">{item.date}</span>
                </div>

                {/* Pressed Flower / Sticker Decorative Accent */}
                {item.sticker && (
                  <div className="absolute -top-3 -right-3 text-2xl z-20 animate-bounce drop-shadow-md">
                    {item.sticker}
                  </div>
                )}

                {/* Main Photo Frame Card */}
                <div className="bg-[#FAF0EE] p-4 sm:p-5 rounded-2xl polaroid-shadow border-2 border-[#E8B7C0]/60 paper-grain relative overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl">
                  
                  {/* Image Holder */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F6E6E8] border border-[#E8B7C0]/30 shadow-inner">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/80 backdrop-blur-xs p-3 rounded-full text-[#8C5A66] shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Polaroid Bottom Caption Area */}
                  <div className="mt-4 pt-2 text-center">
                    <h3 className="font-playfair text-xl font-bold text-[#8C5A66]">
                      {item.title}
                    </h3>
                    
                    {item.scratchMemo && (
                      <p className="font-caveat text-xl text-[#C77D8A] mt-1">
                        "{item.scratchMemo}"
                      </p>
                    )}
                  </div>

                  {/* Stamp mark in corner */}
                  <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none">
                    <Heart className="w-6 h-6 text-[#C77D8A] fill-[#C77D8A]" />
                  </div>
                </div>
              </motion.div>

              {/* Heartfelt Caption & Journal Note Beside Photo */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF0EE] border border-[#E8B7C0]/40 rounded-full text-xs font-sans text-[#C77D8A]">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Memory #{idx + 1}</span>
                  {item.location && (
                    <>
                      <span>•</span>
                      <MapPin className="w-3 h-3 text-[#8C5A66]/70" />
                      <span className="text-[#8C5A66]/80">{item.location}</span>
                    </>
                  )}
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#8C5A66]">
                  {item.title}
                </h3>

                <p className="font-caveat text-2xl md:text-3xl text-[#8C5A66] leading-relaxed md:leading-loose">
                  {item.caption}
                </p>

                <div className="pt-1 flex items-center justify-center md:justify-start gap-1 text-[#C77D8A] text-xs font-cormorant italic">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Forever cherished in our story</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Expanded Photo Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePhotoIdx(null)}
          >
            {/* Modal Card Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl bg-[#FAF0EE] rounded-3xl p-6 sm:p-10 polaroid-shadow border-2 border-[#E8B7C0] paper-grain overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIdx(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#FAF0EE] border border-[#E8B7C0] text-[#8C5A66] hover:bg-[#FADADD] flex items-center justify-center transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx((prev) => (prev !== null ? (prev > 0 ? prev - 1 : memories.length - 1) : null));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#FAF0EE]/90 border border-[#E8B7C0] text-[#8C5A66] hover:bg-[#FADADD] flex items-center justify-center transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx((prev) => (prev !== null ? (prev < memories.length - 1 ? prev + 1 : 0) : null));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#FAF0EE]/90 border border-[#E8B7C0] text-[#8C5A66] hover:bg-[#FADADD] flex items-center justify-center transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* High-Res Image Display */}
              <div className="relative w-full max-h-[60vh] rounded-2xl overflow-hidden bg-[#F6E6E8] border-2 border-[#E8B7C0]/50 shadow-inner mb-6 flex items-center justify-center">
                <img
                  src={activeMemory.imageUrl}
                  alt={activeMemory.title}
                  className="w-full h-full object-contain max-h-[55vh]"
                />
              </div>

              {/* Lightbox Details */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3 text-xs font-sans text-[#C77D8A]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeMemory.date}
                  </span>
                  {activeMemory.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {activeMemory.location}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-playfair text-3xl font-bold text-[#8C5A66]">
                  {activeMemory.title}
                </h3>

                <p className="font-caveat text-2xl md:text-3xl text-[#8C5A66] leading-relaxed max-w-xl mx-auto">
                  "{activeMemory.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
