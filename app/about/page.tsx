import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code2, Layers, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'About | ISI — Bespoke Web Development Studio',
  description:
    'Learn about ISI, our philosophy, design engineering standards, and how we craft industry-specific digital experiences.',
};

export default async function AboutPage() {
  const content = await getSiteContent();

  const headline = content.about_headline || 'Thoughtful Websites. Built Around Your Business.';
  const description =
    content.about_description ||
    'At ISI, we believe every business deserves a digital presence that reflects its identity. We create modern, functional and visually engaging websites designed to help businesses present themselves professionally online.';

  const pillars = [
    {
      icon: Layers,
      num: '01',
      title: 'Industry-Specific Identity',
      desc: 'We do not recycle templates. Each website is designed from first principles to resonate with the specific aesthetic, tone, and audience of your industry.',
    },
    {
      icon: Code2,
      num: '02',
      title: 'Modern High-Performance Code',
      desc: 'Engineered with clean React, Next.js, and modern CSS for lightning-fast speeds, responsive elegance, and seamless usability across all mobile and desktop devices.',
    },
    {
      icon: ShieldCheck,
      num: '03',
      title: 'Full Technical Independence',
      desc: 'Clean source repositories, transparent deployments, and custom database backends that empower you to own and manage your platform with total confidence.',
    },
  ];

  const standards = [
    {
      title: 'First-Principles Design',
      points: [
        'Bespoke visual identity for each client',
        'Balanced editorial typography & layout',
        'Thoughtful white space & micro-interactions',
        'Zero generic template constraints',
      ],
    },
    {
      title: 'High-Performance Engineering',
      points: [
        'Built on Next.js, React & Tailwind CSS',
        'Sub-second page transitions & fast TTFB',
        'Mobile-first responsive architecture',
        'Clean, scalable component hierarchies',
      ],
    },
    {
      title: 'Transparent Client Partnership',
      points: [
        'Direct collaborative development workflow',
        'Complete repository & code ownership',
        'Integrated dynamic admin capabilities',
        'Long-term maintainability & clarity',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Dedicated Page Hero */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#0A0D14] text-white border-b border-gray-800/80 overflow-hidden">
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 text-[11px] font-mono uppercase tracking-widest font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>ABOUT ISI DIGITAL STUDIO</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              {headline}
            </h1>

            <p className="text-base sm:text-xl text-slate-300/90 leading-relaxed max-w-3xl font-normal">
              {description}
            </p>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-3">
                OUR CORE PILLARS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight">
                How We Approach Every Digital Project
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="p-8 bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-accent mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-mono text-gray-400">
                      <span>{pillar.num}</span>
                      <span className="w-4 h-px bg-gray-200" />
                      <span>FOUNDATIONAL PILLAR</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Studio Engineering & Design Standards */}
        <section className="py-20 sm:py-28 bg-white border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-3">
                OUR CRAFT STANDARDS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight">
                Quality Built Into Every Layer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {standards.map((std, i) => (
                <div
                  key={i}
                  className="p-7 bg-[#FBFBFC] rounded-2xl border border-gray-200/80 flex flex-col"
                >
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-5">
                    {std.title}
                  </h3>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600 font-normal">
                    {std.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Callout */}
        <section className="py-20 bg-[#080A10] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Ready to Bring Your Vision Online?
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8 font-normal">
              Whether you need an industry-specific demonstration or a bespoke web platform tailored
              to your requirements, we are ready to build it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#project-enquiry"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-accent hover:bg-blue-600 text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-accent/40"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#industries"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200"
              >
                <span>Explore Website Demos</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer content={content} />
    </div>
  );
}
