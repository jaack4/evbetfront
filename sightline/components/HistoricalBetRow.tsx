import React from 'react';
import Image from 'next/image';
import { CheckCircle2, XCircle, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { clsx } from 'clsx';

export interface HistoricalBet {
    id: number;
    bookmaker: string;
    market: string;
    player: string;
    outcome: 'Over' | 'Under';
    betting_line: number;
    sharp_mean: number;
    ev_percent: number;
    price: number;
    true_prob: number;
    sport_title: string;
    home_team: string;
    away_team: string;
    commence_time: string;
    created_at: string;
    win: boolean;
    actual_value: number;
    prediction_diff: number;
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

export const HistoricalBetRow = ({ bet }: { bet: HistoricalBet }) => {
    const dateString = bet.commence_time.endsWith('Z') ? bet.commence_time : `${bet.commence_time}Z`;
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const formatMarket = (market: string) => {
        return market.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const isWin = bet.win;
    const resultColor = isWin ? 'text-emerald-400' : 'text-red-400';
    const resultBgColor = isWin ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20';

    return (
        <>
            {/* Mobile Layout */}
            <div className="md:hidden p-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                {/* Header: Result badge, Player, and Date */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={clsx(
                                "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border",
                                resultBgColor,
                                resultColor
                            )}>
                                {isWin ? (
                                    <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                    <XCircle className="w-3 h-3" />
                                )}
                                {isWin ? 'WIN' : 'LOSS'}
                            </div>
                            <span className="text-zinc-500 text-xs">
                                {bet.ev_percent.toFixed(1)}% EV
                            </span>
                        </div>
                        <div className="font-semibold text-white text-base truncate">
                            {bet.player}
                        </div>
                    </div>
                    <div className="text-zinc-400 text-xs text-right ml-2">
                        {formattedDate}<br />{formattedTime}
                    </div>
                </div>

                {/* Teams and Market */}
                <div className="text-zinc-400 text-xs mb-2">
                    {bet.away_team} vs {bet.home_team}
                    <span className="mx-1.5 text-zinc-600">|</span>
                    <span className="text-indigo-400">{formatMarket(bet.market)}</span>
                </div>

                {/* Bet Info */}
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
                </div>

                {/* Results Data */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-zinc-800/30 px-2 py-1.5 rounded">
                        <span className="text-zinc-500 block mb-0.5">Actual</span>
                        <span className="text-white font-mono font-semibold">
                            {bet.actual_value.toFixed(1)}
                        </span>
                    </div>
                    <div className="bg-zinc-800/30 px-2 py-1.5 rounded">
                        <span className="text-zinc-500 block mb-0.5">Predicted</span>
                        <span className="text-white font-mono font-semibold">
                            {bet.sharp_mean.toFixed(1)}
                        </span>
                    </div>
                    <div className="bg-zinc-800/30 px-2 py-1.5 rounded">
                        <span className="text-zinc-500 block mb-0.5">Diff</span>
                        <span className={clsx(
                            "font-mono font-semibold",
                            bet.prediction_diff > 0 ? "text-emerald-400" : 
                            bet.prediction_diff < 0 ? "text-red-400" : "text-zinc-200"
                        )}>
                            {bet.prediction_diff > 0 ? '+' : ''}{bet.prediction_diff.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[0.6fr_2.5fr_1.5fr_1.5fr_1.5fr_2fr] gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center text-sm group">

                {/* 1. Result Badge */}
                <div className="flex flex-col items-center gap-1">
                    <div className={clsx(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border",
                        resultBgColor,
                        resultColor
                    )}>
                        {isWin ? (
                            <CheckCircle2 className="w-4 h-4" />
                        ) : (
                            <XCircle className="w-4 h-4" />
                        )}
                        {isWin ? 'WIN' : 'LOSS'}
                    </div>
                    <span className="text-zinc-500 text-xs">
                        {bet.ev_percent.toFixed(1)}% EV
                    </span>
                </div>

                {/* 2. Event Info */}
                <div className="flex flex-col gap-1">
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
                <div className="text-indigo-300 font-medium break-words">
                    {formatMarket(bet.market)}
                </div>

                {/* 4. Bet & Book */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-start gap-1 bg-zinc-800/50 px-2 py-1.5 rounded border border-white/5">
                        <div className="h-7 flex items-center justify-center min-w-[50px]">
                            {getBookmakerLogo(bet.bookmaker) ? (
                                <Image
                                    src={getBookmakerLogo(bet.bookmaker)!}
                                    alt={bet.bookmaker}
                                    width={70}
                                    height={24}
                                    className="object-contain max-h-5 w-auto"
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
                </div>

                {/* 5. Actual Result */}
                <div className="flex flex-col items-center justify-center">
                    <span className="text-xs text-zinc-500 mb-1">Actual Result</span>
                    <span className="text-white font-mono text-xl font-bold">
                        {bet.actual_value.toFixed(1)}
                    </span>
                </div>

                {/* 6. Model Data & Comparison */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[80px]">
                        <span className="text-xs text-zinc-500 whitespace-nowrap mb-0.5">Predicted</span>
                        <span className="text-zinc-300 font-mono text-lg font-semibold">
                            {bet.sharp_mean.toFixed(1)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-white/10 pl-4 flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-zinc-500 whitespace-nowrap">Prediction Diff</span>
                            <span className={clsx(
                                "font-mono text-sm font-semibold flex items-center gap-1",
                                bet.prediction_diff > 0 ? "text-emerald-400" : 
                                bet.prediction_diff < 0 ? "text-red-400" : "text-zinc-200"
                            )}>
                                {bet.prediction_diff > 0 ? (
                                    <TrendingUp className="w-3.5 h-3.5" />
                                ) : bet.prediction_diff < 0 ? (
                                    <TrendingDown className="w-3.5 h-3.5" />
                                ) : null}
                                {bet.prediction_diff > 0 ? '+' : ''}{bet.prediction_diff.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-zinc-500 whitespace-nowrap">Win Prob</span>
                            <span className="text-zinc-200 font-mono text-sm">
                                {(bet.true_prob * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

