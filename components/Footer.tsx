'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  ArrowUp,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Dribbble,
  Twitter,
  Github,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';
import { SiteContent } from '@/lib/types';

interface FooterProps {
  content?: SiteContent;
}

// Custom crisp SVG for Behance
function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8h5.5a2.5 2.5 0 0 1 0 5H3V8Z" />
      <path d="M3 13h6a2.5 2.5 0 0 1 0 5H3v-5Z" />
      <path d="M14 13h7a3.5 3.5 0 1 0-7 0v1a3.5 3.5 0 0 0 7 0" />
      <path d="M15 9h5" />
    </svg>
  );
}

// Custom crisp SVG for Pinterest
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="9" x2="12" y2="21" />
      <path d="M8 12a4 4 0 1 1 8 0c0 3-2 5.5-5 5.5-1.5 0-2.5-.8-2.5-.8" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function Footer({ content }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build the list of active social links conditionally (only non-empty URLs)
  const socialItems = [
    {
      name: 'Instagram',
      url: content?.contact_instagram?.trim(),
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: content?.contact_linkedin?.trim(),
      icon: Linkedin,
    },
    {
      name: 'Facebook',
      url: content?.contact_facebook?.trim(),
      icon: Facebook,
    },
    {
      name: 'YouTube',
      url: content?.contact_youtube?.trim(),
      icon: Youtube,
    },
    {
      name: 'Pinterest',
      url: content?.contact_pinterest?.trim(),
      icon: PinterestIcon,
    },
    {
      name: 'Behance',
      url: content?.contact_behance?.trim(),
      icon: BehanceIcon,
    },
    {
      name: 'Dribbble',
      url: content?.contact_dribbble?.trim(),
      icon: Dribbble,
    },
    {
      name: 'Twitter',
      url: content?.contact_twitter?.trim(),
      icon: Twitter,
    },
    {
      name: 'GitHub',
      url: content?.contact_github?.trim(),
      icon: Github,
    },
  ].filter((item) => Boolean(item.url));

  // Safely parse custom socials whether it's an array or a JSON string
  let parsedCustomSocials: Array<{ name: string; url: string }> = [];
  if (Array.isArray(content?.custom_socials)) {
    parsedCustomSocials = content.custom_socials;
  } else if (typeof content?.custom_socials === 'string') {
    try {
      const parsed = JSON.parse(content.custom_socials);
      if (Array.isArray(parsed)) {
        parsedCustomSocials = parsed;
      }
    } catch {
      parsedCustomSocials = [];
    }
  }

  const customItems = parsedCustomSocials
    .filter((c) => Boolean(c?.url?.trim()))
    .map((c) => ({
      name: c.name,
      url: c.url.trim(),
      icon: Globe,
    }));

  const allSocials = [...socialItems, ...customItems];

  const email = content?.contact_email?.trim();
  const phone = content?.contact_phone?.trim();
  const secondaryPhone = content?.contact_secondary_phone?.trim();
  const tagline = content?.footer_tagline?.trim() || 'Web Development Portfolio & Client Acquisition';
  const rawCopyright = content?.footer_copyright?.trim() || 'ISI Studio. All rights reserved.';
  const displayCopyright = rawCopyright.startsWith('©')
    ? rawCopyright
    : `© ${new Date().getFullYear()} ${rawCopyright}`;
  const contactText = content?.footer_contact_text?.trim();

  return (
    <footer className="bg-[#080A10] text-gray-400 text-xs py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Brand & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Infinity Smart India Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <Link href="/" title="Infinity Smart India" className="shrink-0">
              <Image
                src="/images/logo-white.png"
                alt="Infinity Smart India"
                width={150}
                height={30}
                className="h-6 sm:h-7 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-gray-400 text-xs tracking-wider uppercase">
              {tagline}
            </span>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
            <a href="/#industries" className="hover:text-white transition-colors">
              Website Demos
            </a>
            <a href="/#client-work" className="hover:text-white transition-colors">
              Client Projects
            </a>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <a href="/#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-[11px] uppercase transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Middle Row: Contact Information & Conditional Social Media Icons */}
        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact Details Channels */}
          <div className="flex flex-wrap items-center gap-6 text-[12px] font-mono text-gray-300">
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>{email}</span>
              </a>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{phone}</span>
              </a>
            )}

            {secondaryPhone && (
              <a
                href={`tel:${secondaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{secondaryPhone}</span>
              </a>
            )}

            {contactText && (
              <span className="text-[11px] text-gray-500 font-normal">
                {contactText}
              </span>
            )}
          </div>

          {/* CONDITIONAL SOCIAL ICONS (Dynamic: Only rendered when URL exists) */}
          {allSocials.length > 0 && (
            <div className="flex items-center gap-2.5 flex-wrap">
              {allSocials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                    aria-label={`Visit our ${s.name} profile`}
                    title={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Row: Copyright & Admin Portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <p>{displayCopyright}</p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-accent transition-colors"
              title="Secure Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
