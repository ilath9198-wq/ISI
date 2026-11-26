'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Globe } from 'lucide-react';
import { IndustryCategory } from '@/lib/types';

interface Props {
  categories: IndustryCategory[];
}

export default function IndustryCategories({ categories }: Props) {
  // Split into Top 3 Featured and Remaining 8
  const featured = categories.slice(0, 3);
  const remaining = categories.slice(3);

  return (
    <section id="industries" className="py-24 sm:py-32 bg-[#F9FAFC] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-accent text-[11px] font-mono uppercase tracking-widest font-semibold mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>INDUSTRY-SPECIFIC DEMO COLLECTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
            Find Your Industry.{' '}
            <span className="text-gray-400 font-light block sm:inline">
              Explore Your Website.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed font-normal">
            Every business has a different identity. Explore website concepts designed around different industries and discover how your business could look online.
          </p>
        </div>

        {/* 1. TOP 3 FEATURED CATEGORIES (Visual Emphasis Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Card 01 (Span 7) - Large Featured Hero Showcase */}
          {featured[0] && (
            <div className="lg:col-span-7">
              <CategoryCard category={featured[0]} isFeatured={true} />
            </div>
          )}

          {/* Cards 02 & 03 (Span 5) - Stacked Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {featured.slice(1, 3).map((cat) => (
              <CategoryCard key={cat.id} category={cat} isFeatured={false} />
            ))}
          </div>
        </div>

        {/* 2. REMAINING 8 CATEGORIES (Asymmetrical Balanced Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {remaining.map((cat) => (
            <CategoryCard key={cat.id} category={cat} isCompact={true} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  isFeatured = false,
  isCompact = false,
}: {
  category: IndustryCategory;
  isFeatured?: boolean;
  isCompact?: boolean;
}) {
  return (
    <a
      href={category.live_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-card hover:shadow-editorial-hover transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col justify-between ${
        isFeatured ? 'h-full' : ''
      }`}
    >
      <div>
        {/* Browser-Window Top Bar Frame */}
        <div className="browser-header">
          <div className="flex items-center gap-1.5">
            <span className="browser-dot bg-red-400" />
            <span className="browser-dot bg-amber-400" />
            <span className="browser-dot bg-emerald-400" />
          </div>
          <div className="truncate max-w-[200px] text-[10px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
            <Globe className="w-2.5 h-2.5 text-gray-400 shrink-0" />
            <span className="truncate">{category.live_url.replace('https://', '')}</span>
          </div>
          <div className="w-6 text-right">
            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-accent transition-colors ml-auto" />
          </div>
        </div>

        {/* Preview Image Container */}
        <div
          className={`relative w-full overflow-hidden bg-gray-100 ${
            isFeatured ? 'aspect-[16/10] sm:aspect-[16/9]' : isCompact ? 'aspect-[16/10]' : 'aspect-[16/9]'
          }`}
        >
          <Image
            src={category.preview_image}
            alt={category.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes={
              isFeatured
                ? '(max-width: 1024px) 100vw, 60vw'
                : isCompact
                ? '(max-width: 768px) 100vw, 25vw'
                : '(max-width: 1024px) 100vw, 40vw'
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Info */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-black text-accent tracking-wider uppercase">
              CATEGORY {category.category_number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
              Live Demo
            </span>
          </div>

          <h3
            className={`font-bold text-gray-900 group-hover:text-accent transition-colors leading-snug tracking-tight ${
              isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {category.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-0 mt-2 border-t border-gray-100 pt-3 flex items-center justify-between text-xs font-mono font-semibold text-gray-700 group-hover:text-accent">
        <span>Explore Website Demo</span>
        <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-accent text-gray-700 group-hover:text-white flex items-center justify-center transition-all duration-200">
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </a>
  );
}
