import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScrapbookThing } from '../data/loveStory';
import { soundFx } from '../utils/sound';
import { Sparkles, RotateCw } from 'lucide-react';

interface LittleThingsScrapbookProps {
  items: ScrapbookThing[];
}

export const LittleThingsScrapbook: React.FC<LittleThingsScrapbookProps> = ({
  items,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleCardClick = (id: string) => {
    soundFx.playPaperUnfold();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="little-things" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#F6E6E8] via-[#FDF5F4] to-[#FADADD]/30 paper-grain">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm">
            Chapter VI
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            The Little Things
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-lg mx-auto">
            Click any scrapbook card to flip it over and discover our favorite moments.
          </p>
        </div>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const isFlipped = !!flippedCards[item.id];

            return (
              <div
                key={item.id}
                className="h-64 perspective-1000 cursor-pointer group"
                onClick={() => handleCardClick(item.id)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full h-full rounded-2xl polaroid-shadow border-2 border-[#E8B7C0] paper-grain"
                >
                  {/* FRONT SIDE */}
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 bg-[#FAF0EE] rounded-2xl p-6 flex flex-col justify-between items-center text-center border border-[#E8B7C0]/50"
                  >
                    {/* Washi Tape */}
                    <div className="w-20 h-5 washi-tape opacity-80" />

                    <div className="my-auto">
                      <span className="text-4xl mb-3 block">{item.sticker}</span>
                      <span className="text-xs uppercase font-sans tracking-widest text-[#C77D8A] font-bold">
                        {item.category}
                      </span>
                      <h3 className="font-playfair text-2xl text-[#8C5A66] font-bold mt-1">
                        {item.frontTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-sans text-[#C77D8A]">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Click to flip</span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 bg-[#FADADD]/80 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-[#E8B7C0]"
                  >
                    <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#8C5A66]/60 mb-2">
                      {item.category}
                    </span>
                    <p className="font-handwriting text-2xl text-[#8C5A66] leading-relaxed">
                      "{item.backDescription}"
                    </p>
                    <span className="mt-4 text-[10px] uppercase font-sans text-[#C77D8A]">
                      Click to flip back
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
