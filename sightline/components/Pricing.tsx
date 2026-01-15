import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

export const Pricing = async () => {
  const { userId } = await auth();
  return (
    <section className="py-24 bg-black relative overflow-hidden" id="pricing">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Pricing
          </h2>
          <p className="text-base text-zinc-400 max-w-lg mx-auto">
            Unlock full access to our real-time algorithmic feed, risk management tools, and historical data.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          
          {/* Monthly Plan */}
          <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Monthly</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white tracking-tight">$15</span>
                <span className="text-zinc-500 text-sm">/month</span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 mb-6">
              Unrestricted platform access.
            </p>

            <a 
              href={userId ? "/pricing" : "/sign-up"} 
              className="w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white text-sm font-medium flex items-center justify-center gap-2 transition-all"
            >
              Start free trial
            </a>
          </div>

          {/* Annual Plan */}
          <div className="relative p-6 rounded-2xl border border-white/[0.15] bg-white/[0.04]">
            {/* Best value badge */}
            <div className="absolute -top-3 left-6">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium uppercase tracking-wider">
                Best value
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Annual <span className="text-emerald-400">(-20%)</span></h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white tracking-tight">$144</span>
                <span className="text-zinc-500 text-sm">/year</span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 mb-6">
              Save $36 with annual billing.
            </p>

            <a 
              href={userId ? "/pricing" : "/sign-up"} 
              className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              Start free trial
            </a>
          </div>

        </div>

        {/* Features List */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Real-time +EV Algorithm Feed",
              "Arbitrage Opportunity Alerts",
              "Kelly Criterion Bankroll Mgmt",
              "Historical Data & Backtesting",
              "Discord Community Access",
              "Priority Support"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-400">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-emerald-500" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Notes */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-zinc-600">
          <span>Cancel anytime</span>
          <span className="hidden sm:block">-</span>
          <span>7-day money back guarantee</span>
          <span className="hidden sm:block">-</span>
          <span>Secure payment via Stripe</span>
        </div>

      </div>
    </section>
  );
};
