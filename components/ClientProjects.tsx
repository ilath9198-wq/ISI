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
    <section id="client-work" className="py-20 sm:py-24 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-mono uppercase tracking-widest font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LIVE PRODUCTION WORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            Client Projects Delivered by Us
          </h2>
        </div>

        {/* Compact, Highly Mobile-Friendly Cards Grid (2 Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
          {projects.map((proj) => {
            const cleanUrl = proj.live_url.replace('https://', '').replace(/\/$/, '');

            return (
              <a
                key={proj.id}
                href={proj.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-[#F9FAFB] hover:bg-white rounded-2xl border border-gray-200 hover:border-accent overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {/* Browser Header Bar */}
                <div className="px-4 py-2.5 bg-gray-100/80 border-b border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 bg-white px-2.5 py-0.5 rounded border border-gray-200 flex items-center gap-1.5">
                    <Globe className="w-2.5 h-2.5 text-gray-400" />
                    <span className="truncate max-w-[180px]">{cleanUrl}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent transition-colors" />
                </div>

                {/* Compact Preview Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={proj.preview_image}
                    alt={proj.name}
                    fill
                    className="object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Major Details: Name & Direct Navigation Link */}
                <div className="p-5 flex items-center justify-between gap-4 bg-white">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight group-hover:text-accent transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mt-0.5 truncate max-w-[200px] sm:max-w-[260px]">
                      {cleanUrl}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 group-hover:bg-accent text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-colors shrink-0 shadow-xs">
                    <span>Visit Site</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
