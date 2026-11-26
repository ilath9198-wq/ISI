'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import { ClientProject } from '@/lib/types';

interface Props {
  projects: ClientProject[];
}

export default function ClientProjects({ projects }: Props) {
  return (
    <section id="client-work" className="py-24 sm:py-32 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-mono uppercase tracking-widest font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PRODUCTION CLIENT DEPLOYMENTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            Selected Client Projects
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed font-normal">
            Real projects. Real businesses. Thoughtfully developed digital experiences.
          </p>
        </div>

        {/* Magazine-Style Client Showcases (2 Projects) */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((proj, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={proj.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#FAFAFC] rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/80 shadow-editorial"
              >
                {/* Visual Screenshot (Span 7) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Browser Bar */}
                    <div className="browser-header">
                      <div className="flex items-center gap-1.5">
                        <span className="browser-dot bg-red-400" />
                        <span className="browser-dot bg-amber-400" />
                        <span className="browser-dot bg-emerald-400" />
                      </div>
                      <div className="text-[11px] font-mono text-gray-500 bg-white px-3 py-0.5 rounded border border-gray-200 flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-gray-400" />
                        <span>{proj.live_url.replace('https://', '')}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent transition-colors" />
                    </div>

                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                      <Image
                        src={proj.preview_image}
                        alt={proj.name}
                        fill
                        className="object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  </a>
                </div>

                {/* Narrative & Scope (Span 5) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                      PRODUCTION PLATFORM 0{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="text-[11px] font-mono text-gray-500 uppercase">
                      Live in Production
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                    {proj.name}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-mono text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Explore Live Website Button */}
                  <div className="pt-3">
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <span>Explore Live Website</span>
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
