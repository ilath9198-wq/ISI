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
      'contact_linkedin',
      'contact_twitter',
      'contact_instagram',
      'contact_github',
      'footer_tagline',
    ];

    for (const key of allowedKeys) {
      if (key in body && typeof body[key] === 'string') {
        await updateSiteContent(key, body[key]);
      }
    }

    const updated = await getSiteContent();
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
