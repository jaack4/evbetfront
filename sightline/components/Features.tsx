import React from 'react';
import { Zap, Shield, BarChart3, Globe, ArrowUpRight, TrendingUp, Clock, Target } from 'lucide-react';

export const Features = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Why Sightline?
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            In the age of sharp money, casual bettors lose. Stay ahead with institutional-grade analytics previously reserved for syndicates.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1 */}
          <div className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors">
              <Zap className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">Microsecond Latency</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Direct API connections to 40+ sportsbooks. Detect line movement before the UI even updates.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors">
              <BarChart3 className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">True Probability</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Proprietary sharp consensus model strips vig to reveal actual win probability of every event.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors">
              <Globe className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">Global Coverage</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              From NBA player props to obscure leagues. If there's a line, we're tracking it.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors">
              <Shield className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">Risk Management</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Kelly Criterion calculator tells you exactly how much to wager based on your edge and bankroll.
            </p>
          </div>

          {/* Card 5 */}
          <div className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors">
              <TrendingUp className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">+EV Detection</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Automated scanning identifies positive expected value opportunities in real-time.
            </p>
          </div>

          {/* Card 6 */}
          <div className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors">
              <Target className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-2">Arbitrage Finder</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Identify guaranteed profit opportunities across books with instant alerts.
            </p>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-16 border-t border-white/[0.06]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">40+</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Sportsbooks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">12ms</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Avg Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">99.99%</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Monitoring</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
