export interface IndustryCategory {
  id: string;
  category_number: string;
  name: string;
  subtitle: string;
  live_url: string;
  preview_image: string;
  display_order: number;
  is_published: boolean;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ClientProject {
  id: string;
  name: string;
  description: string;
  live_url: string;
  preview_image: string;
  display_order: number;
  is_published: boolean;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface EnquirySubmission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  status: 'New' | 'Contacted' | 'Completed';
  created_at: string;
  updated_at?: string;
}

export interface SiteContent {
  hero_headline: string;
  hero_description: string;
  about_headline: string;
  about_description: string;
  contact_email: string;
  contact_phone: string;
  contact_linkedin: string;
  contact_twitter: string;
  contact_instagram: string;
  contact_github: string;
  footer_tagline: string;
}
