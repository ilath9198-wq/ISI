'use client';

import React from 'react';
import { Search, Palette, Code, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Understand',
      desc: 'We understand your business, goals and requirements.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Design',
      desc: 'We create a website concept aligned with your brand identity.',
      icon: Palette,
    },
    {
      num: '03',
      title: 'Develop',
      desc: 'We build a responsive, functional and user-friendly website.',
      icon: Code,
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'We test, refine and launch your website.',
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-3">
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            Our Development Process
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed font-normal">
            A focused four-step methodology turning your business vision into a high-converting digital experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="relative bg-[#FAFAFC] p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-3xl font-black text-gray-300 group-hover:text-accent transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-accent shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
                    {st.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200/60 flex items-center gap-2 text-[11px] font-mono text-gray-400">
                  <span>STAGE {st.num}</span>
                  <span className="w-3 h-px bg-gray-300" />
                  <span>PHASE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
