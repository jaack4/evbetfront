import { DashboardNavbar } from "../../components/DashboardNavbar";
import { DashboardContent } from "../../components/DashboardContent";
import { Bet } from "../../components/BetRow";

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
        <DashboardContent initialBets={bets} />
      </main>
    </div>
  );
}
