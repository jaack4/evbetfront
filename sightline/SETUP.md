# Sightline Setup Guide

## Prerequisites

You'll need accounts with:
- [Clerk](https://clerk.com) - Authentication
- [Stripe](https://stripe.com) - Payments
- [Railway](https://railway.app) - PostgreSQL Database

## Step 1: Set up Railway PostgreSQL

1. Create a new PostgreSQL database in Railway
2. Copy the `DATABASE_URL` from Railway dashboard
3. In Railway's database console, run the SQL from `railway-schema.sql`

## Step 2: Set up Clerk

1. Create a new application at [clerk.com](https://clerk.com)
2. Enable Email authentication (or add OAuth providers if desired)
3. Copy your API keys from the dashboard

## Step 3: Set up Stripe

1. Create products in your [Stripe Dashboard](https://dashboard.stripe.com/products):
   - Monthly subscription (e.g., $29/month)
   - Yearly subscription (e.g., $199/year)
2. Copy the Price IDs for each product
3. Update `app/pricing/page.tsx` with your Price IDs:
   ```typescript
   const PRICE_ID_MONTHLY = 'price_YOUR_MONTHLY_PRICE_ID'
   const PRICE_ID_YEARLY = 'price_YOUR_YEARLY_PRICE_ID'
   ```

## Step 4: Configure Stripe Webhooks

### For Local Development:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### For Production:
1. Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
2. Subscribe to these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

## Step 5: Environment Variables

Create a `.env.local` file in the `sightline` directory:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/pricing

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Railway PostgreSQL Database
DATABASE_URL=postgresql://username:password@host:port/database

# Your existing API
API_URL=http://127.0.0.1:8000
API_KEY=your_api_key
```

## Step 6: Run the Application

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## User Flow

1. User visits landing page
2. User clicks "Get Started" → `/pricing`
3. User signs up → Clerk handles authentication
4. User selects a plan → Redirected to Stripe Checkout
5. After payment → Redirected to `/dashboard`
6. Dashboard checks subscription status in Railway database
7. User can manage billing via the "Billing" button in navbar

## Architecture

- **Authentication**: Clerk (email + optional OAuth)
- **Database**: Railway PostgreSQL (subscription data)
- **Payments**: Stripe (checkout + billing portal)
- **Backend API**: Your existing Python API on port 8000

## Troubleshooting

### "Module not found" errors
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Subscription not showing
- Check Railway database has the `subscriptions` table
- Verify `DATABASE_URL` is correct in `.env.local`
- Check Stripe webhook is receiving events (in Stripe Dashboard)

### Authentication issues
- Verify Clerk API keys are correct
- Check Clerk dashboard for any errors
- Ensure middleware is protecting the right routes

