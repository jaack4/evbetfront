import React from 'react';
import { Zap, Shield, BarChart3, Globe, Lock, Cpu, ArrowUpRight } from 'lucide-react';

export const Features = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Institutional-grade data. <br />
                <span className="text-zinc-500">Democratized.</span>
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                Stop betting with your gut. Our infrastructure processes millions of data points to give you the mathematical edge previously reserved for syndicates.
            </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Speed (Large) */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 hover:bg-zinc-900/50 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Zap className="w-48 h-48 text-white" strokeWidth={1} />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Microsecond Latency</h3>
                    <p className="text-zinc-400 text-lg max-w-md">
                        Direct API connections to 40+ major sportsbooks. We detect line movement before the UI even updates on their sites.
                    </p>
                    
                    <div className="mt-8 flex items-center gap-4">
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                            LATENCY: 12ms
                        </div>
                        <div className="px-3 py-1 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 text-xs font-mono">
                            UPTIME: 99.99%
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2: EV */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 hover:bg-zinc-900/50 transition-colors">
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">True Probability</h3>
                    <p className="text-zinc-400">
                        Our proprietary "sharp consensus" model strips vig to reveal the actual win probability of every event.
                    </p>
                </div>
            </div>

            {/* Card 3: Coverage */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 hover:bg-zinc-900/50 transition-colors">
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Global Coverage</h3>
                    <p className="text-zinc-400">
                        From NBA player props to obscure table tennis leagues. If there's a line, we're tracking it.
                    </p>
                </div>
            </div>

            {/* Card 4: Bankroll (Large) */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 hover:bg-zinc-900/50 transition-colors">
                 <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield className="w-64 h-64 text-white" strokeWidth={0.5} />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Risk Management Engine</h3>
                    <p className="text-zinc-400 text-lg max-w-md">
                        Don't just pick winners. optimize bet sizing. Our integrated Kelly Criterion calculator tells you exactly how much to wager based on your edge and bankroll.
                    </p>
                </div>
            </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
            <a href="#" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <span className="font-medium">View full system specs</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
        </div>

      </div>
    </section>
  );
};
