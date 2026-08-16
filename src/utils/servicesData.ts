export interface Service {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  coverImage: string;
  process: { step: string; title: string; description: string }[];
  packages: { name: string; features: string[] }[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: Service[] = [
  {
    slug: "film-production",
    title: "Film Production",
    badge: "Productions",
    tagline: "Award-winning film and commercial production sets.",
    description: "Comprehensive cinematic storytelling across three core categories: Ad films for brand campaigns, narrative Short films, and impactful Documentary films.",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    process: [
      { step: "01", title: "Treatment & Script", description: "Writing scripts, storyboards, and outline treatments." },
      { step: "02", title: "Principal Photography", description: "Executing the shoot using high-end cinema packages." },
      { step: "03", title: "Editing & Sound Mix", description: "Cutting sequences, scoring soundtracks, and mixing audio." },
    ],
    packages: [
      { name: "Ad films for brand campaigns", features: ["1x 60s Brand Film", "1-Day Location Shoot", "Custom Sound Design", "4K Color Grade"] },
      { name: "Short films", features: ["Narrative development", "Principal Shoot", "Full Script & Interview prep", "Dual-native low light camera rigs"] },
      { name: "Documentary films", features: ["In-depth subject research", "Multi-day shooting", "Extensive archival integration", "Cinematic grading"] },
    ],
    faqs: [
      { question: "What cameras do you shoot on?", answer: "We deploy RED, ARRI Alexa, and Sony Venice systems with prime custom anamorphic lenses." },
      { question: "How long does a commercial project take?", answer: "Pre-production takes 2-3 weeks, shooting takes 1-3 days, and post-production takes 3-4 weeks." },
    ],
  },
  {
    slug: "photography",
    title: "Photography",
    badge: "Stills",
    tagline: "Editorial and brand photography with a distinctive visual language.",
    description: "Editorial and brand photography with a sharp, distinctive visual language built for print, deck, and digital spaces.",
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    process: [
      { step: "01", title: "Concept Board", description: "Mood boards, styling, and location scouting." },
      { step: "02", title: "Shoot Day", description: "High-end studio or location photography with tethered review." },
      { step: "03", title: "Retouching", description: "High-end skin retouching, color grading, and print preparation." },
    ],
    packages: [
      { name: "Editorial Campaign", features: ["Full-day Shoot", "Studio or Location", "15 Retouched Images", "Commercial Licensing"] },
      { name: "Product Lookbook", features: ["Multi-day Shoot", "Advanced Set Design", "30 Retouched Images", "E-commerce assets"] },
    ],
    faqs: [
      { question: "Do you provide styling and makeup?", answer: "Yes, we partner with industry-leading stylists, MUAs, and set designers for our campaigns." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    badge: "Growth",
    tagline: "End-to-end digital growth and brand solutions.",
    description: "End-to-end digital growth solutions including robust Web Development, strategic Brand Development, and targeted Social Media Marketing.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    process: [
      { step: "01", title: "Audit & Strategy", description: "Analyzing current funnels and creating a tailored growth roadmap." },
      { step: "02", title: "Asset Creation", description: "Building websites, brand identities, and social media content." },
      { step: "03", title: "Execution", description: "Running paid media, SEO campaigns, and managing socials." },
    ],
    packages: [
      { name: "Web Development", features: ["Custom Next.js & React Frontends", "High-Performance Architectures", "E-commerce Integrations", "SEO Optimizations"] },
      { name: "Brand Development", features: ["Brand Identity", "Visual Guidelines", "Logo & Typography Systems", "Launch Strategy"] },
      { name: "Social Media Marketing", features: ["Monthly Content Shoot", "Paid Ads Management", "Community Growth", "Weekly Reporting"] },
    ],
    faqs: [
      { question: "Do you design websites?", answer: "Yes, we design custom interactive high-performance web gateways matching the brand's identity system." },
    ],
  }
];
