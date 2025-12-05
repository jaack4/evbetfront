import React from 'react';
import { TrendingUp, ArrowRight, Activity, BarChart3, Percent } from 'lucide-react';
import { clsx } from 'clsx';

export interface Bet {
  id: number;
  bookmaker: string;
  market: string;
  player: string;
  outcome: 'Over' | 'Under';
  betting_line: number;
  ev_percent: number;
  sport_title: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  sharp_mean: number;
  true_prob: number;
}

export const BetCard = ({ bet }: { bet: Bet }) => {
  const date = new Date(bet.commence_time);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative group h-full">
      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      <div className="relative bg-zinc-900 border border-white/10 rounded-xl p-4 md:p-5 h-full flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-xl">
        
        {/* Section 1: Player & Matchup (Left) */}
        <div className="flex items-center gap-4 md:w-[30%]">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-white/5 shrink-0 text-lg">
            {bet.player.charAt(0)}
          </div>
          <div className="overflow-hidden min-w-0">
            <h3 className="text-white font-semibold text-lg truncate">{bet.player}</h3>
            <p className="text-zinc-400 text-sm font-medium truncate">
              {bet.away_team} @ {bet.home_team}
            </p>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mt-1">
                <Activity className="w-3 h-3" />
                <span>{bet.sport_title} • {formattedTime}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Market, Line, & Stats (Middle) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:flex-1">
          <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
            <p className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider font-semibold">Market</p>
            <p className="text-zinc-200 font-medium text-sm truncate">{bet.market}</p>
          </div>
          <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
             <p className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider font-semibold">Line</p>
            <div className="flex items-baseline gap-1.5">
               <span className={clsx(
                 "text-sm font-bold",
                 bet.outcome === 'Over' ? "text-emerald-400" : "text-red-400"
               )}>{bet.outcome}</span>
               <span className="text-white font-bold text-md">{bet.betting_line}</span>
            </div>
          </div>
          <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
            <p className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider font-semibold flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> Sharp Mean
            </p>
            <p className="text-zinc-200 font-medium text-sm">{bet.sharp_mean}</p>
          </div>
          <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
            <p className="text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Percent className="w-3 h-3" /> True Prob
            </p>
            <p className="text-zinc-200 font-medium text-sm">{(bet.true_prob * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Section 3: EV & Action (Right) */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 md:w-auto shrink-0 min-w-[120px]">
          <div className="flex flex-col items-end">
             <span className="px-2 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">
              {bet.bookmaker}
            </span>
            <div className="flex items-center text-emerald-400 gap-1 text-sm font-bold">
              <TrendingUp className="w-3 h-3" />
              +{bet.ev_percent}% EV
            </div>
          </div>
          
          <button className="bg-white text-black hover:bg-zinc-200 transition-colors px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1 w-full md:w-auto justify-center">
              Bet <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
