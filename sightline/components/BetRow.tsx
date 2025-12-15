import React from 'react';
import { Clock, Calculator, Plus, TrendingUp } from 'lucide-react';
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
  true_prob: number;
  std_dev?: number;
  implied_means?: Record<string, number>;
}

export const BetRow = ({ bet }: { bet: Bet }) => {
  const date = new Date(bet.commence_time);
  const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatMarket = (market: string) => {
    return market.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const isPositive = bet.ev_percent > 0;
  const evColor = isPositive ? 'text-emerald-400' : 'text-zinc-400';

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center text-sm group">
      
      {/* 1. Percent & Calculator */}
      <div className="col-span-1 flex flex-col items-center gap-2">
        <button className="text-zinc-500 hover:text-white transition-colors">
            <Calculator className="w-4 h-4" />
        </button>
        <span className={clsx("font-bold text-base", evColor)}>
          {bet.ev_percent.toFixed(2)}%
        </span>
        <button className="text-zinc-500 hover:text-emerald-400 transition-colors">
            <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Event Info */}
      <div className="col-span-3 flex flex-col gap-1">
        <div className="text-zinc-400 text-xs flex items-center gap-1">
            <span>{formattedDate} at {formattedTime}</span>
        </div>
        <div className="font-bold text-white text-base">
            {bet.player}
        </div>
        <div className="text-zinc-400 text-xs">
            {bet.away_team} vs {bet.home_team}
            <span className="mx-2 text-zinc-600">|</span>
            {bet.sport_title}
        </div>
      </div>

      {/* 3. Market */}
      <div className="col-span-2 text-indigo-300 font-medium">
        {formatMarket(bet.market)}
      </div>

      {/* 4. Stats (Std Dev / Implied Means) - User requested */}
      <div className="col-span-3 flex flex-col gap-2">
         {bet.std_dev && (
             <div className="flex justify-between items-center bg-zinc-900/50 px-2 py-1 rounded text-xs border border-white/5">
                 <span className="text-zinc-500">Std Dev</span>
                 <span className="text-zinc-300 font-mono">{bet.std_dev.toFixed(2)}</span>
             </div>
         )}
         {bet.implied_means && Object.keys(bet.implied_means).length > 0 && (
             <div className="flex flex-col gap-1">
                 {Object.entries(bet.implied_means).slice(0, 2).map(([book, mean]) => (
                     <div key={book} className="flex justify-between items-center text-xs">
                         <span className="text-zinc-500">{book} Mean</span>
                         <span className="text-zinc-300 font-mono">{mean.toFixed(1)}</span>
                     </div>
                 ))}
             </div>
         )}
         {!bet.std_dev && !bet.implied_means && (
             <div className="text-zinc-600 text-xs italic">No Model Data</div>
         )}
      </div>

      {/* 5. Bet & Book */}
      <div className="col-span-2 flex flex-col gap-2">
          <div className="flex items-center justify-between bg-zinc-800/50 p-2 rounded border border-white/5">
              <span className="text-white font-medium">
                {bet.outcome} {bet.betting_line}
              </span>
              <span className="text-xs font-bold text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/10 uppercase">
                  {bet.bookmaker}
              </span>
          </div>
          {/* Compare against true prob or sharp book if we had it here */}
          <div className="flex items-center justify-between px-2 text-xs">
              <span className="text-zinc-500">Win Prob</span>
              <span className="text-emerald-400 font-mono">{(bet.true_prob * 100).toFixed(1)}%</span>
          </div>
      </div>

      {/* 6. Action */}
      <div className="col-span-1 flex justify-end">
          <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/50 px-3 py-2 rounded font-bold text-xs flex items-center gap-1 transition-all">
              BET <TrendingUp className="w-3 h-3" />
          </button>
      </div>

    </div>
  );
};


