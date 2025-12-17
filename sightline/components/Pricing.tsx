import React from 'react';
import { Check } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

export const Pricing = async () => {
  const { userId } = await auth();
  return (
    <section className="py-32 bg-black relative overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left: Copy */}
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                    One plan.<br />
                    <span className="text-zinc-500">Unlimited upside.</span>
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                    We don't believe in tiered access to math. Get full access to our real-time algorithmic feed, risk management tools, and historical data for less than the cost of a single bad bet.
                </p>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-zinc-300">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                            <Check className="w-3 h-3" />
                        </div>
                        <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300">
                         <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                            <Check className="w-3 h-3" />
                        </div>
                        <span>7-day money back guarantee</span>
                    </div>
                </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                
                <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Pro Access</h3>
                            <p className="text-zinc-400 text-sm">For serious bettors</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-xs font-medium">
                            EARLY BIRD
                        </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-bold text-white tracking-tight">$15</span>
                        <span className="text-zinc-500 font-medium">/month</span>
                    </div>

                    <ul className="space-y-4 mb-10">
                        {[
                            "Real-time +EV Algorithm Feed",
                            "Arbitrage Opportunity Alerts",
                            "Kelly Criterion Bankroll Management",
                            "Historical Data & Backtesting",
                            "Discord Community Access",
                            "Priority Support"
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-zinc-300 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <a href={userId ? "/pricing" : "/sign-up"} className="w-full bg-white text-black hover:bg-zinc-200 transition-all h-12 rounded-xl font-semibold text-sm flex items-center justify-center shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
                        Start Free Trial
                    </a>
                    <p className="text-center text-xs text-zinc-500 mt-4">
                        Secure payment via Stripe. Encrypted.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
