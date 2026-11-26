'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2, Monitor, Code2, Cpu } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#0A0D14] border-b border-gray-800/80">
      {/* High-Resolution Cinematic Creative Studio Workstation Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2000&q=85"
          alt="ISI Creative Web Development Studio Workstation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-40 mix-blend-luminosity filter contrast-125"
        />

        {/* Multi-Layer Cinematic Scrim: Deep obsidian-navy to rich studio charcoal */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/98 via-[#0A0E1A]/92 to-[#0E1528]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-[#07090F]/80" />

        {/* Ambient Studio Lighting Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 translate-x-1/3 translate-y-1/3 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle Architectural Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headline, Narrative & Primary Actions (Span 7) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 text-[11px] font-mono uppercase tracking-widest font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#0052FF]" />
              <span>BESPOKE WEB DEVELOPMENT & DIGITAL ATELIER</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Websites That Make Your Business{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent italic font-serif font-normal">
                Stand Out.
              </span>
            </h1>

            {/* Supporting Statement */}
            <p className="text-base sm:text-xl text-slate-300/90 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>

            {/* Two Main CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#industries"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-blue-600 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_25px_rgba(0,82,255,0.4)] hover:shadow-[0_6px_30px_rgba(0,82,255,0.6)] transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#project-enquiry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-200 hover:border-white/40 transform hover:-translate-y-0.5"
              >
                <span>Start a Project</span>
              </a>
            </div>

            {/* Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15 max-w-lg">
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-white block">
                  11
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                  Industry Demos
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-blue-400 block">
                  02
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                  Client Launches
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 block">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium">
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
