-- Sightline Subscription Schema for Railway PostgreSQL
-- Run this SQL in your Railway PostgreSQL database to set up the subscription system

-- Subscriptions table
-- Stores Stripe subscription data linked to Clerk user IDs
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  user_name TEXT,
  user_email TEXT,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_clerk_user_id ON subscriptions(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(clerk_id TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM subscriptions
    WHERE clerk_user_id = clerk_id
    AND status = 'active'
    AND current_period_end > NOW()
  );
$$ LANGUAGE sql;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at column
DROP TRIGGER IF EXISTS subscriptions_updated_at ON subscriptions;
CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Note: All database operations happen server-side with the DATABASE_URL connection
-- No need for row-level security since we control access via Clerk authentication

