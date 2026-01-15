import React from 'react';
import { BetRow, Bet } from './BetRow';
import { Activity, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

interface FeatureSpotlightProps {
  topBet: Bet | null;
}

export const FeatureSpotlight = ({ topBet }: FeatureSpotlightProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-0 z-10 relative px-4">
      
      {/* Main Dashboard Panel */}
      <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl overflow-hidden relative shadow-2xl shadow-black/50 mb-12">
        {/* Top Bar (Fake UI) */}
        <div className="h-11 border-b border-white/[0.06] flex items-center px-5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>
            <div className="h-4 w-[1px] bg-white/[0.08]" />
            <span className="text-sm font-mono text-zinc-400">Current Top Bet</span>
          </div>
        </div>

        <div className="p-5 md:p-6 bg-grid relative min-h-[160px]">
          
          <div className="w-full transform transition-all duration-500 hover:scale-[1.005] relative z-10">
            {topBet ? (
              <div className="bg-black/40 rounded-xl border border-white/[0.08] overflow-hidden backdrop-blur-sm">
                {/* Header Row */}
                <div className="grid grid-cols-[0.7fr_3fr_2fr_1.75fr_1.75fr_2.8fr] gap-4 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] text-xs font-medium text-zinc-500 tracking-wider uppercase">
                  <div className="text-center">EV%</div>
                  <div>Event</div>
                  <div>Market</div>
                  <div>Bet</div>
                  <div>Implied Means</div>
                  <div>Model Data</div>
                </div>
                <BetRow bet={topBet} />
              </div>
            ) : (
              <div className="h-48 w-full rounded-xl border border-white/[0.08] bg-black/50 flex flex-col items-center justify-center text-zinc-600 gap-3">
                <RefreshCw className="w-6 h-6 animate-spin opacity-50" />
                <p className="font-mono text-xs">Scanning markets...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: "Instant Execution", desc: "Direct links to betslips.", icon: Zap },
          { title: "Bankroll Management", desc: "Kelly Criterion integration.", icon: ShieldCheck },
          { title: "Market Monitoring", desc: "Real-time odds updates.", icon: Activity }
        ].map((feature, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
            <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-500 group-hover:text-zinc-300 transition-colors">
              <feature.icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium text-white text-sm mb-0.5">{feature.title}</h3>
              <p className="text-zinc-500 text-xs">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
