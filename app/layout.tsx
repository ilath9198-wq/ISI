import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ISI — Web Development Portfolio & Agency Website',
  description:
    'We design and develop thoughtful digital experiences for businesses across industries. Explore our 11 industry website concepts and live client platforms.',
  keywords: [
    'ISI',
    'Web Development Studio',
    'Industry Website Demos',
    'Custom Next.js Websites',
    'Bespoke Web Design',
    'Client Acquisition',
    'India Web Agency',
  ],
  authors: [{ name: 'Infinity Smart India' }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'ISI — Web Development Portfolio & Agency Website',
    description:
      'Explore 11 industry-specific demo websites and live client platforms created by ISI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans bg-[#FDFDFE] text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
