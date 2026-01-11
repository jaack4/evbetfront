'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Bet } from './BetRow';
import { BetRow } from './BetRow';
import { Search, RefreshCw, Clock, Pause, Play } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

interface DashboardContentProps {
    initialBets: Bet[];
}

export const DashboardContent = ({ initialBets }: DashboardContentProps) => {
    const [bets, setBets] = useState<Bet[]>(initialBets);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLiveBets, setShowLiveBets] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [countdown, setCountdown] = useState(AUTO_REFRESH_INTERVAL / 1000);

    const fetchBets = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/bets');
            if (res.ok) {
                const data = await res.json();
                setBets(data);
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.error('Failed to fetch bets:', error);
        } finally {
            setIsRefreshing(false);
            setCountdown(AUTO_REFRESH_INTERVAL / 1000);
        }
    }, []);

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            fetchBets();
        }, AUTO_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [autoRefresh, fetchBets]);

    // Countdown timer effect
    useEffect(() => {
        if (!autoRefresh) return;

        const countdownInterval = setInterval(() => {
            setCountdown(prev => (prev > 1 ? prev - 1 : AUTO_REFRESH_INTERVAL / 1000));
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [autoRefresh]);

    const filteredBets = bets.filter(bet => {
        // Filter by time - hide past/live bets unless showLiveBets is true
        if (!showLiveBets) {
            const dateString = bet.commence_time.endsWith('Z') ? bet.commence_time : `${bet.commence_time}Z`;
            const commenceTime = new Date(dateString);
            const now = new Date();
            if (commenceTime <= now) {
                return false;
            }
        }

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

    const handleRefresh = () => {
        fetchBets();
    };

    const toggleAutoRefresh = () => {
        setAutoRefresh(prev => !prev);
        if (!autoRefresh) {
            setCountdown(AUTO_REFRESH_INTERVAL / 1000);
        }
    };

    const formatLastUpdated = () => {
        return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    {/* Bookmakers */}
                    <div>
                        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Books</h3>
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
                                        "w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2.5",
                                        selectedBook === book.id
                                            ? "bg-white text-black"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
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
                        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Leagues</h3>
                        <div className="space-y-1">
                            {[
                                { id: 'nba', name: 'NBA', logo: '/logos/nba.png' },
                                { id: 'nfl', name: 'NFL', logo: '/logos/nfl.png' },
                            ].map((sport) => (
                                <button
                                    key={sport.id}
                                    onClick={() => toggleSport(sport.id)}
                                    className={clsx(
                                        "w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2.5",
                                        selectedSport === sport.id
                                            ? "bg-white text-black"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
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

                    {/* Options */}
                    <div>
                        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Options</h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setShowLiveBets(!showLiveBets)}
                                className={clsx(
                                    "w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2.5",
                                    showLiveBets
                                        ? "bg-white text-black"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                )}
                            >
                                <Clock className={clsx("w-4 h-4", showLiveBets && "text-black")} />
                                Include Live
                            </button>
                        </div>
                    </div>

                    {/* Refresh Controls */}
                    <div className="pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center gap-2 mb-3">
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all disabled:opacity-50"
                            >
                                <RefreshCw className={clsx("w-4 h-4", isRefreshing && "animate-spin")} />
                            </button>
                            <button
                                onClick={toggleAutoRefresh}
                                className={clsx(
                                    "flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                                    autoRefresh
                                        ? "bg-zinc-800/50 text-zinc-300"
                                        : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
                                )}
                            >
                                {autoRefresh ? (
                                    <>
                                        <Pause className="w-3.5 h-3.5" />
                                        <span className="tabular-nums">{countdown}s</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-3.5 h-3.5" />
                                        <span>Auto</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-zinc-600">
                            Updated {formatLastUpdated()}
                        </p>
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
                        { id: 'nba', name: 'NBA' },
                        { id: 'nfl', name: 'NFL' },
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
                {/* Header */}
                <div className="mb-6 flex items-baseline justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-white mb-1">Bets</h1>
                        <p className="text-sm text-zinc-500">
                            {filteredBets.length} active opportunities
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[0.7fr_3fr_2fr_1.75fr_1.75fr_2.8fr] gap-4 px-4 py-3 bg-zinc-900/50 border-b border-white/5 text-xs font-semibold text-zinc-200">
                        <div className="text-center">EV</div>
                        <div>Event</div>
                        <div>Market</div>
                        <div>Bet</div>
                        <div>Implied Means</div>
                        <div>Model Data</div>
                    </div>

                    {/* Rows */}
                    {filteredBets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-5 h-5 text-zinc-600" />
                            </div>
                            <h3 className="text-lg font-medium mb-1 text-zinc-300">No bets found</h3>
                            <p className="text-zinc-600 text-sm">
                                Try adjusting your filters
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-800/30">
                            {filteredBets.map((bet) => (
                                <BetRow key={bet.id} bet={bet} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Mobile bottom padding for fixed filters */}
                <div className="lg:hidden h-20" />
            </div>
        </div>
    );
};
