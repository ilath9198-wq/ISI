'use client';

import React from 'react';
import { Compass, Palette, Code2, Rocket, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Understand',
      subtitle: 'Strategy & Audience',
      desc: 'We begin by understanding your business, audience, objectives and requirements.',
      icon: Compass,
      accent: 'blue',
      tag: 'DISCOVERY',
    },
    {
      num: '02',
      title: 'Design',
      subtitle: 'UI/UX & Art Direction',
      desc: 'We develop the visual direction, structure and user experience of your website.',
      icon: Palette,
      accent: 'indigo',
      tag: 'CREATIVE',
    },
    {
      num: '03',
      title: 'Develop',
      subtitle: 'Next.js & Performance',
      desc: 'We turn the approved design into a responsive, functional and high-performing website.',
      icon: Code2,
      accent: 'purple',
      tag: 'ENGINEERING',
    },
    {
      num: '04',
      title: 'Launch',
      subtitle: 'QA & Zero-Downtime',
      desc: 'We test, refine and launch your website, ensuring everything works as intended.',
      icon: Rocket,
      accent: 'emerald',
      tag: 'DEPLOYMENT',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-b border-gray-200/80 relative overflow-hidden">
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50/60 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-accent text-[11px] font-mono uppercase tracking-widest font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR DEVELOPMENT JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            From First Conversation to Final Launch.
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed font-normal">
            Every great website starts with an idea. Here&apos;s how we turn yours into a digital experience.
          </p>
        </div>

        {/* CONNECTED FOUR-STAGE VISUAL JOURNEY */}
        <div className="relative">
          {/* Desktop Connecting Progression Rail */}
          <div className="hidden lg:block absolute top-[44px] left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-blue-200 via-indigo-200 via-purple-200 to-emerald-200 -z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-indigo-600 to-emerald-500 opacity-60" />
          </div>

          {/* Stages Grid (4 Steps) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((st, i) => {
              const Icon = st.icon;

              return (
                <div
                  key={st.num}
                  className="group relative bg-[#FBFBFE] hover:bg-white rounded-3xl p-7 sm:p-8 border border-gray-200/80 hover:border-accent/40 shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Oversized Ghost Watermark Number */}
                  <span className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-gray-100 group-hover:text-blue-50/70 transition-colors pointer-events-none select-none font-mono">
                    {st.num}
                  </span>

                  <div>
                    {/* Top Step Indicator & Icon Node */}
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm group-hover:border-accent group-hover:bg-accent group-hover:text-white text-accent flex items-center justify-center transition-all duration-300">
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-500 group-hover:border-accent/30 group-hover:text-accent shadow-2xs">
                        {st.tag}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="space-y-1 mb-4 relative z-10">
                      <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase block">
                        STAGE {st.num}
                      </span>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-accent transition-colors">
                        {st.title}
                      </h3>
                      <p className="text-xs font-mono text-gray-400 font-medium">
                        {st.subtitle}
                      </p>
                    </div>

                    {/* Step Description */}
                    <p className="text-sm text-gray-600 leading-relaxed font-normal relative z-10">
                      {st.desc}
                    </p>
                  </div>

                  {/* Bottom Milestone Check */}
                  <div className="mt-8 pt-4 border-t border-gray-100/90 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-accent transition-colors relative z-10">
                    <span className="text-[11px] font-semibold">Phase {st.num} of 04</span>
                    <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
