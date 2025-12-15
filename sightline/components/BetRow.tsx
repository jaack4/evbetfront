import React from 'react';
import Image from 'next/image';
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
  sharp_mean?: number;
  sample_size?: number;
}

const getBookmakerLogo = (bookmaker: string) => {
  const normalized = bookmaker.toLowerCase().replace(/\s+/g, '');
  if (normalized.includes('draftkings')) return '/logos/draftkings.png';
  if (normalized.includes('fanduel')) return '/logos/fanduel.png';
  if (normalized.includes('prizepicks')) return '/logos/prizepicks.png';
  if (normalized.includes('underdog')) return '/logos/underdog.png';
  return null;
};

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
      <div className="col-span-2 flex flex-col gap-1">
        <div className="text-zinc-400 text-xs flex items-center gap-1">
            <span>{formattedDate} at {formattedTime}</span>
        </div>
        <div className="font-bold text-white text-base truncate" title={bet.player}>
            {bet.player}
        </div>
        <div className="text-zinc-400 text-xs truncate">
            {bet.away_team} vs {bet.home_team}
            <span className="mx-2 text-zinc-600">|</span>
            {bet.sport_title}
        </div>
      </div>

      {/* 3. Market */}
      <div className="col-span-2 text-indigo-300 font-medium break-words">
        {formatMarket(bet.market)}
      </div>

      {/* 4. Bet & Book */}
      <div className="col-span-2 flex flex-col gap-2">
          <div className="flex items-center justify-between bg-zinc-800/50 p-2 rounded border border-white/5">
              <span className="text-white font-medium whitespace-nowrap">
                {bet.outcome} {bet.betting_line}
              </span>
              <div className="bg-zinc-900 px-2 py-1 rounded border border-white/10 h-7 flex items-center justify-center min-w-[60px]">
                  {getBookmakerLogo(bet.bookmaker) ? (
                    <Image 
                      src={getBookmakerLogo(bet.bookmaker)!} 
                      alt={bet.bookmaker} 
                      width={60} 
                      height={20} 
                      className="object-contain max-h-4 w-auto" 
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-400 uppercase truncate max-w-[50px]">
                      {bet.bookmaker}
                    </span>
                  )}
              </div>
          </div>
          <div className="flex items-center justify-between px-2 text-xs">
              <span className="text-zinc-500">Win Prob</span>
              <span className="text-emerald-400 font-mono">{(bet.true_prob * 100).toFixed(1)}%</span>
          </div>
      </div>

      {/* 5. Implied Means */}
      <div className="col-span-2 flex flex-col gap-1">
         {bet.implied_means && Object.keys(bet.implied_means).length > 0 ? (
             Object.entries(bet.implied_means).map(([book, mean]) => (
                 <div key={book} className="flex justify-between items-center bg-zinc-900/30 px-2 py-1 rounded border border-white/5">
                      {getBookmakerLogo(book) ? (
                        <Image 
                          src={getBookmakerLogo(book)!} 
                          alt={book} 
                          width={60} 
                          height={20} 
                          className="object-contain max-h-3 w-auto opacity-80" 
                        />
                      ) : (
                        <span className="text-[10px] text-zinc-500 uppercase truncate max-w-[50px]">{book}</span>
                      )}
                     <span className="text-zinc-300 font-mono text-xs">{mean.toFixed(1)}</span>
                 </div>
             ))
         ) : (
             <span className="text-zinc-600 text-xs italic text-center">-</span>
         )}
      </div>

      {/* 6. Model Data */}
      <div className="col-span-3 flex flex-row gap-2">
         <div className="flex-1 flex flex-col bg-zinc-900/50 p-2 rounded border border-white/5 items-center justify-center">
             <span className="text-[10px] text-zinc-500 uppercase whitespace-nowrap mb-1">Sharp Mean</span>
             <span className="text-zinc-200 font-mono text-sm">
                 {bet.sharp_mean !== undefined ? bet.sharp_mean.toFixed(1) : '-'}
             </span>
         </div>
         <div className="flex-1 flex flex-col bg-zinc-900/50 p-2 rounded border border-white/5 items-center justify-center">
             <span className="text-[10px] text-zinc-500 uppercase whitespace-nowrap mb-1">Std Dev</span>
             <span className="text-zinc-200 font-mono text-sm">
                 {bet.std_dev !== undefined ? bet.std_dev.toFixed(2) : '-'}
             </span>
         </div>
         <div className="flex-1 flex flex-col bg-zinc-900/50 p-2 rounded border border-white/5 items-center justify-center">
             <span className="text-[10px] text-zinc-500 uppercase whitespace-nowrap mb-1">Count</span>
             <span className="text-zinc-200 font-mono text-sm">
                 {bet.sample_size !== undefined ? bet.sample_size : '-'}
             </span>
         </div>
      </div>

    </div>
  );
};
