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
  position: { x: number; y: number }; // Percentage position on page
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
    audioUrl?: string;
    lyrics: string[];
  };
  milestones: Milestone[];
  polaroids: PolaroidPhoto[];
  reasonsNotes: LoveReasonNote[];
  deskItems: DeskItem[];
  littleThings: ScrapbookThing[];
  hiddenNotes: HiddenLoveNote[];
  reasonsWeWork: {
    title: string;
    subheading: string;
    bullets: { label: string; text: string; sticker: string }[];
  };
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
  senderName: "With All My Heart",
  occasion: "National Girlfriend's Day",
  landingTitle: "For Hafsa ❤️",
  landingSubtitle: "A little corner of the internet made just for you.",
  letter: {
    salutation: "My Dearest Hafsa,",
    bodyParagraphs: [
      "Happy National Girlfriend's Day ❤️\n\nI wanted to make you something that wasn't bought from a store or copied from somewhere else.\n\nEvery little detail here was made with you in mind.\n\nEvery animation.\nEvery flower.\nEvery memory.\nEvery word.\n\nBecause you deserve something as special as you are.",
      "Thank you for making ordinary days feel extraordinary.\n\nThank you for every smile you've given me.\n\nFor every laugh.\n\nFor every conversation that made my day better.",
      "I don't know what the future has planned for us, but I know that if you're in it, it'll always be worth looking forward to.\n\nThis little website isn't enough to express how much you mean to me...\n\nBut I hope it reminds you of one thing—\n\nYou'll always have a special place in my heart."
    ],
    closing: "Happy National Girlfriend's Day, Hafsa.",
    signature: "❤️"
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
  milestones: [
    {
      id: "m1",
      date: "Fill in Date",
      title: "❤️ The day we first met",
      description: "A moment etched in my memory forever—the very first instant our paths crossed and my world became so much brighter.",
      location: "Where It Began",
      tag: "Unforgettable",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m2",
      date: "Fill in Date",
      title: "❤️ Our first conversation",
      description: "Hours flew by like minutes. Listening to you speak, laughing together, and knowing right then that you were truly someone extraordinary.",
      location: "First Long Chat",
      tag: "Spark",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m3",
      date: "Fill in Date",
      title: "❤️ The first time you made me smile",
      description: "That genuine, radiant laugh of yours caught me completely off guard and instantly warmed my heart.",
      location: "Sweet Memories",
      tag: "Pure Joy",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m4",
      date: "Fill in Date",
      title: "❤️ The moment I realized I liked you",
      description: "In the middle of a simple conversation, it clicked—I found myself looking forward to every message and every moment with you.",
      location: "Special Realization",
      tag: "Butterflies",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m5",
      date: "Today & Always",
      title: "❤️ Today - Celebrating Hafsa",
      description: "National Girlfriend's Day! Celebrating the incredible girl who brings so much sweetness, beauty, and happiness into my life.",
      location: "Right Here, Right Now",
      tag: "For You Hafsa",
      imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
    }
  ],
  polaroids: [
    {
      id: "p1",
      title: "Our happiest day",
      date: "Cherished Moment",
      caption: "A day filled with pure laughter, sunshine, and endless happiness with you, Hafsa.",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
      rotation: -3,
      scratchMemo: "You looked so beautiful here! ✨"
    },
    {
      id: "p2",
      title: "That unforgettable laugh",
      date: "Sweet Memories",
      caption: "Your laugh is my absolute favorite sound in the whole world.",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
      rotation: 2,
      scratchMemo: "Your smile is contagious 💖"
    },
    {
      id: "p3",
      title: "A random moment I'll always remember",
      date: "Unscripted Joy",
      caption: "Proof that simple, quiet moments with you are the ones that mean the absolute most.",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      rotation: -2,
      scratchMemo: "My favorite kind of afternoon 🌧️"
    },
    {
      id: "p4",
      title: "One of my favorite pictures of you",
      date: "Radiant Hafsa",
      caption: "Every single time I see this picture, my heart skips a beat.",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      rotation: 4,
      scratchMemo: "You shine so brightly 🌸"
    },
    {
      id: "p5",
      title: "The photo that always makes me smile",
      date: "Instant Joy",
      caption: "No matter how tough a day gets, looking at this instantly makes everything better.",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
      rotation: -4,
      scratchMemo: "Your warmth is unmatched ✨"
    },
    {
      id: "p6",
      title: "A beautiful memory",
      date: "Forever In My Heart",
      caption: "Holding onto this precious moment forever.",
      imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
      rotation: 3,
      scratchMemo: "I cherish you, Hafsa ❤️"
    }
  ],
  reasonsNotes: [
    {
      id: "r1",
      title: "Your smile",
      noteText: "It lights up every room and turns my worst days into pure warmth.",
      rotation: -4,
      color: "#FADADD"
    },
    {
      id: "r2",
      title: "Your laugh",
      noteText: "The sweetest, most comforting sound that I could listen to on repeat forever.",
      rotation: 3,
      color: "#F6E6E8"
    },
    {
      id: "r3",
      title: "Your kindness",
      noteText: "The gentle, genuine empathy you share with everyone around you.",
      rotation: -2,
      color: "#E8B7C0"
    },
    {
      id: "r4",
      title: "The way you care",
      noteText: "How deeply and thoughtfully you pay attention to the smallest details.",
      rotation: 5,
      color: "#FADADD"
    },
    {
      id: "r5",
      title: "Your beautiful eyes",
      noteText: "Full of sincerity, kindness, and that adorable sparkle when you're happy.",
      rotation: -3,
      color: "#F6E6E8"
    },
    {
      id: "r6",
      title: "Your voice",
      noteText: "Calming, familiar, and instantly bringing a sense of peace whenever you speak.",
      rotation: 2,
      color: "#E8B7C0"
    },
    {
      id: "r7",
      title: "Your honesty",
      noteText: "Your genuine heart and how true you remain to who you are.",
      rotation: -4,
      color: "#FADADD"
    },
    {
      id: "r8",
      title: "Your patience",
      noteText: "The gentle, understanding grace you give even in busy or stressful times.",
      rotation: 4,
      color: "#F6E6E8"
    },
    {
      id: "r9",
      title: "Your personality",
      noteText: "Witty, sweet, uniquely charming, and completely one of a kind.",
      rotation: -2,
      color: "#E8B7C0"
    },
    {
      id: "r10",
      title: "The comfort I feel around you",
      noteText: "Being with you feels like home—peaceful, natural, and utterly safe.",
      rotation: 3,
      color: "#FADADD"
    },
    {
      id: "r11",
      title: "How you make bad days better",
      noteText: "Just a single message or smile from you turns everything around.",
      rotation: -5,
      color: "#F6E6E8"
    },
    {
      id: "r12",
      title: "Simply because you're Hafsa",
      noteText: "You don't have to do anything special—just being yourself is more than enough.",
      rotation: 2,
      color: "#E8B7C0"
    }
  ],
  deskItems: [
    {
      id: "bouquet",
      name: "Fresh Floral Bouquet",
      iconName: "Flower",
      badge: "For Hafsa",
      description: "A delicate bouquet of soft pink roses and fragrant garden blooms.",
      details: "A small symbol of how much brightness you bring into my life every single day.",
      x: 18,
      y: 20,
      rotation: -8,
      imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "letter",
      name: "Handwritten Letters",
      iconName: "Mail",
      badge: "Love Note",
      description: "Stationery penned with thoughts of you.",
      details: "Every sentence written with care, reminding you how cherished you are.",
      x: 48,
      y: 15,
      rotation: 5,
      imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "tickets",
      name: "Favorite Moments",
      iconName: "Ticket",
      badge: "Keepsake",
      description: "Memories collected along the way.",
      details: "Little tokens celebrating the laughter and conversations we share.",
      x: 75,
      y: 25,
      rotation: -12,
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "coffee",
      name: "Warm Mug",
      iconName: "Coffee",
      badge: "Cozy Time",
      description: "A steamy cup for long, sweet conversations.",
      details: "Nothing beats relaxing and chatting about everything under the sun with you.",
      x: 20,
      y: 65,
      rotation: 10,
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "map",
      name: "Dream Travel Map",
      iconName: "MapPin",
      badge: "Adventures",
      description: "Places waiting for us to explore together.",
      details: "All the future journeys and scenic views waiting ahead.",
      x: 52,
      y: 60,
      rotation: -4,
      imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "camera",
      name: "Film Camera",
      iconName: "Camera",
      badge: "Snapshots",
      description: "Capturing moments of Hafsa's smile.",
      details: "Preserving every precious memory so we can look back with warmth.",
      x: 82,
      y: 62,
      rotation: 8,
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80"
    }
  ],
  littleThings: [
    {
      id: "lt1",
      category: "Favorite Nickname",
      frontTitle: "Favorite Nickname For You",
      backDescription: "My special title for you that always brings a gentle smile to your face.",
      sticker: "✨"
    },
    {
      id: "lt2",
      category: "Cutest Habit",
      frontTitle: "Your Cutest Habit",
      backDescription: "The adorable way you get excited when talking about things you love!",
      sticker: "🌸"
    },
    {
      id: "lt3",
      category: "Dream Destination",
      frontTitle: "Your Dream Destination",
      backDescription: "A peaceful, breathtaking place where we can watch the sunset together.",
      sticker: "✈️"
    },
    {
      id: "lt4",
      category: "Future List",
      frontTitle: "Things I Want Us To Do Together",
      backDescription: "Stargazing, cozy coffee dates, late-night talks, and endless adventures.",
      sticker: "💖"
    },
    {
      id: "lt5",
      category: "Music",
      frontTitle: "Songs That Remind Me Of You",
      backDescription: "Soft, romantic melodies that play on repeat in my mind whenever I think of Hafsa.",
      sticker: "🎶"
    },
    {
      id: "lt6",
      category: "Watchlist",
      frontTitle: "Movies We Should Watch Together",
      backDescription: "Wrapped under a warm blanket with popcorn and hot cocoa on a quiet night.",
      sticker: "🎬"
    },
    {
      id: "lt7",
      category: "Night Chats",
      frontTitle: "Late-Night Conversations",
      backDescription: "Talking about life, dreams, and silly thoughts until the early hours of morning.",
      sticker: "🌙"
    },
    {
      id: "lt8",
      category: "Adventures",
      frontTitle: "Future Adventures",
      backDescription: "All the unwritten chapters waiting for us in the future.",
      sticker: "🌟"
    }
  ],
  hiddenNotes: [
    { id: "hn1", message: "I miss you.", position: { x: 12, y: 18 } },
    { id: "hn2", message: "You make my day better.", position: { x: 85, y: 22 } },
    { id: "hn3", message: "You have the prettiest smile.", position: { x: 8, y: 45 } },
    { id: "hn4", message: "I'm lucky to have you.", position: { x: 88, y: 55 } },
    { id: "hn5", message: "I'll always choose you.", position: { x: 15, y: 72 } },
    { id: "hn6", message: "You deserve the world.", position: { x: 82, y: 80 } },
    { id: "hn7", message: "You're beautiful.", position: { x: 48, y: 35 } },
    { id: "hn8", message: "I hope this made you smile.", position: { x: 50, y: 88 } }
  ],
  reasonsWeWork: {
    title: "Reasons We Work",
    subheading: "A handcrafted scrapbook collage celebrating us.",
    bullets: [
      {
        label: "Natural Connection",
        text: "Conversations flow effortlessly, and even silent moments feel peaceful and comforting.",
        sticker: "🌸"
      },
      {
        label: "Best Friends",
        text: "Being silly, sharing inside jokes, and being entirely true to ourselves.",
        sticker: "💖"
      },
      {
        label: "Mutual Care",
        text: "Always supporting each other's happiness and celebrating every little win.",
        sticker: "⭐"
      },
      {
        label: "Infinite Comfort",
        text: "Knowing that around you, Hafsa, I can be 100% myself without hesitation.",
        sticker: "✨"
      }
    ]
  },
  nightSky: {
    heading: "I'd choose you. Again. Tomorrow. Next year. In every lifetime.",
    subheading: "Thank you for being you.",
    buttonText: "One More Surprise ✨",
    surpriseLines: [
      "If I had one wish...",
      "I'd wish to experience every lifetime with you."
    ],
    loveMessage: "I love you, Hafsa ❤️",
    foreverPrompt: "Forever?"
  }
};
