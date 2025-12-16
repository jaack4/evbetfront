'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Check, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

// TODO: Replace these with your actual Stripe Price IDs from your Stripe dashboard
const PRICE_ID_MONTHLY = 'price_1SesX0A6erfgyCsCQ2zjjpXf'
const PRICE_ID_YEARLY = 'price_1SesYQA6erfgyCsCZQc3Hfpt'

function PricingContent() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isSignedIn } = useAuth()
  const subscriptionRequired = searchParams.get('subscription_required')
  const canceled = searchParams.get('canceled')

  const handleSubscribe = async (priceId: string) => {
    if (!isSignedIn) {
      router.push('/sign-up')
      return
    }

    setLoading(priceId)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()
      
      if (data.error) {
        console.error('Error:', data.error)
        setLoading(null)
        return
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
      setLoading(null)
    }
  }

  const features = [
    "Real-time +EV Algorithm Feed",
    "Arbitrage Opportunity Alerts",
    "Kelly Criterion Bankroll Management",
    "Historical Data & Backtesting",
    "Discord Community Access",
    "Priority Support"
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Sightline</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Alert Messages */}
        {subscriptionRequired && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-amber-400 text-center font-medium">
              A subscription is required to access the dashboard
            </p>
          </div>
        )}

        {canceled && (
          <div className="mb-8 p-4 bg-zinc-500/10 border border-zinc-500/20 rounded-xl">
            <p className="text-zinc-400 text-center">
              Checkout was canceled. Feel free to try again when you're ready.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get full access to our real-time algorithmic feed for less than the cost of a single bad bet.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Monthly Plan */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Monthly</h3>
                <p className="text-zinc-400 text-sm">Perfect for trying out</p>
              </div>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold tracking-tight">$29</span>
                <span className="text-zinc-500">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(PRICE_ID_MONTHLY)}
                disabled={loading !== null}
                className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading === PRICE_ID_MONTHLY ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
            <div className="relative bg-zinc-900 border-2 border-emerald-500/50 rounded-2xl p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  Save 40%
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Yearly</h3>
                <p className="text-zinc-400 text-sm">Best value for serious bettors</p>
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold tracking-tight">$199</span>
                <span className="text-zinc-500">/year</span>
              </div>
              <p className="text-emerald-400 text-sm mb-8">That's just $16.58/month</p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(PRICE_ID_YEARLY)}
                disabled={loading !== null}
                className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)]"
              >
                {loading === PRICE_ID_YEARLY ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-zinc-500 text-sm">
            Secure payment via Stripe. Cancel anytime. 7-day money back guarantee.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <PricingContent />
    </Suspense>
  )
}
