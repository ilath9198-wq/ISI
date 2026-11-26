'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Explore Websites', href: '#industries' },
    { label: 'Our Work', href: '#client-work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ISI Logo / Wordmark */}
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
            <span className="font-mono text-2xl font-black tracking-tighter text-ink group-hover:text-accent transition-colors">
              ISI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase text-gray-500 font-semibold border-l border-gray-300 pl-2.5">
              Digital Studio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono font-medium tracking-wider uppercase text-gray-600 hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#project-enquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white hover:bg-accent text-xs font-mono font-bold tracking-wider uppercase rounded-full transition-all duration-200 shadow-sm hover:shadow"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:text-white" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-ink focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium uppercase tracking-wider text-gray-700 hover:text-accent py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            <a
              href="#project-enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-accent text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
