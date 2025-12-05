import { BetCard, Bet } from "../../components/BetCard";
import { DashboardNavbar } from "../../components/DashboardNavbar";

// Force dynamic rendering to avoid static/ISR build for this page
export const dynamic = 'force-dynamic';

async function getBets() {
  // Fetches from your local Python API
  // Ensure your python api.py is running on port 8000
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      // For development, default to localhost if not set, or handle gracefully
       // console.warn("Missing NEXT_PUBLIC_API_URL. Using default.");
       // This might be better handled by just returning empty or throwing if strict.
       // We'll stick to existing logic but make it safe.
       if (process.env.NODE_ENV === 'development') {
           // Allow fallback or just return empty
       }
       // If truly missing and critical:
       // throw new Error("Missing NEXT_PUBLIC_API_URL");
    }
    
    // If API URL is not defined, we can't fetch. 
    // But let's try to use the one from the file if it was working before.
    // The previous file checked for it.
    if (!apiUrl) return [];

    const res = await fetch(`${apiUrl}/bets?limit=50`, {
      cache: 'no-store' // Fetch fresh data on every request
    });
    
    if (!res.ok) {
      console.error('Failed to fetch bets:', res.status);
      return [];
    }
    return res.json();
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
      
      {/* Background Elements - Matching the Hero/Home style */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-zinc-900/0 via-zinc-900/0 to-black" />
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                            Live Opportunities
                        </h1>
                        <p className="text-zinc-400 mt-2 text-lg">
                            Real-time +EV bets from PrizePicks and Underdog.
                        </p>
                    </div>
                    
                    {/* Stats/Status Pill */}
                    <div className="self-start md:self-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-zinc-300 shadow-lg ring-1 ring-white/5">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${bets.length > 0 ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${bets.length > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            </span>
                            <span className="font-mono font-bold text-white">{bets.length}</span>
                            Active {bets.length === 1 ? 'Bet' : 'Bets'}
                        </div>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
            </header>

            {/* Main Content */}
            {bets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 border border-white/5 rounded-2xl bg-zinc-900/20 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-zinc-200">No active bets found</h3>
                    <p className="text-zinc-500 max-w-md">
                        We're scanning the markets. New opportunities will appear here automatically when detected.
                    </p>
                    {/* Optional: Check API hint */}
                    <p className="text-zinc-700 text-xs mt-8">
                        (Ensure backend API is running)
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {bets.map((bet) => (
                        <BetCard key={bet.id} bet={bet} />
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
