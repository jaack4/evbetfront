import React from 'react';
import Image from 'next/image';
import { TrendingUp, ArrowRight, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BetProps {
    player: string;
    team: string;
    opponent: string;
    market: string;
    line: number;
    outcome: 'Over' | 'Under';
    ev: number;
    bookmaker: string;
    sport: string;
    gameTime: string;
}

const getBookmakerLogo = (bookmaker: string) => {
    const normalized = bookmaker.toLowerCase().replace(/\s+/g, '');
    if (normalized.includes('draftkings')) return '/logos/draftkings.png';
    if (normalized.includes('pick6')) return '/logos/pick6.png';
    if (normalized.includes('fanduel')) return '/logos/fanduel.png';
    if (normalized.includes('prizepicks')) return '/logos/prizepicks.png';
    if (normalized.includes('underdog')) return '/logos/underdog.png';
    if (normalized.includes('betr')) return '/logos/betr.png';
    return null;
};

export const TopBetCard = () => {
    const topBet: BetProps = {
        player: "Patrick Mahomes",
        team: "KC",
        opponent: "LV",
        market: "Passing Yards",
        line: 265.5,
        outcome: "Over",
        ev: 12.4,
        bookmaker: "PrizePicks",
        sport: "NFL",
        gameTime: "Tonight, 8:20 PM"
    };

    return (
        <div className="relative group">
            {/* Glow effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-white/5">
                            {topBet.player.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg leading-tight">{topBet.player}</h3>
                            <p className="text-zinc-400 text-xs font-medium">{topBet.team} vs {topBet.opponent} • {topBet.sport}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="px-2 py-1 rounded bg-zinc-800 border border-white/10 h-7 flex items-center justify-center min-w-[80px] mb-1">
                            {getBookmakerLogo(topBet.bookmaker) ? (
                                <Image
                                    src={getBookmakerLogo(topBet.bookmaker)!}
                                    alt={topBet.bookmaker}
                                    width={80}
                                    height={24}
                                    className="object-contain max-h-4 w-auto"
                                />
                            ) : (
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                                    {topBet.bookmaker}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center text-emerald-400 gap-1 text-sm font-bold">
                            <TrendingUp className="w-3 h-3" />
                            +{topBet.ev}% EV
                        </div>
                    </div>
                </div>

                {/* Main Bet Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                        <p className="text-zinc-500 text-xs mb-1 uppercase tracking-wider font-semibold">Market</p>
                        <p className="text-zinc-200 font-medium text-sm">{topBet.market}</p>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                        <p className="text-zinc-500 text-xs mb-1 uppercase tracking-wider font-semibold">Line</p>
                        <div className="flex items-baseline gap-1">
                            <span className={clsx(
                                "text-base font-bold",
                                topBet.outcome === 'Over' ? "text-emerald-400" : "text-red-400"
                            )}>{topBet.outcome}</span>
                            <span className="text-white font-bold text-lg">{topBet.line}</span>
                        </div>
                    </div>
                </div>

                {/* Footer / CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <Activity className="w-3 h-3" />
                        <span>Live Line Analysis</span>
                    </div>
                    <button className="bg-white text-black hover:bg-zinc-200 transition-colors px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                        Bet Now <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

