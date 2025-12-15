import React from 'react';
import { BetCard, Bet } from './BetCard';
import { Download, ArrowRight, ChevronRight } from 'lucide-react';
import { Snowfall } from './Snowfall';
import { FeatureSpotlight } from './FeatureSpotlight';

async function getTopBet(): Promise<Bet | null> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) return null;
    
    const res = await fetch(`${apiUrl}/bets?limit=1`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching top bet:", error);
    return null;
  }
}

export const Hero = async () => {
  const topBet = await getTopBet();

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-hidden">
      <Snowfall />

      {/* Navbar - Modern Glass */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <div className="w-3 h-3 bg-black rounded-full" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">Penis Odds</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <a href="#" className="hover:text-white transition-colors">Product</a>
                <a href="#" className="hover:text-white transition-colors">Live Odds</a>
                <a href="#" className="hover:text-white transition-colors">Systems</a>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block">Log in</a>
                <a href="/dashboard" className="group relative px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2">
                    Launch App
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
            </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex flex-col items-center pt-32 pb-32 px-6 relative z-10">
        
        {/* Badge/Announcement */}
        <div className="mb-8 animate-fade-in-up">
             <a href="#" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 hover:bg-white/10 transition-colors backdrop-blur-md ring-1 ring-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                v2.0 Algorithm Now Live
                <ChevronRight className="w-3 h-3 text-zinc-500" />
             </a>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight max-w-5xl mx-auto leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
          Beat the sportsbooks <br />
          <span className="text-white">with math.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Real-time odds scanning, +EV opportunity detection, and instant arbitrage alerts. Stop gambling and start investing.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24 w-full sm:w-auto">
           <button className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 transition-all h-12 px-8 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
             Start Free Trial
           </button>
           <button className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-all h-12 px-8 rounded-full text-base font-medium flex items-center justify-center gap-2 hover:-translate-y-0.5">
             <Download className="w-4 h-4" />
             Download App
           </button>
        </div>

        <FeatureSpotlight topBet={topBet} />
      </main>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-zinc-900/0 via-zinc-900/0 to-black pointer-events-none" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

    </div>
  );
};
