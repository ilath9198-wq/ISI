import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFDFE] text-ink">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="font-mono text-5xl font-black text-accent block">
          404
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed font-normal">
          The requested route does not exist or has been moved within the ISI portfolio.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white hover:bg-accent rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
