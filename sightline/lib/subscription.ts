import { query } from './database'

export interface Subscription {
  id: string
  clerk_user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  stripe_price_id: string | null
  status: string
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export async function hasActiveSubscription(clerkUserId: string): Promise<boolean> {
  const result = await query(
    `SELECT 1 FROM subscriptions 
     WHERE clerk_user_id = $1 
     AND status = 'active' 
     AND current_period_end > NOW() 
     LIMIT 1`,
    [clerkUserId]
  )
  
  return result.rows.length > 0
}

export async function getSubscription(clerkUserId: string): Promise<Subscription | null> {
  const result = await query(
    'SELECT * FROM subscriptions WHERE clerk_user_id = $1',
    [clerkUserId]
  )
  
  return result.rows[0] || null
}

export async function upsertSubscription(data: Partial<Subscription> & { clerk_user_id: string }) {
  const {
    clerk_user_id,
    stripe_customer_id,
    stripe_subscription_id,
    stripe_price_id,
    status,
    current_period_start,
    current_period_end,
    cancel_at_period_end
  } = data

  await query(
    `INSERT INTO subscriptions (
      clerk_user_id, stripe_customer_id, stripe_subscription_id, 
      stripe_price_id, status, current_period_start, 
      current_period_end, cancel_at_period_end
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (clerk_user_id) 
    DO UPDATE SET
      stripe_customer_id = EXCLUDED.stripe_customer_id,
      stripe_subscription_id = EXCLUDED.stripe_subscription_id,
      stripe_price_id = EXCLUDED.stripe_price_id,
      status = EXCLUDED.status,
      current_period_start = EXCLUDED.current_period_start,
      current_period_end = EXCLUDED.current_period_end,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      updated_at = NOW()`,
    [
      clerk_user_id,
      stripe_customer_id,
      stripe_subscription_id,
      stripe_price_id,
      status,
      current_period_start,
      current_period_end,
      cancel_at_period_end
    ]
  )
}

export async function updateSubscriptionByStripeId(
  stripeSubscriptionId: string, 
  data: Partial<Subscription>
) {
  const updates: string[] = []
  const values: any[] = []
  let paramCount = 1

  // Build dynamic UPDATE SET clause
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id' && key !== 'clerk_user_id') {
      updates.push(`${key} = $${paramCount}`)
      values.push(value)
      paramCount++
    }
  })

  if (updates.length === 0) {
    return // Nothing to update
  }

  updates.push('updated_at = NOW()')
  values.push(stripeSubscriptionId)

  await query(
    `UPDATE subscriptions SET ${updates.join(', ')} 
     WHERE stripe_subscription_id = $${paramCount}`,
    values
  )
}
