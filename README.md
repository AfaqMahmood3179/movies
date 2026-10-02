# HD MOVIES — Automated Public Domain Movie Streaming Platform

A production-ready, legal public domain feature film streaming web application built with **Next.js (App Router)** and **Tailwind CSS**, designed for automated ingestion from the **Internet Archive** and one-click deployment on **Vercel**.

---

## 📽️ Key Features & Legal Architecture

### 1. Legal Content Ingestion & Verification
- **Official Source Only**: Collects feature films directly from the Internet Archive Advanced Search API (`collection:(feature_films) AND mediatype:(movies)`).
- **Strict License Verification**: Evaluates metadata tags (`licenseurl`, `rights`, and `description`). Only accepts items with verified open licensing:
  - Creative Commons Public Domain Mark 1.0 (PDM)
  - Creative Commons Zero 1.0 (CC0)
  - Explicit Public Domain dedications
  - Approved Creative Commons Open Licenses
- **Strict Exclusions**: Excludes anything with missing, ambiguous, or "all rights reserved" licensing.
- **`rights_checked` Enforcement**: Only films with `rights_checked = true` are ever rendered to users.
- **Zero Scraping**: Does not scrape YouTube, Tubi, or any third-party commercial platform.

### 2. Embedded Video Playback
- **Official Player**: Embeds the official Internet Archive player (`https://archive.org/embed/{ia_identifier}`) inside a responsive 16:9 container with full sandbox permissions.
- **Zero Video Re-hosting**: Media is streamed directly from archive.org servers without duplicating video files.
- **Prominent License Note**: Every player includes a dedicated attribution box displaying the verified license name, a link to the source catalog item on archive.org, and a quick link to report rights issues.
- **Theater Mode**: Toggle between normal and cinema view.

### 3. Advertising & Monetization Architecture
- **Reusable `<AdSlot />`**: Reserved height containers eliminate Cumulative Layout Shift (CLS).
- **Placements**:
  - Header Leaderboard (728x90 desktop / 320x50 mobile)
  - Desktop Sidebar (300x250 or 300x600)
  - Below the Player
  - Between Related Film Rows
  - Footer Banner
- **Density Control**: Strictly capped at maximum 4 visible ad slots per viewport.
- **Cookie Consent Gating**: Ad network scripts are prevented from executing until the user grants explicit consent via the `<CookieConsent />` banner.
- **Session-Capped Pre-Roll**: Optional pre-roll video sponsorship before the movie starts, frequency-capped via `sessionStorage` (once per session) with a 5-second skip countdown.
- **No Intrusive Ads**: Zero ads on top of or inside the video player, no popups or popunders, no deceptive buttons, no looping audio.
- **IAB Compliance**: Includes standard `/public/ads.txt`.

### 4. SEO & Structured Data
- **Server Components (SSR/SSG)**: Fast initial render and 100% crawlable pages.
- **JSON-LD Schema**:
  - `Movie` schema on Watch pages (`name`, `description`, `image`, `duration`, `license`, `embedUrl`, `publisher`).
  - `WebSite` schema with `SearchAction` on the Home page.
  - `Organization` schema on the About page.
- **Dynamic Sitemap**: Automatically generated at `/sitemap.xml` covering static pages and all movie routes.
- **Robots Policy**: Automatically generated at `/robots.txt`.

### 5. Automated Daily Sync (Vercel Cron)
- Scheduled via `vercel.json` to run daily at 04:00 UTC (`0 4 * * *`).
- Authenticated via `CRON_SECRET` header verification (`Authorization: Bearer <CRON_SECRET>`).
- Queries the Internet Archive Advanced Search API, filters qualifying public domain films, and upserts them to the database.

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

1. Create a free project at [Supabase](https://supabase.com) (or provision Vercel Postgres / Neon).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run the entire contents of [`schema.sql`](./schema.sql).

This provisions:
- `films` table with indexes on `rights_checked`, `ia_identifier`, `year`, `downloads`, `created_at`, and `genres` (GIN).
- `dmca_requests` table for tracking takedown inquiries.
- Row Level Security (RLS) policies allowing public read access **only** where `rights_checked = true`.

---

## 🚀 Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure the following values:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of your deployment | `https://your-domain.vercel.app` |
| `CRON_SECRET` | Secret key for authorizing Vercel Cron jobs | `openssl rand -hex 32` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | `https://xyzcompany.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public / Anon API Key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Secret Key (admin sync) | `eyJhbGciOi...` |
| `NEXT_PUBLIC_DMCA_EMAIL` | Designated Copyright Agent email address | `dmca@yourdomain.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | (Optional) Google AdSense publisher ID | `ca-pub-0000000000000000` |

> **Note**: Even without database keys configured, the application functions out-of-the-box in local development using built-in, verified seed films (*Night of the Living Dead*, *Charade*, *Metropolis*, *His Girl Friday*, *Nosferatu*, *The General*, etc.).

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Test Ingestion Script**:
   Test the Internet Archive query and license filter directly from your terminal:
   ```bash
   npm run sync
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ☁️ Vercel Deployment Steps

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Push your repository to GitHub or GitLab:
   ```bash
   git add .
   git commit -m "Initial commit of HD MOVIES"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Project Settings** &rarr; **Environment Variables**, add the keys from your `.env.local`:
   - `NEXT_PUBLIC_SITE_URL`
   - `CRON_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_DMCA_EMAIL`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
4. Click **Deploy**. Vercel will automatically build the Next.js project and register the daily cron job specified in `vercel.json`.

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel link
vercel env pull
vercel --prod
```

### Verifying the Cron Job in Vercel
1. In the Vercel dashboard, navigate to your project &rarr; **Cron Jobs**.
2. You will see `/api/cron/sync-films` scheduled for `0 4 * * *`.
3. Click **Run Now** to trigger an on-demand synchronization.

---

## ⚖️ DMCA & 24-Hour Takedown Guarantee

The `/dmca` route provides:
- Designated Copyright Agent information under 17 U.S.C. § 512.
- Direct contact email (`dmca@hdmovies.org`).
- Interactive submission form that issues a formal reference ticket ID and persists the request to the database for administrative review.
- Guaranteed **24-hour turnaround** for verified claims.
