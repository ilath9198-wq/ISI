import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import IndustryCategories from '@/components/IndustryCategories';
import ClientProjects from '@/components/ClientProjects';
import About from '@/components/About';
import Process from '@/components/Process';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getPublishedCategories, getPublishedProjects, getSiteContent } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [categories, projects, content] = await Promise.all([
    getPublishedCategories(),
    getPublishedProjects(),
    getSiteContent(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          headline={content.hero_headline}
          description={content.hero_description}
        />
        <IndustryCategories categories={categories} />
        <ClientProjects projects={projects} />
        <About
          headline={content.about_headline}
          description={content.about_description}
        />
        <Process />
        <ContactSection content={content} />
      </main>
      <Footer />
    </div>
  );
}
