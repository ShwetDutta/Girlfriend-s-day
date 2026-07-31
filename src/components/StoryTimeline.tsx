import React from 'react';
import { motion } from 'motion/react';
import { Milestone } from '../data/loveStory';
import { MapPin, Calendar, Heart, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface StoryTimelineProps {
  milestones: Milestone[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  milestones,
}) => {
  return (
    <section id="our-story" className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#FDF5F4] via-[#FADADD]/20 to-[#F6E6E8] paper-grain">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 text-xs font-sans tracking-[0.3em] uppercase text-[#C77D8A] bg-[#FADADD]/60 border border-[#E8B7C0]/50 rounded-full">
            Chapter I
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#8C5A66] font-bold mt-3 mb-2">
            Our Story
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#8C5A66]/80 max-w-lg mx-auto">
            A timeline of milestones, quiet glances, and cherished beginnings.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Animated Connecting Vine Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#E8B7C0] via-[#C77D8A] to-[#E8B7C0] rounded-full hidden md:block" />

          {/* Milestone Cards */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Heart Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF0EE] border-2 border-[#C77D8A] shadow-md">
                    <Heart className="w-5 h-5 text-[#C77D8A] fill-[#C77D8A]/30" />
                  </div>

                  {/* Content Card Side */}
                  <div className="w-full md:w-1/2 px-0 md:px-8">
                    <div className="bg-[#FAF0EE] rounded-2xl p-6 md:p-8 shadow-xl border border-[#E8B7C0]/60 paper-grain hover:shadow-2xl transition-all group">
                      
                      {/* Date Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-wider text-[#C77D8A] uppercase bg-[#FADADD]/50 px-3 py-1 rounded-full border border-[#E8B7C0]/40">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </span>

                        {item.tag && (
                          <span className="text-xs font-handwriting text-[#8C5A66] bg-[#F6E6E8] px-2.5 py-0.5 rounded-md border border-[#E8B7C0]/30">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Image Thumbnail if present */}
                      {item.imageUrl && (
                        <div className="my-4 overflow-hidden rounded-xl border border-[#E8B7C0]/40 shadow-sm aspect-video">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-playfair text-2xl text-[#8C5A66] font-bold mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-cormorant text-lg text-[#8C5A66]/90 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Location Footer */}
                      {item.location && (
                        <div className="flex items-center gap-1 text-xs font-sans text-[#8C5A66]/70 border-t border-[#E8B7C0]/30 pt-3">
                          <MapPin className="w-3.5 h-3.5 text-[#C77D8A]" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Empty side for layout spacing */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
