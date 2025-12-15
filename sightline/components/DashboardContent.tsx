'use client';

import React, { useState } from 'react';
import { Bet } from './BetRow';
import { BetRow } from './BetRow';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

interface DashboardContentProps {
  initialBets: Bet[];
}

export const DashboardContent = ({ initialBets }: DashboardContentProps) => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBets = initialBets.filter(bet => {
    // Filter by bookmaker
    if (selectedBook) {
      const normalizedBook = bet.bookmaker.toLowerCase().replace(/\s+/g, '');
      const normalizedSelected = selectedBook.toLowerCase();
      if (!normalizedBook.includes(normalizedSelected)) {
        return false;
      }
    }

    // Filter by sport
    if (selectedSport) {
        const normalizedSport = bet.sport_title.toLowerCase();
        const normalizedSelected = selectedSport.toLowerCase();
        // Check for partial matches like "NBA" in "NBA Preseason"
        if (!normalizedSport.includes(normalizedSelected)) {
            return false;
        }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const match = 
        bet.player.toLowerCase().includes(query) ||
        bet.home_team.toLowerCase().includes(query) ||
        bet.away_team.toLowerCase().includes(query) ||
        bet.sport_title.toLowerCase().includes(query) ||
        bet.market.toLowerCase().includes(query);
      if (!match) return false;
    }

    return true;
  });

  const toggleBook = (book: string) => {
    if (selectedBook === book) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book);
    }
  };

  const toggleSport = (sport: string) => {
    if (selectedSport === sport) {
        setSelectedSport(null);
    } else {
        setSelectedSport(sport);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
             <span className="text-zinc-400 text-sm font-medium mr-2">Book:</span>
             {/* Bookmaker Filters */}
             <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleBook('underdog')}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border",
                    selectedBook === 'underdog' 
                      ? "bg-zinc-800 border-yellow-500/50 text-white shadow-[0_0_10px_-4px_rgba(234,179,8,0.5)]" 
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-white/10"
                  )}
                >
                  <div className="w-4 h-4 relative">
                    <Image src="/logos/underdog.png" alt="Underdog" fill className="object-contain" />
                  </div>
                  Underdog
                </button>
                <button 
                  onClick={() => toggleBook('prizepicks')}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border",
                    selectedBook === 'prizepicks' 
                      ? "bg-zinc-800 border-purple-500/50 text-white shadow-[0_0_10px_-4px_rgba(168,85,247,0.5)]" 
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-white/10"
                  )}
                >
                  <div className="w-4 h-4 relative">
                    <Image src="/logos/prizepicks.png" alt="PrizePicks" fill className="object-contain" />
                  </div>
                  PrizePicks
                </button>
             </div>

             <div className="w-px h-6 bg-white/10 mx-2" />

             <span className="text-zinc-400 text-sm font-medium mr-2">League:</span>
             <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleSport('nba')}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border",
                    selectedSport === 'nba' 
                      ? "bg-zinc-800 border-blue-500/50 text-white shadow-[0_0_10px_-4px_rgba(59,130,246,0.5)]" 
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-white/10"
                  )}
                >
                  <div className="w-4 h-4 relative">
                    <Image src="/logos/nba.png" alt="NBA" fill className="object-contain" />
                  </div>
                  NBA
                </button>
                <button 
                  onClick={() => toggleSport('nfl')}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border",
                    selectedSport === 'nfl' 
                      ? "bg-zinc-800 border-red-500/50 text-white shadow-[0_0_10px_-4px_rgba(239,68,68,0.5)]" 
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-white/10"
                  )}
                >
                  <div className="w-4 h-4 relative">
                    <Image src="/logos/nfl.png" alt="NFL" fill className="object-contain" />
                  </div>
                  NFL
                </button>
             </div>
        </div>

        <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-zinc-900 border border-white/10 rounded pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 w-64 placeholder:text-zinc-600"
                />
            </div>
        </div>
      </div>

      <div className="mb-2 px-1 flex items-center justify-between">
          <span className="text-zinc-400 font-medium text-xs">
            <span className="text-zinc-200 font-bold">{filteredBets.length}</span> active bets
          </span>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
          
          {/* Table Header */}
          <div className="grid grid-cols-[0.7fr_3fr_2fr_1.75fr_1.75fr_2.8fr] gap-4 px-4 py-3 bg-zinc-900/50 border-b border-white/5 text-xs font-semibold text-zinc-200">
              <div className="text-center">EV</div>
              <div className="">Event</div>
              <div className="">Market</div>
              <div className="">Bet</div>
              <div className="">Implied Means</div>
              <div className="">Model Data</div>
          </div>

          {/* Rows */}
          {filteredBets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-zinc-200">No bets found</h3>
                  <p className="text-zinc-500 max-w-md">
                      Try adjusting your filters or search query.
                  </p>
              </div>
          ) : (
              <div className="divide-y divide-white/5">
                  {filteredBets.map((bet) => (
                      <BetRow key={bet.id} bet={bet} />
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};

