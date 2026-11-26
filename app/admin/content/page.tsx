'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SiteContent } from '@/lib/types';
import { INITIAL_SITE_CONTENT } from '@/lib/seedData';

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
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
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch content error:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (
    key: keyof SiteContent,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSavedSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update content');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-gray-400">
        Loading website content...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Manage Website Content
          </h1>
          <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
            Edit text, headlines, contact details, and social channels without touching code
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono rounded-lg animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Changes Published Live!</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 pb-32">
        {/* 1. Hero Section Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900">Hero Section</h2>
            <p className="text-xs font-mono text-gray-400 uppercase">
              Main statement & introductory text
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
              Hero Headline
            </label>
            <input
              type="text"
              required
              value={content.hero_headline}
              onChange={(e) => handleChange('hero_headline', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
              Hero Description Paragraph
            </label>
            <textarea
              rows={3}
              required
              value={content.hero_description}
              onChange={(e) => handleChange('hero_description', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>

        {/* 2. About Section Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900">About Studio Section</h2>
            <p className="text-xs font-mono text-gray-400 uppercase">
              Philosophy and studio introduction
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
              About Headline
            </label>
            <input
              type="text"
              required
              value={content.about_headline}
              onChange={(e) => handleChange('about_headline', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
              About Description Narrative
            </label>
            <textarea
              rows={3}
              required
              value={content.about_description}
              onChange={(e) => handleChange('about_description', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>

        {/* 3. Direct Contact Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900">Contact & Concierge</h2>
            <p className="text-xs font-mono text-gray-400 uppercase">
              Direct email & phone channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={content.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                required
                value={content.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* 4. Social & Footer Links */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900">Social Channels & Footer</h2>
            <p className="text-xs font-mono text-gray-400 uppercase">
              External social profiles and footer branding
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={content.contact_linkedin}
                onChange={(e) => handleChange('contact_linkedin', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={content.contact_twitter}
                onChange={(e) => handleChange('contact_twitter', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={content.contact_instagram}
                onChange={(e) => handleChange('contact_instagram', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={content.contact_github}
                onChange={(e) => handleChange('contact_github', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold mb-1.5">
              Footer Tagline
            </label>
            <input
              type="text"
              value={content.footer_tagline}
              onChange={(e) => handleChange('footer_tagline', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-6 p-4 bg-white/90 backdrop-blur-md border border-gray-200/90 rounded-2xl shadow-xl flex items-center justify-between">
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
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
