'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080A10] text-gray-400 text-xs py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-black text-white tracking-tighter">
              ISI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-gray-400 text-xs tracking-wider uppercase">
              Web Development Portfolio & Client Acquisition
            </span>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
            <a href="#industries" className="hover:text-white transition-colors">
              Industry Concepts
            </a>
            <a href="#client-work" className="hover:text-white transition-colors">
              Client Projects
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-[11px] uppercase transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} ISI Studio. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-accent transition-colors"
              title="Secure Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
