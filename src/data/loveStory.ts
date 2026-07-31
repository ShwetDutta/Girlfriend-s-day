import photo1 from '../assets/photos/1000071188.jpg';
import photo2 from '../assets/photos/1000071189.jpg';
import photo3 from '../assets/photos/1000071190.jpg';
import photo4 from '../assets/photos/1000071191.jpg';
import photo5 from '../assets/photos/1000071192.jpg';
import photo6 from '../assets/photos/1000071193.jpg';
import photo7 from '../assets/photos/1000071194.jpg';
import photo8 from '../assets/photos/1000071195.jpg';
import photo9 from '../assets/photos/1000071196.jpg';
import photo10 from '../assets/photos/1000071197.jpg';
import photo11 from '../assets/photos/1000071198.jpg';
import photo12 from '../assets/photos/1000071201.jpg';
import photo13 from '../assets/photos/1000071202.jpg';
import photo14 from '../assets/photos/1000071203.jpg';
import photo15 from '../assets/photos/1000071204.jpg';
import photo16 from '../assets/photos/1000071205.jpg';

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  location?: string;
  tag?: string;
  imageUrl?: string;
}

export interface PolaroidPhoto {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  rotation: number;
  scratchMemo?: string;
}

export interface LoveReasonNote {
  id: string;
  title: string;
  noteText: string;
  rotation: number;
  color: string;
}

export interface DeskItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  details: string;
  x: number;
  y: number;
  rotation: number;
  badge?: string;
  imageUrl?: string;
}

export interface ScrapbookThing {
  id: string;
  category: string;
  frontTitle: string;
  backDescription: string;
  sticker: string;
}

export interface HiddenLoveNote {
  id: string;
  message: string;
  position: { x: number; y: number };
}

export interface ScrapbookMemory {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  rotation: number;
  frameStyle?: 'polaroid' | 'film' | 'torn-paper' | 'pressed-flower' | 'vintage-border';
  tapeColor?: 'pink' | 'lavender' | 'gold' | 'mint' | 'rose';
  sticker?: string;
  scratchMemo?: string;
  location?: string;
}

export interface LoveStoryConfig {
  girlfriendName: string;
  senderName: string;
  occasion: string;
  landingTitle: string;
  landingSubtitle: string;
  letter: {
    salutation: string;
    bodyParagraphs: string[];
    closing: string;
    signature: string;
  };
  song: {
    title: string;
    artist: string;
    albumArt: string;
    audioUrl: string;
    lyrics: string[];
  };
  scrapbookMemories: ScrapbookMemory[];
  hiddenNotes?: HiddenLoveNote[];
  nightSky: {
    heading: string;
    subheading: string;
    buttonText: string;
    surpriseLines: string[];
    loveMessage: string;
    foreverPrompt: string;
  };
}

export const initialLoveStory: LoveStoryConfig = {
  girlfriendName: "Hafsa",
  senderName: "Shwet",
  occasion: "National Girlfriend's Day",
  landingTitle: "For Hafsa ❤️",
  landingSubtitle: "A little corner of the internet made just for you.",
  letter: {
    salutation: "My Dearest Hafsa,",
    bodyParagraphs: [
      "Happy National Girlfriend's Day, my love. ❤️",
      "Before you read anything else, I just want you to know that this little website exists because of you.",
      "I could have bought you a gift or written you a simple message, but I wanted to make something that would always be here—a tiny place on the internet that reminds you how much you mean to me.",
      "Every animation, every flower, every little detail you see was chosen while thinking about you. It may not be perfect, but neither was the process. There were bugs, late nights, countless changes, and moments where I wanted to start over. But every minute felt worth it because I was making it for the most special person in my life.",
      "Thank you for being my peace on difficult days, for making ordinary moments feel special, and for giving me so many reasons to smile without even trying.",
      "I don't know what life has planned for us, but I do know one thing—I want to keep making memories with you. The kind we'll laugh about years from now, the kind we'll randomly remember and smile at, and the kind that make life beautiful.",
      "Whenever you feel happy, I hope I'm one of the reasons.",
      "Whenever you feel sad, I hope you remember that you'll never have to go through it alone.",
      "You deserve to be loved, appreciated, and reminded every single day of how amazing you are. I may not always find the perfect words, but I'll always try to show you.",
      "This website isn't just a gift for today.",
      "It's a reminder that someone out there thinks you're incredibly precious.",
      "Someone who smiles when your name appears on their phone.",
      "Someone who quietly thanks the universe for bringing you into their life.",
      "That someone is me.",
      "So, Happy National Girlfriend's Day, Hafsa.",
      "Thank you for being you.",
      "I love you today, tomorrow, and every day after that."
    ],
    closing: "Forever yours,",
    signature: "Shwet ❤️"
  },
  song: {
    title: "Apocalypse",
    artist: "Cigarettes After Sex",
    albumArt: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    audioUrl: "/apocalypse.mp3",
    lyrics: [
      "Got your music in your head, don't say a word...",
      "Your lips, my lips, apocalypse...",
      "Go and hide your love away...",
      "Sharing all your secrets with each other...",
      "When I look at you, my world is at peace..."
    ]
  },
  scrapbookMemories: [
    {
      id: "m1",
      title: "That Bright Smile",
      date: "Memory #1",
      caption: "You don't even have to try—you somehow manage to look effortlessly adorable without even realizing it. I could look at this picture all day.",
      imageUrl: "public/photos/1000071188.jpg",
      rotation: -3,
      frameStyle: "polaroid",
      tapeColor: "pink",
      sticker: "✨",
      scratchMemo: "Cutest face ever! 💕",
      location: "Sunny Afternoons"
    },
    {
      id: "m2",
      title: "Caught Off Guard",
      date: "Memory #2",
      caption: "I still laugh every time I see this one. You somehow managed to look both completely surprised and absurdly cute at the exact same time.",
      imageUrl: photo2,
      rotation: 2,
      frameStyle: "torn-paper",
      tapeColor: "rose",
      sticker: "🌸",
      scratchMemo: "Unfiltered reaction 📸",
      location: "Unexpected Moments"
    },
    {
      id: "m3",
      title: "My Favorite View",
      date: "Memory #3",
      caption: "I took this while you weren't paying attention, and it turned out to be one of my absolute favorites. You look so soft and calm here.",
      imageUrl: photo3,
      rotation: -2,
      frameStyle: "pressed-flower",
      tapeColor: "lavender",
      sticker: "🌿",
      scratchMemo: "Pure natural grace ✨",
      location: "Quiet Evenings"
    },
    {
      id: "m4",
      title: "The Cutest Look",
      date: "Memory #4",
      caption: "I don't know if you realize it, but you have the most endearing expressions when you're thinking about something. I love every little detail of this.",
      imageUrl: photo4,
      rotation: 3,
      frameStyle: "film",
      tapeColor: "gold",
      sticker: "🎀",
      scratchMemo: "Lost in thought 🌸",
      location: "Our Favorite Spot"
    },
    {
      id: "m5",
      title: "Little Drama Queen",
      date: "Memory #5",
      caption: "This expression deserves its own art museum. Only you can pull off a silly pose and still look irresistibly charming.",
      imageUrl: photo5,
      rotation: -4,
      frameStyle: "vintage-border",
      tapeColor: "mint",
      sticker: "🎭",
      scratchMemo: "10/10 performance! 😂",
      location: "Random Fun Days"
    },
    {
      id: "m6",
      title: "Pure Joy",
      date: "Memory #6",
      caption: "This is one of those pictures that instantly makes my day better. Look at how bright your laugh is here—it's impossible not to smile back.",
      imageUrl: photo6,
      rotation: 2,
      frameStyle: "polaroid",
      tapeColor: "pink",
      sticker: "😁",
      scratchMemo: "Contagious giggles!",
      location: "Weekend Outings"
    },
    {
      id: "m7",
      title: "Those Pretty Eyes",
      date: "Memory #7",
      caption: "There's a gentle kind of magic in this picture. This is exactly how I see you every single day—sweet, glowing, and utterly breathtaking.",
      imageUrl: photo7,
      rotation: -1,
      frameStyle: "pressed-flower",
      tapeColor: "rose",
      sticker: "🌹",
      scratchMemo: "Simply stunning",
      location: "Golden Hour"
    },
    {
      id: "m8",
      title: "Silly & Sweet",
      date: "Memory #8",
      caption: "I don't even remember what we were laughing about here, but I remember how happy I felt just being right there beside you.",
      imageUrl: photo8,
      rotation: 4,
      frameStyle: "torn-paper",
      tapeColor: "lavender",
      sticker: "🤫",
      scratchMemo: "Inside jokes forever",
      location: "Late Night Talks"
    },
    {
      id: "m9",
      title: "My Sunshine",
      date: "Memory #9",
      caption: "You have this unbelievable way of lighting up the entire room without even saying a word. This picture captures that energy perfectly.",
      imageUrl: photo9,
      rotation: -3,
      frameStyle: "vintage-border",
      tapeColor: "gold",
      sticker: "☀️",
      scratchMemo: "Radiant vibes",
      location: "Bright Mornings"
    },
    {
      id: "m10",
      title: "Always Adorable",
      date: "Memory #10",
      caption: "You've always had the sweetest smile, and I hope you never stop smiling like this. Seeing you happy is my favorite feeling in the world.",
      imageUrl: photo10,
      rotation: 2,
      frameStyle: "polaroid",
      tapeColor: "mint",
      sticker: "🌷",
      scratchMemo: "Never change! 💕",
      location: "Timeless Moments"
    },
    {
      id: "m11",
      title: "A Candid Moment",
      date: "Memory #11",
      caption: "You didn't know I was taking a picture, which makes it ten times better. Unscripted, natural, and genuinely pretty.",
      imageUrl: photo11,
      rotation: -2,
      frameStyle: "film",
      tapeColor: "pink",
      sticker: "📱",
      scratchMemo: "Sneaky photo win!",
      location: "Coffee Break"
    },
    {
      id: "m12",
      title: "My Pretty Girl",
      date: "Memory #12",
      caption: "I randomly opened my gallery the other day and paused at this exact photo. You look so effortlessly beautiful here, Hafsa.",
      imageUrl: photo12,
      rotation: 3,
      frameStyle: "pressed-flower",
      tapeColor: "rose",
      sticker: "💖",
      scratchMemo: "Saved in my favorites",
      location: "Everyday Magic"
    },
    {
      id: "m13",
      title: "Master of Goofy Faces",
      date: "Memory #13",
      caption: "I don't know what was happening here... but I love it. Never lose this goofy side of yours, it's one of my favorite things about you.",
      imageUrl: photo13,
      rotation: -3,
      frameStyle: "vintage-border",
      tapeColor: "lavender",
      sticker: "🤪",
      scratchMemo: "Top-tier goofiness!",
      location: "Chaos & Laughter"
    },
    {
      id: "m14",
      title: "Just You Being You",
      date: "Memory #14",
      caption: "No poses, no filters—just you being your sweet, cozy self. This picture reminds me why I fell for you in the first place.",
      imageUrl: photo14,
      rotation: 2,
      frameStyle: "polaroid",
      tapeColor: "gold",
      sticker: "☕",
      scratchMemo: "100% genuine you",
      location: "Cozy Afternoons"
    },
    {
      id: "m15",
      title: "Side By Side",
      date: "Memory #15",
      caption: "My favorite picture isn't the most formal or polished one... it's simply the one where I'm lucky enough to be standing right beside you.",
      imageUrl: photo15,
      rotation: -2,
      frameStyle: "torn-paper",
      tapeColor: "pink",
      sticker: "👫",
      scratchMemo: "Us against the world",
      location: "Together Always"
    },
    {
      id: "m16",
      title: "Happy Girlfriend's Day",
      date: "Memory #16",
      caption: "Out of all the memories in my phone, you are my absolute favorite story. I love you today, tomorrow, and every day after that, Hafsa.",
      imageUrl: photo16,
      rotation: 1,
      frameStyle: "pressed-flower",
      tapeColor: "rose",
      sticker: "👑",
      scratchMemo: "Forever Yours, Shwet ❤️",
      location: "To Infinite Memories"
    }
  ],
  nightSky: {
    heading: "Make A Wish, Hafsa ✨",
    subheading: "Under this sky full of stars, every single one shines for you.",
    buttonText: "Click For A Surprise ❤️",
    surpriseLines: [
      "I love the way you laugh.",
      "I love how kind your heart is.",
      "I love how you make ordinary days feel so special.",
      "I love listening to you speak.",
      "I love every little memory we share.",
      "And most of all, I love you."
    ],
    loveMessage: "You are my favorite part of every day. Happy National Girlfriend's Day, my love!",
    foreverPrompt: "To many more memories together ❤️"
  }
};
