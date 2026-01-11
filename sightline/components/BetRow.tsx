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
    mean_diff?: number;
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
            <div className="md:hidden p-2.5 border-b border-white/5 hover:bg-white/5 transition-colors">
                {/* Header: EV, Player, and Date in compact layout */}
                <div className="flex items-start justify-between mb-1.5">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-0.5">
                            <span className={clsx("font-bold text-lg", evColor)}>
                                {bet.ev_percent.toFixed(2)}%
                            </span>
                            <span className="text-zinc-500 text-xs">EV</span>
                        </div>
                        <div className="font-semibold text-white text-base truncate">
                            {bet.player}
                        </div>
                    </div>
                    <div className="text-zinc-400 text-xs text-right ml-2">
                        {formattedDate}<br />{formattedTime}
                    </div>
                </div>

                {/* Teams, Sport, and Market in one line */}
                <div className="text-zinc-400 text-xs mb-2">
                    {bet.away_team} vs {bet.home_team}
                    <span className="mx-1.5 text-zinc-600">•</span>
                    <span className="text-indigo-400">{formatMarket(bet.market)}</span>
                </div>

                {/* Bet Info - More compact horizontal layout */}
                <div className="flex items-center justify-between bg-zinc-800/50 px-2.5 py-1.5 rounded border border-white/5 mb-2">
                    <div className="flex items-center gap-2">
                        <div className="h-5 flex items-center justify-center">
                            {getBookmakerLogo(bet.bookmaker) ? (
                                <Image
                                    src={getBookmakerLogo(bet.bookmaker)!}
                                    alt={bet.bookmaker}
                                    width={60}
                                    height={20}
                                    className="object-contain max-h-4 w-auto"
                                />
                            ) : (
                                <span className="text-xs font-bold text-zinc-300 uppercase">
                                    {bet.bookmaker}
                                </span>
                            )}
                        </div>
                        <span className="text-white font-bold text-sm">
                            {bet.outcome} {bet.betting_line}
                        </span>
                    </div>
                    <div className="text-xs">
                        <span className="text-zinc-500">Win: </span>
                        <span className="text-zinc-100 font-mono font-semibold">{(bet.true_prob * 100).toFixed(1)}%</span>
                    </div>
                </div>

                {/* Model Data - Compact inline layout */}
                <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-3">
                        <div>
                            <span className="text-indigo-400">Sharp: </span>
                            <span className="text-white font-mono font-semibold">
                                {bet.sharp_mean !== undefined ? bet.sharp_mean.toFixed(2) : '-'}
                            </span>
                        </div>
                        <div>
                            <span className="text-indigo-400">Diff: </span>
                            <span className={clsx(
                                "font-mono font-semibold",
                                bet.mean_diff !== undefined && bet.mean_diff > 0 ? "text-emerald-400" : 
                                bet.mean_diff !== undefined && bet.mean_diff < 0 ? "text-red-400" : "text-zinc-200"
                            )}>
                                {bet.mean_diff !== undefined ? (bet.mean_diff > 0 ? '+' : '') + bet.mean_diff.toFixed(2) : '-'}
                            </span>
                        </div>
                        <div>
                            <span className="text-indigo-400">SD: </span>
                            <span className="text-zinc-200 font-mono">
                                {bet.std_dev !== undefined ? bet.std_dev.toFixed(2) : '-'}
                            </span>
                        </div>
                        <div>
                            <span className="text-indigo-400">n: </span>
                            <span className="text-zinc-200 font-mono">
                                {bet.sample_size !== undefined ? bet.sample_size : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Implied Means - Only show if present, more compact */}
                {bet.implied_means && Object.keys(bet.implied_means).length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap text-xs pt-1.5 border-t border-white/5">
                        <span className="text-indigo-400 font-semibold">Implied:</span>
                        {Object.entries(bet.implied_means).map(([book, mean]) => (
                            <div key={book} className="flex items-center gap-1.5 bg-zinc-800/30 px-2 py-0.5 rounded">
                                {getBookmakerLogo(book) ? (
                                    <Image
                                        src={getBookmakerLogo(book)!}
                                        alt={book}
                                        width={50}
                                        height={16}
                                        className="object-contain max-h-3 w-auto opacity-80"
                                    />
                                ) : (
                                    <span className="text-zinc-500 uppercase text-[10px]">{book}</span>
                                )}
                                <span className="text-zinc-100 font-mono">{mean.toFixed(2)}</span>
                            </div>
                        ))}
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
                            <span className="text-xs text-indigo-300 whitespace-nowrap">Mean Diff</span>
                            <span className={clsx(
                                "font-mono text-sm font-semibold",
                                bet.mean_diff !== undefined && bet.mean_diff > 0 ? "text-emerald-400" : 
                                bet.mean_diff !== undefined && bet.mean_diff < 0 ? "text-red-400" : "text-zinc-200"
                            )}>
                                {bet.mean_diff !== undefined ? (bet.mean_diff > 0 ? '+' : '') + bet.mean_diff.toFixed(2) : '-'}
                            </span>
                        </div>
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
