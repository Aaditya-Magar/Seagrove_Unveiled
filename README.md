# SEAGROVE Resort & Spa — Portfolio Website

> This repository is a portfolio project built to showcase modern
> responsive design, animation, and frontend engineering skills.
> SEAGROVE is a fictional luxury beach resort concept and is not a live business.

## Overview

SEAGROVE is a fully designed marketing site for a luxury resort + spa.
It highlights a premium visual system, rich motion design, and a smooth
user experience across desktop and mobile.

This project is intended for portfolio presentation, client demos, and
demonstrating expertise in frontend architecture and deployment readiness.

## Key Features

- Elegant resort website structure with multiple landing pages and route-based navigation
- Responsive, mobile-first layout with polished spacing and typography
- Animated interactions using **Framer Motion**
- Content modeling centralized in `src/lib/data.ts`
- Smooth client-side routing and route metadata
- Vercel-ready static deployment with SPA rewrite support

## Tech Stack

- **React 19**
- **Vite 7**
- **Tailwind CSS v4**
- **Framer Motion**
- **TanStack Start** routing and app tooling
- **Lucide** icons
- **shadcn/ui** primitives

## Project Structure

- `src/routes/` — page routes for home, rooms, dining, spa, gallery, about, booking, contact
- `src/components/` — reusable UI primitives and layout components
- `src/lib/data.ts` — centralized content data for rooms, experiences, and menus
- `src/styles.css` — global styling and semantic token definitions
- `vercel.json` — Vercel deployment configuration
- `logo.svg` — project logo asset for branding and repository use

## Local Development

Install dependencies and run the development server:

```bash
bun install
bun run dev
```

Open `http://localhost:5173` in your browser.

## Build

Create a production build:

```bash
bun run build
```

If you prefer npm:

```bash
npm install
npm run build
```
