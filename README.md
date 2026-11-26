# ISI — Web Development Portfolio & Client Acquisition Platform

A modern, full-stack digital studio portfolio and client acquisition platform built for **ISI**, showcasing 11 industry-specific website concepts and 2 production client platforms (`Iron Lung` and `Thingo`).

---

## 🌟 Key Features

1. **Editorial Digital Atelier Aesthetic**:
   - Clean, geometric typography hierarchy and high-impact white space.
   - Minimalist neutral palette paired with Electric Studio Blue accent.
   - Real authentic browser mockups using verified screenshots of all 11 demo websites and 2 client platforms.

2. **Compact Hero Project Enquiry Form**:
   - Positioned on the right side of the hero section (stacked on mobile).
   - Minimal underline-style input fields matching the design specifications.
   - Full-width Name, two-column Email & Mobile No, multiline Message.
   - Pill-shaped "Let's Talk Design" CTA button with circular arrow icon.
   - Server-side validation, honeypot anti-spam protection, and direct database storage.

3. **"Find Your Industry. Explore Your Website." (11 Categories in Exact Specified Order)**:
   - **01 — Architecture & Home Interiors** (`https://006home-interiors.vercel.app/`) — FORM & FOUND
   - **02 — Automotive Services & Detailing** (`https://004-automotive-services.vercel.app/`) — AUTOCRAFT
   - **03 — Food & Fine Dining Restaurants** (`https://001food-restaurants.vercel.app/`) — Aurum & Saffron
   - **04 — Retail & Furniture Suppliers** (`https://002retail-stores.vercel.app/`) — SOFA FOR HOME
   - **05 — Manufacturing & B2B Wholesale** (`https://008-manufacturing-wholesale.vercel.app/`) — MERIDIAN
   - **06 — Multidisciplinary Creative Studios** (`https://010-creative-professionals.vercel.app/`) — ATELIER N°10
   - **07 — Beauty Salon & Botanical Skincare** (`https://003-beauty-and-personal-care.vercel.app/`) — ÉLAN Beauté
   - **08 — Luxury Weddings & Celebrations** (`https://005-weddings-and-event.vercel.app/`) — THE GRAND AFFAIR
   - **09 — Luxury Boutique Hotels & Retreats** (`https://009-hospitality.vercel.app/`) — AURELIA
   - **10 — Bespoke Tailoring & Fashion Studios** (`https://011-tailors-clothing.vercel.app/`) — MAISON THREAD
   - **11 — Education, Coaching & Skills** (`https://007-education.vercel.app/`) — EDVANCE
   - Asymmetrical editorial grid with featured emphasis on the top 3 categories and browser window framing.

4. **"Selected Client Projects" (Distinct Section)**:
   - **Client Project 01: Iron Lung** (`https://ironlung.in/`)
   - **Client Project 02: Thingo** (`https://thingo-five.vercel.app/`)
   - Large magazine-style showcase layouts with direct live links.

5. **Full-Featured Secure Admin Panel (`/admin`)**:
   - Secure authentication with encrypted session cookies (`/admin/login`).
   - **Dashboard**: Live statistics for categories, client projects, total enquiries, and new inquiries.
   - **Category Manager**: Add, edit, delete, publish/unpublish, and reorder categories.
   - **Client Projects Manager**: Add, edit, delete, publish/unpublish, and reorder client projects.
   - **Enquiry Manager**: View client submissions, filter by status (New, Contacted, Completed), update status, delete, and reply directly.
   - **Website Content Editor**: Edit hero headline/desc, about text, contact email/phone, and social media links directly without touching code.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: PostgreSQL (Supabase `quslrmacqonpxucolgil` with automatic resilient fallback)
- **Auth**: JOSE (JWT sessions) & Bcrypt
- **Deployment**: Vercel

---

## 🔐 Admin Credentials (Default)

- **Login URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `isi@2026!secure`

*(Can be customized via `.env.local` or environment variables)*

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/ilath9198-wq/ISI.git
cd ISI

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website, or [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin portal.
