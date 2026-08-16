import React from "react";
import Link from "next/link";
import { Camera, PlayCircle, MessageCircle, ArrowRight } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-black pt-32 pb-12 border-t border-border/20 text-text/80 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Massive Logo / Call to Action */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-serif text-5xl md:text-8xl tracking-tight text-white mb-2 uppercase flex items-center gap-4">
              HAVILAH
              <span className="text-accent italic text-3xl md:text-6xl font-light">PRO</span>
            </h2>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-accent/80 ml-1">
              Cinematic Storytelling & Brand Growth
            </p>
          </div>
          <Link
            href="/appointments"
            className="group relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 hover:border-accent hover:bg-accent/10 transition-colors duration-500"
          >
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <path id="textPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="text-[10px] uppercase font-bold tracking-[0.2em] fill-white/60 group-hover:fill-accent transition-colors duration-500">
                  <textPath href="#textPath" startOffset="0%">
                    Start Your Project • Book Now •
                  </textPath>
                </text>
              </svg>
            </div>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-accent transition-colors duration-500 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24 border-t border-border/20 pt-16">
          <div className="col-span-1 md:col-span-2 max-w-sm">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Stay Updated</h3>
            <p className="text-sm mb-6 leading-relaxed">
              Join our newsletter to receive exclusive insights on visual strategy, case studies, and behind-the-scenes content from our studio.
            </p>
            <NewsletterForm />
          </div>
          
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Capabilities</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li><Link href="/services" className="hover:text-accent transition-colors">Film Production</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Photography</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Digital Marketing</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Media Archive</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Studio</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li><Link href="/projects" className="hover:text-accent transition-colors">Featured Projects</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/internships" className="hover:text-accent transition-colors">Careers & Internships</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/20 text-[10px] font-bold uppercase tracking-widest">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Havilah Pro. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="https://www.instagram.com/thepraiseayodeji" target="_blank" className="hover:text-accent transition-colors flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" /> Instagram
            </Link>
            <Link href="https://www.youtube.com/@hsedigitals" target="_blank" className="hover:text-accent transition-colors flex items-center gap-2">
              <PlayCircle className="w-3.5 h-3.5" /> YouTube
            </Link>
            <Link href="https://wa.me/917204042538?text=Hi%20Havilah!%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." target="_blank" className="hover:text-accent transition-colors flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
