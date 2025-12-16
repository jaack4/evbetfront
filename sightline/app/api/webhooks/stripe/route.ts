import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { upsertSubscription, updateSubscriptionByStripeId } from '@/lib/subscription'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode !== 'subscription' || !session.subscription) {
          console.log('Session is not a subscription, skipping')
          break
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        const clerkUserId = session.metadata?.clerk_user_id
        if (!clerkUserId) {
          console.error('No clerk_user_id in session metadata')
          break
        }

        // Access subscription data - cast to any to handle Stripe type variations
        const subData = subscription as unknown as {
          id: string
          status: string
          current_period_start: number
          current_period_end: number
          cancel_at_period_end: boolean
          items: { data: Array<{ price: { id: string } }> }
        }

        console.log('Attempting to upsert subscription for user:', clerkUserId)

        try {
          await upsertSubscription({
            clerk_user_id: clerkUserId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subData.id,
            stripe_price_id: subData.items.data[0].price.id,
            status: subData.status,
            current_period_start: new Date(subData.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subData.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subData.cancel_at_period_end,
          })
          console.log(`Subscription created for user ${clerkUserId}`)
        } catch (dbError) {
          console.error('Database error upserting subscription:', dbError)
          throw dbError
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as unknown as {
          id: string
          status: string
          current_period_start: number
          current_period_end: number
          cancel_at_period_end: boolean
          items: { data: Array<{ price: { id: string } }> }
        }

        await updateSubscriptionByStripeId(subscription.id, {
          status: subscription.status,
          stripe_price_id: subscription.items.data[0].price.id,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        })

        console.log(`Subscription ${subscription.id} updated to ${subscription.status}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as { id: string }

        await updateSubscriptionByStripeId(subscription.id, {
          status: 'canceled',
          cancel_at_period_end: false,
        })

        console.log(`Subscription ${subscription.id} canceled`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as { subscription?: string | null }
        const subscriptionId = invoice.subscription
        
        if (subscriptionId) {
          await updateSubscriptionByStripeId(subscriptionId, {
            status: 'past_due',
          })
          console.log(`Payment failed for subscription ${subscriptionId}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
