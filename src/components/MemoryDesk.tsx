import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DeskItem } from '../data/loveStory';
import { soundFx } from '../utils/sound';
import {
  Flower,
  Mail,
  Ticket,
  Coffee,
  MapPin,
  Camera,
  Heart,
  X,
  Sparkles,
} from 'lucide-react';

interface MemoryDeskProps {
  items: DeskItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  Flower: <Flower className="w-8 h-8 text-[#C77D8A]" />,
  Mail: <Mail className="w-8 h-8 text-[#8C5A66]" />,
  Ticket: <Ticket className="w-8 h-8 text-[#C77D8A]" />,
  Coffee: <Coffee className="w-8 h-8 text-[#8C5A66]" />,
  MapPin: <MapPin className="w-8 h-8 text-[#C77D8A]" />,
  Camera: <Camera className="w-8 h-8 text-[#8C5A66]" />,
};

export const MemoryDesk: React.FC<MemoryDeskProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<DeskItem | null>(null);

  const handleItemClick = (item: DeskItem) => {
    soundFx.playPaperUnfold();
    setSelectedItem(item);
  };

  return (
    <section id="memory-desk" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#F6E6E8] via-[#FDF5F4] to-[#FADADD]/20 paper-grain overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm">
            Chapter IV
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            Interactive Memory Desk
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-xl mx-auto">
            A top-down view of our cozy workspace. Click any object scattered on the desk to explore its story.
          </p>
        </div>

        {/* Top-Down Wooden Desk Workspace Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-w-5xl mx-auto rounded-3xl bg-[#E8C2AF]/30 border-8 border-[#C79C85]/40 shadow-2xl overflow-hidden p-6 paper-grain bg-[radial-gradient(#8C5A66_1px,transparent_1px)] [background-size:20px_20px]">
          
          {/* Subtle Wood Texture Stripes */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(45deg,#8C5A66_0,#8C5A66_2px,transparent_0,transparent_16px)]" />

          {/* Desktop Objects Layer */}
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.12, rotate: 0, zIndex: 40 }}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                rotate: `${item.rotation}deg`,
              }}
              onClick={() => handleItemClick(item)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div className="relative bg-[#FAF0EE] rounded-2xl p-4 md:p-5 shadow-xl border-2 border-[#E8B7C0]/80 flex flex-col items-center justify-center text-center w-28 sm:w-36 md:w-44 polaroid-shadow transition-all group-hover:border-[#C77D8A]">
                
                {/* Object Image or Icon */}
                {item.imageUrl ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#E8B7C0]/50 mb-2 shadow-inner">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#FADADD] flex items-center justify-center mb-2 shadow-inner">
                    {iconMap[item.iconName] || <Sparkles className="w-6 h-6 text-[#C77D8A]" />}
                  </div>
                )}

                <span className="font-handwriting text-lg sm:text-xl text-[#8C5A66] font-bold line-clamp-1">
                  {item.name}
                </span>

                {item.badge && (
                  <span className="mt-1 text-[10px] uppercase font-sans tracking-wider text-[#C77D8A] bg-[#FADADD]/60 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desk Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#8C5A66]/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#FAF0EE] rounded-2xl p-8 polaroid-shadow border-2 border-[#E8B7C0] paper-grain text-center"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F6E6E8] hover:bg-[#FADADD] border border-[#E8B7C0] flex items-center justify-center text-[#8C5A66] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedItem.imageUrl && (
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-[#E8B7C0] mb-6 shadow-md">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <span className="text-xs font-sans uppercase tracking-widest text-[#C77D8A] bg-[#FADADD]/60 px-3 py-1 rounded-full border border-[#E8B7C0]/40">
                Desk Keepsake
              </span>

              <h3 className="font-playfair text-3xl text-[#8C5A66] font-bold mt-3 mb-2">
                {selectedItem.name}
              </h3>

              <p className="font-cormorant italic text-lg text-[#8C5A66]/80 mb-4">
                {selectedItem.description}
              </p>

              <div className="p-4 bg-[#FADADD]/40 rounded-xl border border-[#E8B7C0]/50">
                <p className="font-cormorant text-lg text-[#8C5A66] leading-relaxed">
                  {selectedItem.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
