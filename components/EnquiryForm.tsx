'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    _hp: '', // Honeypot anti-spam
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneClean = formData.mobile.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 7) {
      setStatus('error');
      setErrorMessage('Please enter a valid mobile number (at least 7 digits).');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus('error');
      setErrorMessage('Please write a brief note about your project.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setStatus('success');
      setSuccessMessage(data.message || 'Thank you! We will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: '',
        _hp: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      id="project-enquiry"
      className="w-full max-w-lg bg-white/[0.95] backdrop-blur-2xl rounded-2xl p-7 sm:p-9 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/60 relative overflow-hidden transition-all duration-300 ring-1 ring-black/5"
    >
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-blue-500 to-indigo-600" />

      {/* Form Heading */}
      <div className="mb-7">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Have a Project in Mind?
        </h3>
        <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
          Let’s discuss your vision & requirements
        </p>
      </div>

      {status === 'success' ? (
        <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">Enquiry Received!</h4>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            {successMessage}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-mono font-medium rounded-full transition-colors"
          >
            Send Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from legitimate users) */}
          <input
            type="text"
            name="_hp"
            value={formData._hp}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* 1. Name* — Full-width */}
          <div className="relative group">
            <label htmlFor="hero-name" className="minimal-label block mb-0.5">
              Name*
            </label>
            <input
              id="hero-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ananya Sharma"
              className="minimal-input text-gray-900 placeholder:text-gray-300"
            />
          </div>

          {/* 2 & 3. Email* & Mobile No* — Two-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative group">
              <label htmlFor="hero-email" className="minimal-label block mb-0.5">
                Email*
              </label>
              <input
                id="hero-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="minimal-input text-gray-900 placeholder:text-gray-300"
              />
            </div>

            <div className="relative group">
              <label htmlFor="hero-mobile" className="minimal-label block mb-0.5">
                Mobile No*
              </label>
              <input
                id="hero-mobile"
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="minimal-input text-gray-900 placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* 4. Message* — Full-width multiline field */}
          <div className="relative group">
            <label htmlFor="hero-message" className="minimal-label block mb-0.5">
              Message*
            </label>
            <textarea
              id="hero-message"
              name="message"
              rows={3}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your brand, goals & desired timeline..."
              className="minimal-input resize-none text-gray-900 placeholder:text-gray-300"
            />
          </div>

          {/* Error notice */}
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* CTA Button: "Let's Talk Design" with circular arrow element on the right */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group w-full inline-flex items-center justify-between px-7 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-mono font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(0,82,255,0.35)] hover:shadow-[0_6px_25px_rgba(0,82,255,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{status === 'submitting' ? 'Submitting...' : "Let's Talk Design"}</span>
              <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-accent flex items-center justify-center transition-colors">
                {status === 'submitting' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </span>
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 font-mono">
            Direct NDA & Fast Response Guaranteed • No Spam Ever
          </p>
        </form>
      )}
    </div>
  );
}
