'use client';

import React from 'react';
import Image from 'next/image';
import { TrendingUp, ArrowRight, Activity, Target, Percent, DollarSign, Clock } from 'lucide-react';
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
  sharp_mean?: number;
  true_prob: number;
  std_dev?: number;
  implied_means?: Record<string, number>;
}

const getBookmakerLogo = (bookmaker: string) => {
  const normalized = bookmaker.toLowerCase().replace(/\s+/g, '');
  if (normalized.includes('draftkings')) return '/logos/draftkings.png';
  if (normalized.includes('fanduel')) return '/logos/fanduel.png';
  if (normalized.includes('prizepicks')) return '/logos/prizepicks.png';
  if (normalized.includes('underdog')) return '/logos/underdog.png';
  return null;
};

export const BetCard = ({ bet }: { bet: Bet }) => {
  // Append 'Z' to treat as UTC if no timezone is present
  const dateString = bet.commence_time.endsWith('Z') ? bet.commence_time : `${bet.commence_time}Z`;
  const date = new Date(dateString);
  
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const formatMarket = (market: string) => {
    return market.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="w-full h-full bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-stretch group hover:border-white/10 transition-all">
      
      {/* Main Content Area (Left) */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
          
          {/* Top Row: Player | Game | Market | Time */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm border-b border-white/5 pb-4">
             {/* Player */}
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {bet.player.charAt(0)}
                </div>
                <span className="font-bold text-white text-base">{bet.player}</span>
             </div>
             
             <div className="hidden md:block w-px h-4 bg-white/10" />

             {/* Game */}
             <div className="text-zinc-400 font-medium truncate">
                {bet.away_team} @ {bet.home_team}
             </div>

             <div className="hidden md:block w-px h-4 bg-white/10" />

             {/* Market */}
             <div className="text-zinc-300 font-medium truncate">
                {formatMarket(bet.market)}
             </div>

             <div className="hidden md:block w-px h-4 bg-white/10" />

             {/* Time */}
             <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs ml-auto md:ml-0">
                <Clock className="w-3 h-3" />
                <span suppressHydrationWarning>{formattedTime}</span>
             </div>
          </div>

          {/* Bottom Row: Data Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
            {/* Market (Redundant but requested to keep "market, line, etc") -> Maybe we use this for Sport? Or just keep Market as simplified? Let's keep Market for now or swap for Sport if Market is up top. Actually user said "inner box with market,line...". I'll keep it but maybe simplified. */}
            <div className="bg-zinc-900/80 p-3 flex flex-col justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-1">Sport</span>
                <span className="text-zinc-300 text-xs font-medium truncate">{bet.sport_title}</span>
            </div>

            {/* Line */}
            <div className="bg-zinc-900/80 p-3 flex flex-col justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-1">Line</span>
                <div className="flex items-baseline gap-1.5">
                    <span className={clsx(
                    "text-xs font-bold",
                    bet.outcome === 'Over' ? "text-emerald-400" : "text-red-400"
                    )}>{bet.outcome}</span>
                    <span className="text-white font-mono text-sm">{bet.betting_line}</span>
                </div>
            </div>

            {/* Sharp Mean */}
            <div className="bg-zinc-900/80 p-3 flex flex-col justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-1 flex items-center gap-1">
                    Sharp
                </span>
                <span className="text-white font-mono text-sm">{bet.sharp_mean}</span>
            </div>

            {/* True Prob */}
            <div className="bg-zinc-900/80 p-3 flex flex-col justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-1 flex items-center gap-1">
                    Win %
                </span>
                <span className="text-emerald-400 font-mono text-sm">{(bet.true_prob * 100).toFixed(1)}%</span>
            </div>
        </div>
      </div>

      {/* Right Column: Action & Value */}
      <div className="flex md:flex-col items-center md:items-end justify-between gap-4 md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
         
         <div className="flex flex-col items-start md:items-end">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mb-0.5">Edge</span>
            <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span className="font-mono text-lg font-bold tracking-tight">+{bet.ev_percent.toFixed(1)}%</span>
            </div>
         </div>

         <div className="flex flex-col items-end gap-2 mt-auto">
             <div className="px-2 py-1 rounded bg-white/5 border border-white/10 h-7 flex items-center justify-center min-w-[80px]">
                {getBookmakerLogo(bet.bookmaker) ? (
                  <Image 
                    src={getBookmakerLogo(bet.bookmaker)!} 
                    alt={bet.bookmaker} 
                    width={80} 
                    height={24} 
                    className="object-contain max-h-4 w-auto" 
                  />
                ) : (
                  <span className="text-[10px] text-zinc-400 font-medium uppercase">
                    {bet.bookmaker}
                  </span>
                )}
             </div>
             <button className="bg-white text-black hover:bg-zinc-200 transition-colors h-8 px-4 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
                Bet Now <ArrowRight className="w-3 h-3" />
             </button>
         </div>

      </div>
    </div>
  );
};
