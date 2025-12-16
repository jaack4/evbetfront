import Stripe from 'stripe'
import { query } from './database'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

// Helper to get or create Stripe customer
export async function getOrCreateStripeCustomer(
  clerkUserId: string,
  email: string
): Promise<string> {
  // Check if customer exists in database
  const result = await query(
    'SELECT stripe_customer_id FROM subscriptions WHERE clerk_user_id = $1',
    [clerkUserId]
  )

  if (result.rows[0]?.stripe_customer_id) {
    return result.rows[0].stripe_customer_id
  }

  // Create new customer in Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: {
      clerk_user_id: clerkUserId,
    },
  })

  return customer.id
}
