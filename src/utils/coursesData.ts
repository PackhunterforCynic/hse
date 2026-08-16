export interface Course {
  slug: string;
  title: string;
  category: string;
  level: string;
  hours: string;
  tagline: string;
  description: string;
  imageSrc: string;
  instructor: {
    name: string;
    role: string;
    bio: string;
    avatarUrl: string;
  };
  syllabus: { week: string; title: string; topics: string[] }[];
  reviews: { student: string; quote: string; rating: number }[];
}

export const coursesData: Course[] = [
  {
    slug: "cinematography-masterclass",
    title: "Cinematography Masterclass",
    category: "Camera & Lighting",
    level: "Intermediate - Advanced",
    hours: "40 hours",
    tagline: "Learn the secrets of lighting, lenses, and composition.",
    description: "This course is a comprehensive exploration of professional filmmaking. Under the guidance of working directors of photography, you will stage scenes, rig anamorphic camera packages, and master low-light sets.",
    imageSrc: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    instructor: {
      name: "Sarah Jenkins",
      role: "Director of Photography",
      bio: "Sarah has DP'd award-winning feature narratives and commercial spots globally for over a decade. Her signature style revolves around high-contrast natural lighting systems.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    },
    syllabus: [
      { week: "Week 1", title: "Cinema Camera Systems & Sensors", topics: ["Dynamic Range & Exposure latitude", "Sensors matching & dual native ISO", "Lenses: Spherical vs Anamorphic sets"] },
      { week: "Week 2", title: "Visual Composition & Storyboarding", topics: ["Camera panning & stabilizers", "Blocking dramatic dialogue", "Visual metaphor creation"] },
      { week: "Week 3", title: "Lighting Mechanics & Low Light", topics: ["High-key vs Low-key setups", "HMI, LED, and natural lighting diffusers", "Low-light ISO tracking"] },
      { week: "Week 4", title: "Staging a Production Set", topics: ["Safety, coordination, crew hierarchy", "Directing focus pullers", "Audition film capture wrap"] },
    ],
    reviews: [
      { student: "Alex Reed", quote: "An absolute game changer. The lighting staging sessions were extremely practical.", rating: 5 },
      { student: "Maya Lin", quote: "Felt like a real production set. Highly recommend to indie directors.", rating: 5 },
    ],
  },
  {
    slug: "brand-narrative-strategy",
    title: "Brand Narrative Strategy",
    category: "Branding",
    level: "Beginner - Intermediate",
    hours: "24 hours",
    tagline: "Craft visual strategies that connect and convert.",
    description: "Learn how to build visual identities, corporate brand guidelines, motion guidelines, and high-impact commercial script structures.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    instructor: {
      name: "Sophia Rossi",
      role: "Creative Brand Strategist",
      bio: "Sophia leads branding campaigns for tech and consumer corporations at Havilah, specializing in emotional visual strategy and logo system architectures.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    },
    syllabus: [
      { week: "Week 1", title: "Brand Identity Architecture", topics: ["Logo marks, typography, and color tokens", "Corporate branding landscapes", "Competitive audit sheets"] },
      { week: "Week 2", title: "Commercial Writing & Scripting", topics: ["Writing treatments and commercial concepts", "Timing dialogue hooks", "Creative pitches"] },
      { week: "Week 3", title: "Campaign Rollout Management", topics: ["Asset production coordination", "Social reels layout", "Client briefing sheets"] },
    ],
    reviews: [
      { student: "Derrick Cole", quote: "Gave us a solid blueprint to restructure our agency's client brief process.", rating: 5 },
    ],
  },
  {
    slug: "resolve-color-grading",
    title: "Resolve Color Grading",
    category: "Post-Production",
    level: "Intermediate",
    hours: "30 hours",
    tagline: "Master color spaces, LUTs, and color design.",
    description: "Become a professional colorist. Discover the color grading tools of Davinci Resolve, from node trees and primaries to HDR grading and film emulation profiles.",
    imageSrc: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
    instructor: {
      name: "Elena Rostova",
      role: "Senior Colorist",
      bio: "Elena grades corporate spots and narrative shorts at Havilah. Her technical colorist approach specializes in HDR spaces and custom LUT configurations.",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    },
    syllabus: [
      { week: "Week 1", title: "Davinci Resolve Node Architecture", topics: ["Serial, Parallel, Layer, and Shared Nodes", "Color Management: ACES vs DaVinci YRGB Wide Gamut", "Scopes matching"] },
      { week: "Week 2", title: "Primary & Secondary Adjustments", topics: ["Offset, Lift, Gamma, Gain controls", "HDR wheels & custom curves", "Qualifiers, tracking, power windows"] },
      { week: "Week 3", title: "Film Emulation & Grading Look Design", topics: ["Film print emulation logs", "Halation, grain, and glow controls", "Managing client review sessions"] },
    ],
    reviews: [
      { student: "Liam Novak", quote: "Elena's nodes structures are legendary. Highly recommended colorist course.", rating: 5 },
    ],
  },
];
