import { BetRow, Bet } from "../../components/BetRow";
import { DashboardNavbar } from "../../components/DashboardNavbar";
import { SlidersHorizontal, Play, RefreshCw, Bell, Search } from "lucide-react";

// Force dynamic rendering to avoid static/ISR build for this page
export const dynamic = 'force-dynamic';

async function getBets() {
  // Fetches from your local Python API
  // Ensure your python api.py is running on port 8000
  try {
    const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000';
    
    // For development/demo purposes if API is not reachable, returns empty array
    // but typically you'd want to handle this better.
    try {
        const res = await fetch(`${apiUrl}/bets?limit=50`, {
          cache: 'no-store'
        });
        
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        console.warn("API fetch failed, returning empty list");
        return [];
    }
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

export default async function Dashboard() {
  const bets: Bet[] = await getBets();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <DashboardNavbar />
      
      <main className="relative z-10 pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
            
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-full bg-zinc-800 border border-white/10 text-sm font-medium hover:bg-zinc-700 transition-colors">
                        Pre-match <span className="text-zinc-400 ml-1">{bets.length}</span>
                    </button>
                    <button className="px-4 py-2 rounded-full bg-transparent border border-transparent text-zinc-400 text-sm font-medium hover:text-white transition-colors">
                        Live (in-play)
                    </button>
                    <button className="px-4 py-2 rounded-full bg-transparent border border-transparent text-zinc-400 text-sm font-medium hover:text-white transition-colors">
                        Hidden Bets
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                        <Play className="w-4 h-4 fill-current" /> Play
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="bg-zinc-900 border border-white/10 rounded pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 w-64 placeholder:text-zinc-600"
                        />
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-zinc-900/50 border-b border-white/5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    <div className="col-span-1 text-center">Percent</div>
                    <div className="col-span-3">Event</div>
                    <div className="col-span-2">Market</div>
                    <div className="col-span-3">Model Data</div>
                    <div className="col-span-2">Bet & Books</div>
                    <div className="col-span-1 text-right">1-Click Bet</div>
                </div>

                {/* Rows */}
                {bets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-zinc-200">No active bets found</h3>
                        <p className="text-zinc-500 max-w-md">
                            We're scanning the markets. New opportunities will appear here automatically.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {bets.map((bet) => (
                            <BetRow key={bet.id} bet={bet} />
                        ))}
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
