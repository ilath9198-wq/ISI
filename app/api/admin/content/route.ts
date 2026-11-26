import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getSiteContent, updateSiteContent } from '@/lib/db';
import { SiteContent } from '@/lib/types';

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json({ content });
}

export async function PUT(req: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const allowedKeys: (keyof SiteContent)[] = [
      'hero_headline',
      'hero_description',
      'about_headline',
      'about_description',
      'contact_email',
      'contact_phone',
      'contact_secondary_phone',
      'contact_linkedin',
      'contact_twitter',
      'contact_instagram',
      'contact_github',
      'contact_facebook',
      'contact_youtube',
      'contact_pinterest',
      'contact_behance',
      'contact_dribbble',
      'footer_tagline',
      'footer_copyright',
      'footer_contact_text',
      'custom_socials',
    ];

    for (const key of allowedKeys) {
      if (key in body) {
        const val = typeof body[key] === 'object' ? JSON.stringify(body[key]) : String(body[key]);
        await updateSiteContent(key, val);
      }
    }

    const updated = await getSiteContent();
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
