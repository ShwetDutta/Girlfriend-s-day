/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { initialLoveStory, LoveStoryConfig } from './data/loveStory';
import { FloatingPetals } from './components/FloatingPetals';
import { PetalCursorTrail } from './components/PetalCursorTrail';
import { FlyingButterfly } from './components/FlyingButterfly';
import { HiddenLoveNotes } from './components/HiddenLoveNotes';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { LoveLetter } from './components/LoveLetter';
import { ScrapbookGallery } from './components/ScrapbookGallery';
import { CassettePlayer } from './components/CassettePlayer';
import { NightSkyFinale } from './components/NightSkyFinale';

const LOCAL_STORAGE_KEY = 'national_girlfriends_day_love_story_hafsa_v5';

export default function App() {
  const [config] = useState<LoveStoryConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.girlfriendName === 'Hafsa' && parsed.scrapbookMemories) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved love story', e);
    }
    return initialLoveStory;
  });

  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!hasOpenedIntro) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [hasOpenedIntro]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDF5F4] text-[#8C5A66] font-sans selection:bg-[#FADADD] selection:text-[#8C5A66] overflow-x-hidden">
      
      {/* Floating Rose Petals Background Animation */}
      <FloatingPetals />

      {/* Flower Petal Cursor Trail Effect */}
      <PetalCursorTrail />

      {/* Occasional Flying Butterfly Effect */}
      <FlyingButterfly />

      {/* Scattered Secret Love Notes */}
      <HiddenLoveNotes notes={initialLoveStory.hiddenNotes || []} />

      {!hasOpenedIntro ? (
        /* Intro Scene with Blooming Flowers & Vintage Wax Envelope */
        <EnvelopeIntro
          girlfriendName={config.girlfriendName}
          senderName={config.senderName}
          occasion={config.occasion}
          onOpen={() => setHasOpenedIntro(true)}
        />
      ) : (
        /* Main Interactive Scrapbook Love Journey */
        <main className="relative z-10">
          
          {/* Heartfelt Love Letter */}
          <LoveLetter
            salutation={config.letter.salutation}
            paragraphs={config.letter.bodyParagraphs}
            closing={config.letter.closing}
            signature={config.letter.signature}
            girlfriendName={config.girlfriendName}
            senderName={config.senderName}
            onScrollToStory={() => scrollToSection('our-story')}
          />

          {/* Personalized Interactive Scrapbook Photo Memory Gallery */}
          <ScrapbookGallery
            memories={config.scrapbookMemories || initialLoveStory.scrapbookMemories}
          />

          {/* Music Section / Premium Vintage Player */}
          <CassettePlayer
            song={config.song || initialLoveStory.song}
          />

          {/* Final Section / Footer: Night Sky & Petal Celebration Surprise */}
          <NightSkyFinale
            heading={config.nightSky.heading}
            subheading={config.nightSky.subheading}
            buttonText={config.nightSky.buttonText}
            girlfriendName={config.girlfriendName}
            senderName={config.senderName}
            surpriseLines={config.nightSky.surpriseLines || initialLoveStory.nightSky.surpriseLines}
            loveMessage={config.nightSky.loveMessage || initialLoveStory.nightSky.loveMessage}
            foreverPrompt={config.nightSky.foreverPrompt || initialLoveStory.nightSky.foreverPrompt}
            onReplayIntro={() => setHasOpenedIntro(false)}
          />
        </main>
      )}
    </div>
  );
}
