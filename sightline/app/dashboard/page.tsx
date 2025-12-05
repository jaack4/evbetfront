import { BetCard, Bet } from "../../components/BetCard";

async function getBets() {
  // Fetches from your local Python API
  // Ensure your python api.py is running on port 8000
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("Missing NEXT_PUBLIC_API_URL. Set it in .env.local");
    }
    const res = await fetch(`${apiUrl}/bets?limit=50`, {
      cache: 'no-store' // Fetch fresh data on every request
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch bets');
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
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      {/* Dashboard Header */}
      <header className="mb-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Live Opportunities</h1>
          <div className="text-sm text-zinc-400">
            Scanning {bets.length > 0 ? bets.length : 0} active bets
          </div>
        </div>
        <p className="text-zinc-400">Real-time +EV bets from PrizePicks and Underdog.</p>
      </header>

      {/* Bets Grid */}
      <main className="max-w-7xl mx-auto">
        {bets.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-xl bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-2">No bets found</h3>
            <p className="text-zinc-400">Ensure the API is running at localhost:8000</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
