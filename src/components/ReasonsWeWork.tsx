import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Smile } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface ReasonsWeWorkProps {
  data: {
    title: string;
    subheading: string;
    bullets: { label: string; text: string; sticker: string }[];
  };
}

export const ReasonsWeWork: React.FC<ReasonsWeWorkProps> = ({
  data,
}) => {
  return (
    <section id="reasons-we-work" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#FADADD]/30 via-[#FDF5F4] to-[#F6E6E8] paper-grain">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FAF0EE] border border-[#E8B7C0]/50 rounded-full shadow-sm">
            Chapter VII
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            {data.title}
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-xl mx-auto">
            {data.subheading}
          </p>
        </div>

        {/* Handcrafted Scrapbook Collage Canvas */}
        <div className="relative bg-[#FAF0EE] rounded-3xl p-8 sm:p-14 polaroid-shadow border-2 border-[#E8B7C0] paper-grain overflow-hidden">
          
          {/* Heart Doodles & Pressed Flowers Background Overlays */}
          <div className="absolute top-4 left-4 text-4xl opacity-40 select-none pointer-events-none transform -rotate-12">
            🌸
          </div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-40 select-none pointer-events-none transform rotate-12">
            🌿
          </div>
          <div className="absolute top-1/2 right-6 text-3xl opacity-30 select-none pointer-events-none">
            ✨
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {data.bullets.map((bullet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="relative bg-[#FDF5F4] p-6 rounded-2xl border border-[#E8B7C0]/60 polaroid-shadow paper-grain flex flex-col justify-between"
              >
                {/* Washi Tape Accent */}
                <div className="absolute -top-3 right-6 w-16 h-5 washi-tape opacity-80" />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{bullet.sticker}</span>
                    <h3 className="font-playfair text-2xl font-bold text-[#8C5A66]">
                      {bullet.label}
                    </h3>
                  </div>
                  <p className="font-cormorant text-lg text-[#8C5A66]/90 leading-relaxed">
                    {bullet.text}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8B7C0]/30 flex items-center justify-between">
                  <span className="font-handwriting text-lg text-[#C77D8A]">Perfect Chemistry</span>
                  <Heart className="w-4 h-4 text-[#C77D8A] fill-[#C77D8A]" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Handwritten Annotation Tape */}
          <div className="mt-12 text-center pt-8 border-t-2 border-dashed border-[#E8B7C0]/50">
            <span className="font-handwriting text-3xl md:text-4xl text-[#C77D8A] font-bold">
              "Best friends first, lovers forever."
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
