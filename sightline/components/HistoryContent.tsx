'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { HistoricalBet, HistoricalBetRow } from './HistoricalBetRow';
import { 
    Search, 
    RefreshCw, 
    ChevronLeft, 
    ChevronRight, 
    TrendingUp, 
    Target, 
    Trophy,
    BarChart3,
    Filter,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

interface HitRateCategory {
    category: string;
    total_bets: number;
    wins: number;
    losses: number;
    hit_rate: number;
}

interface HitRateStats {
    overall: HitRateCategory;
    by_bookmaker: HitRateCategory[];
    by_sport: HitRateCategory[];
    by_market: HitRateCategory[];
}

interface HistoricalResponse {
    bets: HistoricalBet[];
    total_count: number;
    page: number;
    page_size: number;
    total_pages: number;
}

interface HistoryContentProps {
    initialBets: HistoricalResponse;
    initialStats: HitRateStats;
}

export const HistoryContent = ({ initialBets, initialStats }: HistoryContentProps) => {
    const [bets, setBets] = useState<HistoricalBet[]>(initialBets.bets);
    const [stats, setStats] = useState<HitRateStats>(initialStats);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(initialBets.page);
    const [totalPages, setTotalPages] = useState(initialBets.total_pages);
    const [totalCount, setTotalCount] = useState(initialBets.total_count);
    
    // Filters
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchBets = useCallback(async (pageNum: number = 1) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: pageNum.toString(),
                page_size: '50',
            });

            if (selectedBook) params.append('bookmaker', selectedBook);
            if (selectedSport) params.append('sport', selectedSport);
            if (selectedOutcome !== null) params.append('win', selectedOutcome);

            const res = await fetch(`/api/historical?${params.toString()}`);
            if (res.ok) {
                const data: HistoricalResponse = await res.json();
                setBets(data.bets);
                setPage(data.page);
                setTotalPages(data.total_pages);
                setTotalCount(data.total_count);
            }
        } catch (error) {
            console.error('Failed to fetch historical bets:', error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedBook, selectedSport, selectedOutcome]);

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch('/api/hitrate');
            if (res.ok) {
                const data: HitRateStats = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }, []);

    // Refetch when filters change
    useEffect(() => {
        fetchBets(1);
    }, [selectedBook, selectedSport, selectedOutcome, fetchBets]);

    const handleRefresh = () => {
        fetchBets(page);
        fetchStats();
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchBets(newPage);
        }
    };

    const toggleBook = (book: string) => {
        setSelectedBook(selectedBook === book ? null : book);
    };

    const toggleSport = (sport: string) => {
        setSelectedSport(selectedSport === sport ? null : sport);
    };

    const toggleOutcome = (outcome: string) => {
        setSelectedOutcome(selectedOutcome === outcome ? null : outcome);
    };

    // Filter bets by search query (client-side)
    const filteredBets = bets.filter(bet => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            bet.player.toLowerCase().includes(query) ||
            bet.home_team.toLowerCase().includes(query) ||
            bet.away_team.toLowerCase().includes(query) ||
            bet.sport_title.toLowerCase().includes(query) ||
            bet.market.toLowerCase().includes(query)
        );
    });

    const getHitRateColor = (rate: number) => {
        if (rate >= 55) return 'text-emerald-400';
        if (rate >= 50) return 'text-amber-400';
        return 'text-red-400';
    };

    return (
        <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                    {/* Search */}
                    <div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600 font-sans"
                            />
                        </div>
                    </div>

                    {/* Outcome Filter */}
                    <div>
                        <h3 className="text-xs font-sans text-white-500 uppercase tracking-wider mb-3">Result</h3>
                        <div className="space-y-1">
                            {[
                                { id: 'true', name: 'Wins Only', icon: CheckCircle2, color: 'text-emerald-400' },
                                { id: 'false', name: 'Losses Only', icon: XCircle, color: 'text-red-400' },
                            ].map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => toggleOutcome(option.id)}
                                    className={clsx(
                                        "w-full px-3 py-2 rounded-lg text-sm font-sans transition-all flex items-center gap-2.5",
                                        selectedOutcome === option.id
                                            ? "bg-white text-black font-medium"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-normal"
                                    )}
                                >
                                    <option.icon className={clsx(
                                        "w-4 h-4", 
                                        selectedOutcome === option.id ? "text-black" : option.color
                                    )} />
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bookmakers */}
                    <div>
                        <h3 className="text-xs font-sans text-white-500 uppercase tracking-wider mb-3">Books</h3>
                        <div className="space-y-1">
                            {[
                                { id: 'underdog', name: 'Underdog', logo: '/logos/underdog.png' },
                                { id: 'prizepicks', name: 'PrizePicks', logo: '/logos/prizepicks.png' },
                                { id: 'betr', name: 'Betr', logo: '/logos/betr.png' },
                                { id: 'pick6', name: 'Pick6', logo: '/logos/pick6.png' },
                            ].map((book) => (
                                <button
                                    key={book.id}
                                    onClick={() => toggleBook(book.id)}
                                    className={clsx(
                                        "w-full px-3 py-2 rounded-lg text-sm font-sans transition-all flex items-center gap-2.5",
                                        selectedBook === book.id
                                            ? "bg-white text-black font-medium"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-normal"
                                    )}
                                >
                                    <div className="w-4 h-4 relative flex-shrink-0">
                                        <Image src={book.logo} alt={book.name} fill className="object-contain" />
                                    </div>
                                    {book.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Leagues */}
                    <div>
                        <h3 className="text-xs font-sans text-white-500 uppercase tracking-wider mb-3">Leagues</h3>
                        <div className="space-y-1">
                            {[
                                { id: 'NBA', name: 'NBA', logo: '/logos/nba.png' },
                                { id: 'NFL', name: 'NFL', logo: '/logos/nfl.png' },
                            ].map((sport) => (
                                <button
                                    key={sport.id}
                                    onClick={() => toggleSport(sport.id)}
                                    className={clsx(
                                        "w-full px-3 py-2 rounded-lg text-sm font-sans transition-all flex items-center gap-2.5",
                                        selectedSport === sport.id
                                            ? "bg-white text-black font-medium"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-normal"
                                    )}
                                >
                                    <div className="w-4 h-4 relative flex-shrink-0">
                                        <Image src={sport.logo} alt={sport.name} fill className="object-contain" />
                                    </div>
                                    {sport.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Filters */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-zinc-800 p-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <div className="relative flex-shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-32 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
                        />
                    </div>
                    {[
                        { id: 'true', name: 'Wins' },
                        { id: 'false', name: 'Losses' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => toggleOutcome(option.id)}
                            className={clsx(
                                "flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                selectedOutcome === option.id
                                    ? "bg-white text-black"
                                    : "bg-zinc-900 text-zinc-400"
                            )}
                        >
                            {option.name}
                        </button>
                    ))}
                    <div className="w-px h-6 bg-zinc-800 flex-shrink-0" />
                    {[
                        { id: 'underdog', name: 'UD' },
                        { id: 'prizepicks', name: 'PP' },
                        { id: 'betr', name: 'Betr' },
                        { id: 'pick6', name: 'P6' },
                    ].map((book) => (
                        <button
                            key={book.id}
                            onClick={() => toggleBook(book.id)}
                            className={clsx(
                                "flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                selectedBook === book.id
                                    ? "bg-white text-black"
                                    : "bg-zinc-900 text-zinc-400"
                            )}
                        >
                            {book.name}
                        </button>
                    ))}
                    <div className="w-px h-6 bg-zinc-800 flex-shrink-0" />
                    {[
                        { id: 'NBA', name: 'NBA' },
                        { id: 'NFL', name: 'NFL' },
                    ].map((sport) => (
                        <button
                            key={sport.id}
                            onClick={() => toggleSport(sport.id)}
                            className={clsx(
                                "flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                selectedSport === sport.id
                                    ? "bg-white text-black"
                                    : "bg-zinc-900 text-zinc-400"
                            )}
                        >
                            {sport.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* Stats Cards */}
                <div className="mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Overall Hit Rate */}
                        <div className="bg-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Target className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Hit Rate</span>
                            </div>
                            <div className={clsx(
                                "text-3xl font-bold font-mono",
                                getHitRateColor(stats.overall.hit_rate)
                            )}>
                                {stats.overall.hit_rate.toFixed(1)}%
                            </div>
                            <div className="text-zinc-500 text-xs mt-1">
                                Overall accuracy
                            </div>
                        </div>

                        {/* Total Bets */}
                        <div className="bg-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Total Bets</span>
                            </div>
                            <div className="text-3xl font-bold font-mono text-white">
                                {stats.overall.total_bets.toLocaleString()}
                            </div>
                            <div className="text-zinc-500 text-xs mt-1">
                                Verified results
                            </div>
                        </div>

                        {/* Wins */}
                        <div className="bg-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Trophy className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Wins</span>
                            </div>
                            <div className="text-3xl font-bold font-mono text-emerald-400">
                                {stats.overall.wins.toLocaleString()}
                            </div>
                            <div className="text-zinc-500 text-xs mt-1">
                                Successful picks
                            </div>
                        </div>

                        {/* Losses */}
                        <div className="bg-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <XCircle className="w-4 h-4 text-red-400" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Losses</span>
                            </div>
                            <div className="text-3xl font-bold font-mono text-red-400">
                                {stats.overall.losses.toLocaleString()}
                            </div>
                            <div className="text-zinc-500 text-xs mt-1">
                                Unsuccessful picks
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* By Bookmaker */}
                        <div className="bg-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm">
                            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-zinc-500" />
                                By Bookmaker
                            </h3>
                            <div className="space-y-3">
                                {stats.by_bookmaker.map((item) => (
                                    <div key={item.category} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-300 text-sm capitalize">{item.category}</span>
                                            <span className="text-zinc-600 text-xs">({item.total_bets})</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={clsx(
                                                        "h-full rounded-full",
                                                        item.hit_rate >= 55 ? "bg-emerald-500" : 
                                                        item.hit_rate >= 50 ? "bg-amber-500" : "bg-red-500"
                                                    )}
                                                    style={{ width: `${item.hit_rate}%` }}
                                                />
                                            </div>
                                            <span className={clsx(
                                                "font-mono text-sm font-semibold min-w-[4ch]",
                                                getHitRateColor(item.hit_rate)
                                            )}>
                                                {item.hit_rate.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* By Sport */}
                        <div className="bg-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm">
                            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-zinc-500" />
                                By Sport
                            </h3>
                            <div className="space-y-3">
                                {stats.by_sport.map((item) => (
                                    <div key={item.category} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-300 text-sm">{item.category}</span>
                                            <span className="text-zinc-600 text-xs">({item.total_bets})</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={clsx(
                                                        "h-full rounded-full",
                                                        item.hit_rate >= 55 ? "bg-emerald-500" : 
                                                        item.hit_rate >= 50 ? "bg-amber-500" : "bg-red-500"
                                                    )}
                                                    style={{ width: `${item.hit_rate}%` }}
                                                />
                                            </div>
                                            <span className={clsx(
                                                "font-mono text-sm font-semibold min-w-[4ch]",
                                                getHitRateColor(item.hit_rate)
                                            )}>
                                                {item.hit_rate.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-white mb-1">History</h1>
                        <p className="text-sm text-zinc-500">
                            {totalCount.toLocaleString()} verified results
                        </p>
                    </div>
                    
                    {/* Refresh & Pagination Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={clsx("w-4 h-4", isLoading && "animate-spin")} />
                        </button>
                        
                        {/* Pagination */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page <= 1 || isLoading}
                                className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-2 text-sm text-zinc-400 font-mono">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= totalPages || isLoading}
                                className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-black/40 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[0.6fr_2.5fr_1.5fr_1.5fr_1.5fr_2fr] gap-4 px-5 py-3 bg-white/[0.02] border-b border-white/[0.06] text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        <div className="text-center">Result</div>
                        <div>Event</div>
                        <div>Market</div>
                        <div>Bet</div>
                        <div className="text-center">Actual</div>
                        <div>Model Data</div>
                    </div>

                    {/* Loading Overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                            <RefreshCw className="w-8 h-8 text-white animate-spin" />
                        </div>
                    )}

                    {/* Rows */}
                    {filteredBets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-12 h-12 bg-white/[0.03] rounded-full flex items-center justify-center mb-4 border border-white/[0.08]">
                                <Search className="w-5 h-5 text-zinc-600" />
                            </div>
                            <h3 className="text-base font-medium mb-1 text-zinc-300">No results found</h3>
                            <p className="text-zinc-600 text-sm">
                                Try adjusting your filters
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            {filteredBets.map((bet) => (
                                <HistoricalBetRow key={bet.id} bet={bet} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={page <= 1 || isLoading}
                                className="px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                First
                            </button>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page <= 1 || isLoading}
                                className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-sm text-zinc-400 font-mono">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= totalPages || isLoading}
                                className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={page >= totalPages || isLoading}
                                className="px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                Last
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile bottom padding for fixed filters */}
                <div className="lg:hidden h-20" />
            </div>
        </div>
    );
};

