export interface Event {
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  schedule: { time: string; title: string; desc: string }[];
  speakers: { name: string; role: string; avatarUrl: string }[];
  tickets: { tier: string; price: string; description: string; perks: string[] }[];
}

export const eventsData: Event[] = [
  {
    slug: "film-festival-2026",
    title: "Havilah Film Festival 2026",
    category: "Film Festivals",
    date: "Oct 12, 2026",
    location: "Theater One & Online",
    description: "Our annual cinematic festival displaying narrative short films and student documentaries. Includes live screens, director Q&As, and an awards mixer.",
    schedule: [
      { time: "10:00 AM", title: "Opening Ceremony", desc: "Welcome address and inaugural remarks from the festival board." },
      { time: "11:00 AM", title: "Narrative Short Film Block", desc: "Screening of 5 selected dramatic and thriller short films." },
      { time: "03:00 PM", title: "Directors Panel Q&A", desc: "Discussion with selected directors on their scripting processes." },
      { time: "07:00 PM", title: "Awards Mixer & Cocktail", desc: "Presentation of awards for best short, best cinematography, and cocktail reception." },
    ],
    speakers: [
      { name: "David Vance", role: "Festival Chairman", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
      { name: "Sarah Jenkins", role: "DP Panelist", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" },
    ],
    tickets: [
      { tier: "General Admission", price: "$45", description: "Access to all screening sessions and panel blocks.", perks: ["All short film screens", "Directors panel Q&A access", "Festival catalog pamphlet"] },
      { tier: "VIP Prestige Access", price: "$150", description: "All screening access with premium perks.", perks: ["Front row theater seats", "VIP lounge mixer access", "Private masterclass screening ticket", "Havilah studio goodie bag"] },
    ],
  },
  {
    slug: "cinematography-panel",
    title: "Cinematography Panel: Lighting Masterclass",
    category: "Masterclasses",
    date: "Nov 05, 2026",
    location: "Studio Stage A",
    description: "A panel discussion and live staging workshop demonstrating anamorphic lens configurations and modern HDR lighting grids.",
    schedule: [
      { time: "01:00 PM", title: "Camera Rig Staging", desc: "Overview of camera sensors and anamorphic setups." },
      { time: "03:00 PM", title: "Lighting Staging Workshop", desc: "Live setups displaying high-key vs low-key cinematic lighting styles." },
      { time: "05:00 PM", title: "Open Audience Q&A", desc: "Q&A with working DPs and colorists." },
    ],
    speakers: [
      { name: "Sarah Jenkins", role: "Director of Photography", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" },
      { name: "Elena Rostova", role: "Senior Colorist", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
    ],
    tickets: [
      { tier: "Workshop Admission", price: "$99", description: "Access to stage seating and lighting practice boards.", perks: ["Live staging seat access", "Resolving node templates", "Q&A card submission"] },
    ],
  },
];
