# Buttercup Bebe Showroom Site

Premium wholesale showroom website for Buttercup Bebe, built with Next.js App Router + TypeScript + Tailwind CSS.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` Home (hero, brand showroom, quick view modal, contact section)
- `/market-dates` 2026 market schedule
- `/about` team + showroom background
- `/contact` contact details + inquiry form

## Booking CTA

All booking CTAs use:

`https://calendar.google.com/calendar/u/0/appointments/AcZssZ2yUWzn1OOAwM-UIAjoxhKebGNl9TqgvCjtMjI=?gv=true`

The shared URL constant is in:

- `src/lib/constants.ts`

## Edit Brand Data

Brand records are fully data-driven in:

- `src/data/brands.ts`

Type:

```ts
type Brand = {
  slug: string;
  name: string;
  oneLiner: string;
  websiteUrl?: string;
  lookbookUrl?: string;
  lineSheetUrl?: string;
  images: string[];
  featured?: boolean;
};
```

To add or update a brand:

1. Add or edit the brand object in `src/data/brands.ts`.
2. Keep `slug` URL-safe (kebab-case).
3. Ensure `images` points to existing files in `public/brands/<slug>/`.

## Add/Replace Brand Images

Current placeholders live in:

- `public/brands/<slug>/1.svg`
- `public/brands/<slug>/2.svg`
- `public/brands/<slug>/3.svg`

To replace with real photos:

1. Keep the same folder per slug: `public/brands/<slug>/`.
2. Replace the placeholder files with JPG/PNG/WebP (or keep SVG).
3. Update image paths in `src/data/brands.ts` if filenames change.

## Add Lookbooks / Line Sheets

The quick view action checks `lookbookUrl` first, then falls back to `lineSheetUrl`.

For best consistency, use `lookbookUrl` for every brand:

1. Upload file to `public/line-sheets/<file-name>.pdf`.
2. Add `lookbookUrl: "/line-sheets/<file-name>.pdf"` to that brand in `src/data/brands.ts`.
3. Optional legacy fallback: use `lineSheetUrl` if you still have older links.

The UI automatically shows the lookbook button only when one of those URLs exists.

## Efficient Manual Update Workflow

Use this routine when swapping seasonal assets:

1. Replace images in each brand folder:
   - `public/brands/<slug>/1.jpg`
   - `public/brands/<slug>/2.jpg`
   - `public/brands/<slug>/3.jpg`
2. If filenames changed, update the `images` array in `src/data/brands.ts`.
3. Upload each PDF to `public/line-sheets/`.
4. Set or update each brand `lookbookUrl`.
5. Run `npm run lint && npm run build` to verify.
6. Commit:

```bash
git add public/brands public/line-sheets src/data/brands.ts
git commit -m "Update seasonal brand imagery and lookbook links"
```

## Contact Form Behavior

The contact form is in:

- `src/components/contact-form.tsx`

Default submission is `mailto:` (no backend required).

Optional Formspree integration:

1. Create `.env.local`.
2. Add:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/<your-id>
```

3. Restart dev server.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Framework preset will auto-detect as Next.js.
4. Add env vars (only if using Formspree).
5. Deploy.

## Connect `buttercupbebe.net` Later

1. In Vercel project settings, go to **Domains** and add:
   - `buttercupbebe.net`
   - `www.buttercupbebe.net`
2. In your DNS provider, add/update records exactly as Vercel instructs.
3. Set your preferred primary domain in Vercel (root or `www`).
4. Verify SSL provisioning is complete.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```
