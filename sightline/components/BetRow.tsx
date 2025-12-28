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
    if (normalized.includes('pick6')) return '/logos/pick6.png';
    if (normalized.includes('fanduel')) return '/logos/fanduel.png';
    if (normalized.includes('prizepicks')) return '/logos/prizepicks.png';
    if (normalized.includes('underdog')) return '/logos/underdog.png';
    if (normalized.includes('betr')) return '/logos/betr.png';
    return null;
};

export const BetRow = ({ bet }: { bet: Bet }) => {
    // Append 'Z' to treat as UTC if no timezone is present
    const dateString = bet.commence_time.endsWith('Z') ? bet.commence_time : `${bet.commence_time}Z`;
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const formatMarket = (market: string) => {
        return market.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const isPositive = bet.ev_percent > 0;
    const evColor = isPositive ? 'text-emerald-400' : 'text-zinc-400';

    return (
        <>
            {/* Mobile Layout */}
            <div className="md:hidden p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                {/* Header with EV and Date */}
                <div className="flex items-center justify-between mb-3">
                    <span className={clsx("font-bold text-xl", evColor)}>
                        {bet.ev_percent.toFixed(2)}% EV
                    </span>
                    <div className="text-zinc-400 text-xs">
                        {formattedDate} at {formattedTime}
                    </div>
                </div>

                {/* Player Name */}
                <div className="font-bold text-white text-lg mb-1">
                    {bet.player}
                </div>

                {/* Teams and Sport */}
                <div className="text-zinc-300 text-sm mb-3">
                    {bet.away_team} vs {bet.home_team}
                    <span className="mx-2 text-zinc-500">•</span>
                    {bet.sport_title}
                </div>

                {/* Market */}
                <div className="text-indigo-300 font-medium mb-3 text-sm">
                    {formatMarket(bet.market)}
                </div>

                {/* Bet Info Card */}
                <div className="bg-zinc-800/50 p-3 rounded-lg border border-white/5 mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="h-7 flex items-center justify-center">
                                {getBookmakerLogo(bet.bookmaker) ? (
                                    <Image
                                        src={getBookmakerLogo(bet.bookmaker)!}
                                        alt={bet.bookmaker}
                                        width={70}
                                        height={24}
                                        className="object-contain max-h-5 w-auto"
                                    />
                                ) : (
                                    <span className="text-xs font-bold text-zinc-300 uppercase">
                                        {bet.bookmaker}
                                    </span>
                                )}
                            </div>
                        </div>
                        <span className="text-white font-bold text-lg">
                            {bet.outcome} {bet.betting_line}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Win Probability</span>
                        <span className="text-zinc-100 font-bold font-mono">{(bet.true_prob * 100).toFixed(1)}%</span>
                    </div>
                </div>

                {/* Model Data */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-zinc-800/30 p-2 rounded border border-white/5 text-center">
                        <div className="text-indigo-300 text-xs mb-1">Sharp Mean</div>
                        <div className="text-white font-mono font-bold">
                            {bet.sharp_mean !== undefined ? bet.sharp_mean.toFixed(2) : '-'}
                        </div>
                    </div>
                    <div className="bg-zinc-800/30 p-2 rounded border border-white/5 text-center">
                        <div className="text-indigo-300 text-xs mb-1">Std Dev</div>
                        <div className="text-zinc-200 font-mono text-sm">
                            {bet.std_dev !== undefined ? bet.std_dev.toFixed(2) : '-'}
                        </div>
                    </div>
                    <div className="bg-zinc-800/30 p-2 rounded border border-white/5 text-center">
                        <div className="text-indigo-300 text-xs mb-1">Games</div>
                        <div className="text-zinc-200 font-mono text-sm">
                            {bet.sample_size !== undefined ? bet.sample_size : '-'}
                        </div>
                    </div>
                </div>

                {/* Implied Means */}
                {bet.implied_means && Object.keys(bet.implied_means).length > 0 && (
                    <div className="bg-zinc-800/30 p-3 rounded border border-white/5">
                        <div className="text-indigo-300 text-xs font-semibold mb-2">Implied Means</div>
                        <div className="flex flex-col gap-2">
                            {Object.entries(bet.implied_means).map(([book, mean]) => (
                                <div key={book} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        {getBookmakerLogo(book) ? (
                                            <Image
                                                src={getBookmakerLogo(book)!}
                                                alt={book}
                                                width={60}
                                                height={20}
                                                className="object-contain max-h-4 w-auto opacity-80"
                                            />
                                        ) : (
                                            <span className="text-xs text-zinc-400 uppercase">{book}</span>
                                        )}
                                    </div>
                                    <span className="text-zinc-100 font-mono font-semibold">{mean.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[0.7fr_3fr_2fr_1.75fr_1.75fr_2.8fr] gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center text-sm group">

                {/* 1. Percent & Calculator */}
                <div className="flex flex-col items-center gap-2">
                    <span className={clsx("font-bold text-base", evColor)}>
                        {bet.ev_percent.toFixed(2)}%
                    </span>
                </div>

                {/* 2. Event Info */}
                <div className="flex flex-col gap-1">
                    <div className="text-zinc-300 text-xs flex items-center gap-1">
                        <span>{formattedDate} at {formattedTime}</span>
                    </div>
                    <div className="font-bold text-white text-base truncate" title={bet.player}>
                        {bet.player}
                    </div>
                    <div className="text-zinc-300 text-xs truncate">
                        {bet.away_team} vs {bet.home_team}
                        <span className="mx-2 text-zinc-500">|</span>
                        {bet.sport_title}
                    </div>
                </div>

                {/* 3. Market */}
                <div className="text-indigo-300 font-medium break-words">
                    {formatMarket(bet.market)}
                </div>

                {/* 4. Bet & Book */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-start gap-1 bg-zinc-800/50 px-2 py-1 rounded border border-white/5">
                        <div className="h-8 flex items-center justify-center min-w-[50px]">
                            {getBookmakerLogo(bet.bookmaker) ? (
                                <Image
                                    src={getBookmakerLogo(bet.bookmaker)!}
                                    alt={bet.bookmaker}
                                    width={80}
                                    height={28}
                                    className="object-contain max-h-6 w-auto"
                                />
                            ) : (
                                <span className="text-[10px] font-bold text-zinc-300 uppercase truncate max-w-[50px]">
                                    {bet.bookmaker}
                                </span>
                            )}
                        </div>
                        <span className="text-white font-medium whitespace-nowrap">
                            {bet.outcome} {bet.betting_line}
                        </span>
                    </div>
                    <div className="flex items-center justify-between px-2 text-xs">
                        <span className="text-zinc-400">Win Prob</span>
                        <span className="text-zinc-100 font-bold font-mono text-sm">{(bet.true_prob * 100).toFixed(1)}%</span>
                    </div>
                </div>

                {/* 5. Implied Means */}
                <div className="flex flex-col gap-1">
                    {bet.implied_means && Object.keys(bet.implied_means).length > 0 ? (
                        Object.entries(bet.implied_means).map(([book, mean]) => (
                            <div key={book} className="flex justify-start items-center gap-3 px-2 py-0.5">
                                {getBookmakerLogo(book) ? (
                                    <Image
                                        src={getBookmakerLogo(book)!}
                                        alt={book}
                                        width={80}
                                        height={28}
                                        className="object-contain max-h-5 w-auto opacity-80"
                                    />
                                ) : (
                                    <span className="text-[10px] text-zinc-400 uppercase truncate max-w-[50px]">{book}</span>
                                )}
                                <span className="text-zinc-100 font-mono text-base font-semibold">{mean.toFixed(2)}</span>
                            </div>
                        ))
                    ) : (
                        <span className="text-zinc-500 text-xs italic text-center">-</span>
                    )}
                </div>

                {/* 6. Model Data */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[80px]">
                        <span className="text-xs text-indigo-300 whitespace-nowrap mb-0.5">Sharp Mean</span>
                        <span className="text-white font-mono text-xl font-bold">
                            {bet.sharp_mean !== undefined ? bet.sharp_mean.toFixed(2) : '-'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4 flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-indigo-300 whitespace-nowrap">Std Dev</span>
                            <span className="text-zinc-200 font-mono text-sm">
                                {bet.std_dev !== undefined ? bet.std_dev.toFixed(2) : '-'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-indigo-300 whitespace-nowrap">Games Used</span>
                            <span className="text-zinc-200 font-mono text-sm">
                                {bet.sample_size !== undefined ? bet.sample_size : '-'}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
