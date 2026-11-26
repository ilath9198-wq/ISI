'use client';

import React from 'react';
import {
  Mail,
  Phone,
  ArrowUpRight,
  MessageSquare,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Facebook,
  Youtube,
  Dribbble,
  Globe,
} from 'lucide-react';
import { SiteContent } from '@/lib/types';

interface Props {
  content?: SiteContent;
}

export default function ContactSection({ content }: Props) {
  const email = content?.contact_email || 'hello@isidigital.studio';
  const phone = content?.contact_phone || '+91 98765 43210';
  const secondaryPhone = content?.contact_secondary_phone;

  const socialLinks = [
    { name: 'Instagram', url: content?.contact_instagram?.trim(), icon: Instagram },
    { name: 'LinkedIn', url: content?.contact_linkedin?.trim(), icon: Linkedin },
    { name: 'Facebook', url: content?.contact_facebook?.trim(), icon: Facebook },
    { name: 'YouTube', url: content?.contact_youtube?.trim(), icon: Youtube },
    { name: 'Dribbble', url: content?.contact_dribbble?.trim(), icon: Dribbble },
    { name: 'Twitter', url: content?.contact_twitter?.trim(), icon: Twitter },
    { name: 'GitHub', url: content?.contact_github?.trim(), icon: Github },
  ].filter((s) => Boolean(s.url));

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0C0F17] text-white relative overflow-hidden">
      {/* Subtle Ambient Depth Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-400 text-[11px] font-mono uppercase tracking-widest font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>LET’S CONNECT</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Have Something in Mind?
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-normal max-w-xl">
              Let&apos;s discuss your ideas and build a digital presence that works for your business.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#project-enquiry"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Right Direct Channels (Span 5) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-sm space-y-6">
            <div>
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
                DIRECT INQUIRY
              </span>
              <a
                href={`mailto:${email}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="truncate">{email}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
                TELEPHONE / WHATSAPP
              </span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>{phone}</span>
              </a>
              {secondaryPhone && (
                <a
                  href={`tel:${secondaryPhone.replace(/\s+/g, '')}`}
                  className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2 mt-2"
                >
                  <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{secondaryPhone}</span>
                </a>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block mb-3">
                  SOCIAL & REPOSITORIES
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-all hover:scale-110"
                        aria-label={s.name}
                        title={s.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
