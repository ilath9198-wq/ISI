'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { IndustryCategory } from '@/lib/types';

interface Props {
  categories: IndustryCategory[];
}

export default function IndustryCategories({ categories }: Props) {
  // Sort strictly by display_order so 01 to 11 are in exact sequence
  const sortedCategories = [...categories].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="industries" className="py-24 sm:py-32 bg-[#F8FAFC] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Visible Small Label Above Heading */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-accent text-[11px] font-mono uppercase tracking-widest font-semibold mb-4 shadow-2xs">
            <Globe className="w-3.5 h-3.5" />
            <span>11 INDUSTRY-SPECIFIC WEBSITE DEMOS</span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            Explore Website Demos by Industry.{' '}
            <span className="text-gray-400 font-light block sm:inline">
              See What&apos;s Possible for Your Business.
            </span>
          </h2>
        </div>

        {/* ONE CONSISTENT SYSTEM: Premium Editorial 3-Column Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
          {sortedCategories.map((cat, idx) => {
            // Formatted 01 to 11 index
            const displayNum = String(idx + 1).padStart(2, '0');
            const cleanUrl = cat.live_url.replace('https://', '').replace(/\/$/, '');

            return (
              <a
                key={cat.id || idx}
                href={cat.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 relative focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <div>
                  {/* Browser-Window Top Bar Frame */}
                  <div className="browser-header px-4 py-3 bg-gray-50/90 border-b border-gray-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="truncate max-w-[210px] text-[10px] font-mono text-gray-500 bg-white px-2.5 py-0.5 rounded border border-gray-200/90 flex items-center gap-1.5 shadow-2xs">
                      <Globe className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                      <span className="truncate">{cleanUrl}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent transition-colors" />
                  </div>

                  {/* Large Website Preview Mockup Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={cat.preview_image}
                      alt={`${cat.name} — Website Demo Preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-black text-accent tracking-wider uppercase">
                        DEMO {displayNum}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full font-semibold">
                        Live Demo
                      </span>
                    </div>

                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-accent transition-colors leading-snug tracking-tight">
                      {cat.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-bold text-gray-700 group-hover:text-accent group-hover:bg-blue-50/30 transition-colors">
                  <span>Explore Live Demo</span>
                  <span className="w-7 h-7 rounded-full bg-white border border-gray-200/80 group-hover:bg-accent group-hover:border-accent text-gray-700 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
