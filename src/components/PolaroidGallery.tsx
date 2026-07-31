import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PolaroidPhoto } from '../data/loveStory';
import { soundFx } from '../utils/sound';
import { X, Sparkles, Heart, Eye, Image as ImageIcon } from 'lucide-react';

interface PolaroidGalleryProps {
  polaroids: PolaroidPhoto[];
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({
  polaroids,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);
  const [isScratchRevealed, setIsScratchRevealed] = useState(false);

  const handleOpenLightbox = (photo: PolaroidPhoto) => {
    soundFx.playChime(600);
    setSelectedPhoto(photo);
    setIsScratchRevealed(false);
  };

  const handleRevealScratch = () => {
    soundFx.playPaperUnfold();
    setIsScratchRevealed(true);
  };

  return (
    <section id="favorite-memories" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#F6E6E8] via-[#FDF5F4] to-[#FADADD]/30 paper-grain overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm">
            Chapter II
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            Our Favorite Memories
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-xl mx-auto">
            Captured snapshots suspended in time. Click any polaroid to open its secret memory.
          </p>
        </div>

        {/* Hanging Rope & Pins Decorative Graphic */}
        <div className="relative w-full border-t-2 border-dashed border-[#E8B7C0]/60 my-6 hidden md:block" />

        {/* Polaroid Grid / Floating Scrapbook */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-6">
          {polaroids.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              style={{ rotate: `${photo.rotation}deg` }}
              onClick={() => handleOpenLightbox(photo)}
              className="relative cursor-pointer group bg-[#FAF0EE] p-4 pb-7 rounded-sm polaroid-shadow transition-all duration-300 transform border border-[#E8B7C0]/40 paper-grain"
            >
              {/* Washi Tape Pin at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape opacity-80 group-hover:opacity-100 transition-opacity z-10" />

              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] bg-[#E8B7C0]/20 rounded-sm overflow-hidden mb-4 border border-[#E8B7C0]/30">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                {/* Scratch Overlay Badge */}
                {photo.scratchMemo && (
                  <div className="absolute top-2 right-2 bg-[#8C5A66]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-sans flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#FADADD]" />
                    <span>Secret Memo</span>
                  </div>
                )}
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="text-center">
                <h3 className="font-handwriting text-2xl text-[#8C5A66] font-semibold leading-snug">
                  {photo.title}
                </h3>
                <p className="font-cormorant italic text-sm text-[#8C5A66]/70 mt-0.5">
                  {photo.date}
                </p>
              </div>

              {/* Hover View Prompt */}
              <div className="absolute inset-0 bg-[#8C5A66]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center backdrop-blur-[1px]">
                <span className="bg-[#FAF0EE] text-[#8C5A66] px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold shadow-md flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#C77D8A]" />
                  View Memory
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#8C5A66]/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#FAF0EE] rounded-2xl p-6 sm:p-8 polaroid-shadow border-2 border-[#E8B7C0] paper-grain"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F6E6E8] hover:bg-[#FADADD] border border-[#E8B7C0] flex items-center justify-center text-[#8C5A66] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image */}
              <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden border border-[#E8B7C0]/50 shadow-inner mb-6">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lightbox Details */}
              <div className="text-center">
                <span className="text-xs uppercase font-sans tracking-widest text-[#C77D8A] bg-[#FADADD]/60 px-3 py-1 rounded-full border border-[#E8B7C0]/40">
                  {selectedPhoto.date}
                </span>

                <h3 className="font-playfair text-3xl text-[#8C5A66] font-bold mt-3 mb-2">
                  {selectedPhoto.title}
                </h3>

                <p className="font-cormorant text-xl text-[#8C5A66]/90 leading-relaxed mb-6">
                  "{selectedPhoto.caption}"
                </p>

                {/* Secret Scratchable Memo Box */}
                {selectedPhoto.scratchMemo && (
                  <div className="mt-4 pt-4 border-t border-[#E8B7C0]/40">
                    {!isScratchRevealed ? (
                      <button
                        onClick={handleRevealScratch}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#FADADD] to-[#E8B7C0] hover:from-[#E8B7C0] hover:to-[#C77D8A] text-[#8C5A66] hover:text-white font-sans text-sm font-semibold rounded-xl border border-[#E8B7C0] shadow-sm transition-all flex items-center justify-center gap-2 group"
                      >
                        <Sparkles className="w-4 h-4 text-[#8C5A66] group-hover:text-white" />
                        <span>Scratch to Reveal Secret Memo</span>
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-[#FADADD]/60 rounded-xl border border-[#E8B7C0] text-center"
                      >
                        <p className="text-xs uppercase tracking-wider font-sans text-[#C77D8A] font-bold mb-1">
                          Secret Note ❤️
                        </p>
                        <p className="font-handwriting text-2xl text-[#8C5A66]">
                          {selectedPhoto.scratchMemo}
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
