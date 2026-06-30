# AUREX - immersive luxury audio experience

Phase 2 upgrades the original cinematic AUREX launch page into a multi-route luxury audio platform with storefront, configurator, checkout architecture, dashboards, API routes, and deployment guidance.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Three.js + React Three Fiber
- GSAP + Framer Motion
- Prisma + PostgreSQL
- Auth.js
- Stripe Checkout + webhooks
- Redis via Upstash

## Included in Phase 2

- Existing 3D launch homepage preserved and extended
- `/shop`, `/configure`, `/cart`, `/checkout`, `/wishlist`, `/compare`, `/ar`, `/track`
- `/dashboard` for customers and `/admin` for operators
- Prisma schema for users, carts, orders, coupons, saved builds, reviews, tickets, and memberships
- Auth.js foundation with Prisma adapter
- Stripe Checkout session route and Stripe webhook handler
- AI advisor and AI sound profile routes
- Advanced configurator state model with live materials, engraving, exploded view, render quality, and add-ons
- AR launch surface with WebXR compatibility gate and fallback messaging
- Invoice HTML route for printable order invoices

## Project structure

```text
app/
  api/
  admin/
  ar/
  cart/
  checkout/
  compare/
  configure/
  dashboard/
  shop/
  track/
  wishlist/
components/
  ar/
  commerce/
  configurator/
  dashboard/
  providers/
  sections/
  three/
  ui/
lib/
  services/
prisma/
store/
types/
```

## Environment setup

Copy `.env.example` to `.env.local` and fill in:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Local development

1. Install dependencies:

```powershell
npm install
```

2. Generate Prisma client and run migrations:

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

3. Start the app:

```powershell
npm run dev
```

## Stripe setup

The checkout route creates a Stripe Checkout Session on the server. The webhook route expects `checkout.session.completed` events and writes payment logs plus order data.

Recommended webhook endpoint:

```text
https://your-domain.com/api/webhooks/stripe
```

For local testing:

```powershell
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Auth setup

This project uses Auth.js with the Prisma adapter and GitHub OAuth. Add the GitHub app credentials to `.env.local`, then protect dashboard/admin routes with middleware and role checks.

## Database and hosting

### Vercel + Supabase

- Use Supabase Postgres for `DATABASE_URL`
- Deploy the Next.js app to Vercel
- Add all environment variables in the Vercel dashboard
- Run Prisma migrations during CI or a release step

### Cloudflare

- Front the site with Cloudflare CDN and caching
- Cache static media and optimized model assets aggressively
- Keep webhook routes uncached

## Performance checklist

- Convert `Headphones.obj` to glTF/GLB for production AR and mobile scenes
- Add Draco or Meshopt compression for mobile delivery
- Lazy load non-critical dashboards and admin modules
- Prefer dynamic imports for large Three.js features
- Add real image assets through `next/image`
- Audit with Lighthouse for SEO and accessibility

## Notes

- The source asset is still `public/models/Headphones.obj`. For production AR, convert it into an optimized glTF pipeline.
- This environment did not have `npm`, `pnpm`, or `yarn` available, so dependency installation and runtime validation were not executed here.
