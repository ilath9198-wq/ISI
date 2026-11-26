import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, message, _hp } = body;

    // Spam honeypot
    if (_hp) {
      return NextResponse.json({ success: true, message: 'Enquiry received.' });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid full name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Phone validation (at least 7 digits)
    const phoneClean = mobile ? String(mobile).replace(/\D/g, '') : '';
    if (!phoneClean || phoneClean.length < 7 || phoneClean.length > 15) {
      return NextResponse.json(
        { error: 'Please enter a valid contact phone number.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please enter a brief project message (at least 5 characters).' },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project enquiry has been received. We will reach out within 24 hours.',
      enquiryId: enquiry.id,
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
