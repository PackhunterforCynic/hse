"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Camera, PlayCircle, MessageCircle } from 'lucide-react';

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thepraiseayodeji',
    theme: 'hover:text-[#E1306C]',
    icon: <Camera className="w-5 h-5" />
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@hsedigitals',
    theme: 'hover:text-[#FF0000]',
    icon: <PlayCircle className="w-5 h-5" />
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/917204042538?text=Hi%20Havilah!%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.',
    theme: 'hover:text-[#25D366]',
    icon: <MessageCircle className="w-5 h-5" />
  }
];

export default function FloatingSocials() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Scrolling down
    } else {
      setHidden(false); // Scrolling up
    }
  });

  return (
    <motion.div
      variants={{
        visible: { opacity: 1, x: 0, y: 0 },
        hiddenDesktop: { opacity: 0, x: 20 },
        hiddenMobile: { opacity: 0, y: 50 }
      }}
      initial="visible"
      animate={hidden ? (isMobile ? 'hiddenMobile' : 'hiddenDesktop') : 'visible'}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed z-40 flex items-center justify-center 
                 bottom-6 left-1/2 -translate-x-1/2 flex-row gap-6 bg-background/50 backdrop-blur-md px-8 py-4 rounded-full border border-border
                 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:right-8 md:translate-x-0 md:flex-col md:bg-transparent md:backdrop-blur-none md:border-none md:px-0 md:py-0"
    >
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className={`text-text/50 ${social.theme} transition-all duration-300 hover:scale-110 transform`}
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </motion.div>
  );
}
