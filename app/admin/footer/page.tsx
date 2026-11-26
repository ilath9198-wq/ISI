'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Dribbble,
  Globe,
  Mail,
  Phone,
  Layers,
} from 'lucide-react';
import { SiteContent } from '@/lib/types';
import { INITIAL_SITE_CONTENT } from '@/lib/seedData';

export default function AdminFooterSettingsPage() {
  const [content, setContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [customSocials, setCustomSocials] = useState<{ name: string; url: string }[]>([]);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.content) {
          setContent(data.content);
          if (Array.isArray(data.content.custom_socials)) {
            setCustomSocials(data.content.custom_socials);
          } else if (typeof data.content.custom_socials === 'string') {
            try {
              setCustomSocials(JSON.parse(data.content.custom_socials));
            } catch {
              setCustomSocials([]);
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch footer settings error:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: keyof SiteContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSavedSuccess(false);
  };

  const handleAddCustomSocial = () => {
    if (!newPlatformName.trim() || !newPlatformUrl.trim()) return;
    const updated = [...customSocials, { name: newPlatformName.trim(), url: newPlatformUrl.trim() }];
    setCustomSocials(updated);
    setNewPlatformName('');
    setNewPlatformUrl('');
    setSavedSuccess(false);
  };

  const handleRemoveCustomSocial = (index: number) => {
    const updated = customSocials.filter((_, i) => i !== index);
    setCustomSocials(updated);
    setSavedSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    try {
      const payload = {
        ...content,
        custom_socials: JSON.stringify(customSocials),
      };

      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update footer settings');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving footer settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-gray-400">
        Loading Footer Settings...
      </div>
    );
  }

  // Predefined social channels
  const socialChannels = [
    { key: 'contact_instagram' as const, label: 'Instagram URL', icon: Instagram, placeholder: 'https://instagram.com/isidigital' },
    { key: 'contact_linkedin' as const, label: 'LinkedIn URL', icon: Linkedin, placeholder: 'https://linkedin.com/company/isi' },
    { key: 'contact_facebook' as const, label: 'Facebook URL', icon: Facebook, placeholder: 'https://facebook.com/isistudio' },
    { key: 'contact_youtube' as const, label: 'YouTube URL', icon: Youtube, placeholder: 'https://youtube.com/@isistudio' },
    { key: 'contact_pinterest' as const, label: 'Pinterest URL', icon: Globe, placeholder: 'https://pinterest.com/isistudio' },
    { key: 'contact_behance' as const, label: 'Behance URL', icon: Globe, placeholder: 'https://behance.net/isistudio' },
    { key: 'contact_dribbble' as const, label: 'Dribbble URL', icon: Dribbble, placeholder: 'https://dribbble.com/isistudio' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-accent text-[11px] font-mono uppercase tracking-widest font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>GLOBAL FOOTER CONFIGURATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Footer Settings
          </h1>
          <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
            Manage contact channels, conditional social icons, and legal footer copy dynamically
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono rounded-lg animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Footer Published Live!</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Information Banner */}
      <div className="p-4 bg-blue-50/70 border border-blue-200/60 rounded-2xl flex items-start gap-3 text-xs text-blue-900 leading-relaxed font-sans">
        <Layers className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Conditional Icon Display Active:</strong> Social media icons are rendered on the live website ONLY when their corresponding URL is provided. Empty fields will not leave blank spaces or placeholders. Changes update in real-time.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-32">
        {/* A. Contact Information */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-accent" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">A. Contact Information</h2>
              <p className="text-xs font-mono text-gray-400 uppercase">
                Direct phone & email channels shown in the footer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Business Email Address*
              </label>
              <input
                type="email"
                required
                value={content.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                placeholder="hello@isidigital.studio"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Primary Mobile Number*
              </label>
              <input
                type="text"
                required
                value={content.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Optional Secondary Contact Number
              </label>
              <input
                type="text"
                value={content.contact_secondary_phone || ''}
                onChange={(e) => handleChange('contact_secondary_phone', e.target.value)}
                placeholder="+91 91234 56789 (Optional)"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
              <span className="text-[11px] text-gray-400 font-mono mt-1 block">
                Leave empty if only one contact number should be displayed.
              </span>
            </div>
          </div>
        </div>

        {/* B & C. Social Media Links (Conditional) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-accent" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">B & C. Social Media Profiles</h2>
                <p className="text-xs font-mono text-gray-400 uppercase">
                  Icons appear dynamically based on filled URLs. Empty fields remain hidden.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {socialChannels.map((channel) => {
              const Icon = channel.icon;
              const val = (content[channel.key] as string) || '';
              const isActive = Boolean(val.trim());

              return (
                <div key={channel.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      <span>{channel.label}</span>
                    </label>
                    {isActive ? (
                      <span className="text-[10px] font-mono uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase text-gray-400">
                        Hidden
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    value={val}
                    onChange={(e) => handleChange(channel.key, e.target.value)}
                    placeholder={channel.placeholder}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans focus:outline-none focus:border-accent border transition-colors ${
                      isActive ? 'bg-white border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Add Additional Custom Social Channels */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                Additional Custom Social Platforms
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                Extend with any new platform in the future
              </span>
            </div>

            {/* List of Custom Added Socials */}
            {customSocials.length > 0 && (
              <div className="space-y-2">
                {customSocials.map((cs, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{cs.name}:</span>
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent truncate max-w-xs hover:underline"
                      >
                        {cs.url}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomSocial(idx)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove custom link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input to Add New Custom Social */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Platform Name (e.g. Threads, TikTok)"
                value={newPlatformName}
                onChange={(e) => setNewPlatformName(e.target.value)}
                className="sm:w-1/3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
              <input
                type="url"
                placeholder="Profile URL (https://...)"
                value={newPlatformUrl}
                onChange={(e) => setNewPlatformUrl(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={handleAddCustomSocial}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-accent text-white text-xs font-mono font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Platform</span>
              </button>
            </div>
          </div>
        </div>

        {/* D. Footer Text */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-accent" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">D. Footer Text & Copyright</h2>
              <p className="text-xs font-mono text-gray-400 uppercase">
                Tagline, copyright legal notice, and optional contact note
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Business Description or Short Footer Tagline
              </label>
              <input
                type="text"
                value={content.footer_tagline}
                onChange={(e) => handleChange('footer_tagline', e.target.value)}
                placeholder="Web Development Portfolio & Client Acquisition"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Copyright Text
              </label>
              <input
                type="text"
                value={content.footer_copyright || ''}
                onChange={(e) => handleChange('footer_copyright', e.target.value)}
                placeholder="ISI Studio. All rights reserved."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
              <span className="text-[11px] text-gray-400 font-mono mt-1 block">
                The current year is automatically prepended (e.g. &ldquo;© 2026 ISI Studio. All rights reserved.&rdquo;).
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Optional Footer Contact Note
              </label>
              <input
                type="text"
                value={content.footer_contact_text || ''}
                onChange={(e) => handleChange('footer_contact_text', e.target.value)}
                placeholder="Available for bespoke projects & technical consultations worldwide."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Floating Save & Publish Bar */}
        <div className="sticky bottom-6 p-4 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl shadow-xl flex items-center justify-between">
          <span className="text-xs font-mono text-gray-500">
            Unsaved changes will not be visible on the live site.
          </span>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-sm hover:shadow disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Footer Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}