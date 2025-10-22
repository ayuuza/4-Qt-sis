# Bhai Dooj Card Maker — Demo clone

This repository contains a Next.js + Tailwind starter that reproduces the Bhai Dooj card maker UI and behavior.

## Features
- Photo upload and preview
- Editable title & message
- Three templates (light, dark, plain)
- Render to high-res canvas (1200×1600) and download PNG
- Share preview (opens image in new tab)

## How to run locally
1. Install node (>=16), then:
```bash
npm install
npm run dev
```
2. Open http://localhost:3000

## Deploy to Vercel / GitHub
- Push this folder to a GitHub repo.
- Connect to Vercel and deploy the repo (Vercel auto-detects Next.js).

## Notes / Next steps
- To provide permanent shareable links, add a server-side API to accept the image blob and store it (S3, Supabase Storage, Firebase).
- Fonts, stickers and exact visual parity can be tuned by adding assets to `/public` and adjusting tailwind styles.

