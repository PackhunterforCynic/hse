export interface Lesson {
  slug: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  videoSrc: string;
  transcript: string;
  resources: { name: string; size: string; link: string }[];
}

export const lessonsData: Lesson[] = [
  {
    slug: "anamorphic-lens-depth",
    title: "Anamorphic Lens Depth of Field",
    category: "Cinematography",
    duration: "12 mins",
    description: "An in-depth analysis of anamorphic focus falloffs, field curves, and bokeh geometries compared to spherical prime lenses.",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-lens-of-a-camera-in-close-up-34305-large.mp4",
    transcript: "Welcome to today's Havilah tutorial. Today we are analyzing anamorphic focus depths. Anamorphic lenses compress the horizontal field of view by 2x, creating unique oval bokeh shapes and wide aspect ratios. When focusing, you will note horizontal lines stay sharp while vertical lines render smooth falloffs...",
    resources: [
      { name: "Anamorphic Field Chart PDF", size: "4.2 MB", link: "#" },
      { name: "Bokeh Emulation Lut cube", size: "1.8 MB", link: "#" },
    ],
  },
  {
    slug: "hdr-exposure-nodes",
    title: "DaVinci HDR Exposure Nodes",
    category: "Color Grading",
    duration: "18 mins",
    description: "Learn how to structure serial and parallel HDR node trees inside Davinci Resolve to exposure-match high dynamic range shots.",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-video-camera-screen-display-34444-large.mp4",
    transcript: "Hey everyone, in this lesson we are breaking down HDR exposure nodes. Open your node panel. We will initialize a management node using ACES grading spaces, then structure secondary nodes to isolate exposure curves on skin tones...",
    resources: [
      { name: "DaVinci Node Template drp", size: "1.2 MB", link: "#" },
    ],
  },
  {
    slug: "brand-spot-scripting",
    title: "Structuring Brand Spot Scripts",
    category: "Creative Writing",
    duration: "10 mins",
    description: "Discover the 3-act framework used by Havilah copywriters to write 60-second commercial treatments.",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-holding-a-retro-video-camera-40248-large.mp4",
    transcript: "Writing commercial brand spots requires absolute brevity. You have exactly 60 seconds. Act 1 establishes the human conflict. Act 2 introduces the brand solution implicitly. Act 3 wraps with the emotional payoff...",
    resources: [
      { name: "Brand Script Template docs", size: "350 KB", link: "#" },
    ],
  },
];
