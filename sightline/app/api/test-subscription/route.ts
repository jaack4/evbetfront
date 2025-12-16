import { NextResponse } from 'next/server'
import { upsertSubscription } from '@/lib/subscription'

export async function POST(req: Request) {
  try {
    const { clerk_user_id } = await req.json()

    if (!clerk_user_id) {
      return NextResponse.json({ error: 'clerk_user_id required' }, { status: 400 })
    }

    // Try to insert a test subscription
    await upsertSubscription({
      clerk_user_id: clerk_user_id,
      stripe_customer_id: 'cus_test_manual',
      stripe_subscription_id: 'sub_test_manual',
      stripe_price_id: 'price_test',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancel_at_period_end: false,
    })

    return NextResponse.json({ 
      success: true,
      message: 'Test subscription created',
      clerk_user_id
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}

