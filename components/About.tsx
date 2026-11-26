'use client';

import React from 'react';
import { Layers, Sparkles, Code2, Shield } from 'lucide-react';

interface Props {
  headline?: string;
  description?: string;
}

export default function About({
  headline = 'Thoughtful Websites. Built Around Your Business.',
  description = 'At ISI, we believe every business deserves a digital presence that reflects its identity. We create modern, functional and visually engaging websites designed to help businesses present themselves professionally online.',
}: Props) {
  const pillars = [
    {
      icon: Layers,
      title: 'Industry-Specific Identity',
      desc: 'We do not recycle templates. Each website is designed from first principles to resonate with the specific aesthetic and audience of your industry.',
    },
    {
      icon: Code2,
      title: 'Modern High-Performance Code',
      desc: 'Engineered with clean React, Next.js, and modern CSS for lightning-fast speeds, responsive elegance, and seamless mobile usability.',
    },
    {
      icon: Shield,
      title: 'Full Technical Independence',
      desc: 'Clean source repositories, transparent deployments, and custom database backends that empower you to manage your platform independently.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FBFBFC] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-3">
            ABOUT ISI
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-5 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Studio Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl border border-gray-200/80 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-accent mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span>0{i + 1}</span>
                  <span className="w-4 h-px bg-gray-200" />
                  <span>CORE PILLAR</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
