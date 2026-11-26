'use client';

import React from 'react';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

interface HeroProps {
  headline?: string;
  description?: string;
}

export default function Hero({
  headline = 'Websites That Make Your Business Stand Out.',
  description = 'We design and develop thoughtful digital experiences for businesses across industries. Explore our website concepts and see what your business could look like online.',
}: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden editorial-grid-bg border-b border-gray-100">
      {/* Subtle Ambient Backing Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headline, Narrative & Primary Actions (Span 7) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200/80 text-gray-800 text-[11px] font-mono uppercase tracking-widest font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>BESPOKE WEB DEVELOPMENT & DIGITAL ATELIER</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-ink tracking-tight leading-[1.08]">
              {headline}
            </h1>

            {/* Supporting Statement */}
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>

            {/* Two Main CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#industries"
                className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-white hover:bg-accent rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 text-accent group-hover:text-white" />
              </a>

              <a
                href="#project-enquiry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:border-gray-400"
              >
                <span>Start a Project</span>
              </a>
            </div>

            {/* Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/80 max-w-lg">
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-ink block">
                  11
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-medium">
                  Industry Concepts
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-accent block">
                  02
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-medium">
                  Client Launches
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-ink block">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-medium">
                  Bespoke Code
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Project Enquiry Form (Span 5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
