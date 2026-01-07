import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { upsertSubscription, updateSubscriptionByStripeId } from '@/lib/subscription'
import { clerkClient } from '@clerk/nextjs/server'
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

        const subscriptionData = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        const clerkUserId = session.metadata?.clerk_user_id
        if (!clerkUserId) {
          console.error('No clerk_user_id in session metadata')
          break
        }

        console.log('Attempting to upsert subscription for user:', clerkUserId)

        try {
          // Fetch user details from Clerk
          let userName: string | null = null
          let userEmail: string | null = null
          
          try {
            const client = await clerkClient()
            const user = await client.users.getUser(clerkUserId)
            userName = user.firstName && user.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user.firstName || user.lastName || null
            userEmail = user.primaryEmailAddress?.emailAddress || null
          } catch (clerkError) {
            console.error('Error fetching user from Clerk:', clerkError)
            // Continue with subscription creation even if user fetch fails
          }

          // Type assertion to access subscription properties
          const sub = subscriptionData as any
          
          // Safely convert timestamps
          const currentPeriodStart = sub.current_period_start 
            ? new Date(sub.current_period_start * 1000).toISOString()
            : new Date().toISOString()
          
          const currentPeriodEnd = sub.current_period_end
            ? new Date(sub.current_period_end * 1000).toISOString()
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now as fallback

          await upsertSubscription({
            clerk_user_id: clerkUserId,
            user_name: userName,
            user_email: userEmail,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: sub.id,
            stripe_price_id: sub.items.data[0].price.id,
            status: sub.status,
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
            cancel_at_period_end: sub.cancel_at_period_end || false,
          })
          console.log(`Subscription created for user ${clerkUserId} (${userName}, ${userEmail})`)
        } catch (dbError) {
          console.error('Database error upserting subscription:', dbError)
          throw dbError
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as any

        const currentPeriodStart = sub.current_period_start 
          ? new Date(sub.current_period_start * 1000).toISOString()
          : undefined
        
        const currentPeriodEnd = sub.current_period_end
          ? new Date(sub.current_period_end * 1000).toISOString()
          : undefined

        await updateSubscriptionByStripeId(sub.id, {
          status: sub.status,
          stripe_price_id: sub.items.data[0].price.id,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
          cancel_at_period_end: sub.cancel_at_period_end,
        })

        console.log(`Subscription ${sub.id} updated to ${sub.status}`)
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
  } catch (error: any) {
    console.error('Error handling webhook:', error)
    console.error('Error stack:', error.stack)
    console.error('Error message:', error.message)
    console.error('Event type:', event.type)
    
    // Return detailed error for debugging
    return NextResponse.json({ 
      error: 'Webhook handler failed',
      details: error.message,
      type: event.type
    }, { status: 500 })
  }
}
