import React from 'react';
import { BetCard, Bet } from './BetCard';
import { Activity, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

interface FeatureSpotlightProps {
  topBet: Bet | null;
}

export const FeatureSpotlight = ({ topBet }: FeatureSpotlightProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-24 z-10 relative px-4">
      
      {/* Main Dashboard Panel */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden relative shadow-2xl shadow-black/50 mb-16">
        {/* Top Bar (Fake UI) */}
        <div className="h-12 border-b border-white/5 flex items-center px-6 bg-white/[0.02]">
            <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <span className="text-s font-mono text-zinc-200">Current Top Bet</span>
            </div>
        </div>

        <div className="p-4 md:p-10 flex items-center justify-center bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] relative min-h-[250px]">
            
            <div className="w-full transform transition-all duration-500 hover:scale-[1.01] relative z-10">
                {topBet ? (
                    <BetCard bet={topBet} />
                ) : (
                    <div className="h-64 w-full rounded-xl border border-white/10 bg-black/50 flex flex-col items-center justify-center text-zinc-500 gap-4">
                        <RefreshCw className="w-8 h-8 animate-spin opacity-50" />
                        <p className="font-mono text-sm">Scanning markets...</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Algorithmic dominance.
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Our engines process thousands of lines per second to find inefficiencies before the books adjust.
        </p>
      </div>

      {/* Features below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { title: "Instant Execution", desc: "Direct links to betslips.", icon: Zap },
            { title: "Bankroll Management", desc: "Kelly Criterion integration.", icon: ShieldCheck },
            { title: "Market Monitoring", desc: "Real-time odds updates.", icon: Activity }
         ].map((feature, i) => (
             <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                <div className="p-2 rounded-lg bg-white/5 text-zinc-400 group-hover:text-white transition-colors">
                    <feature.icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm">{feature.desc}</p>
                </div>
             </div>
         ))}
      </div>

    </div>
  );
};
