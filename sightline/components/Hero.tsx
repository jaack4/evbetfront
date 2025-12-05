import React from 'react';
import { TopBetCard } from './TopBetCard';
import { ChevronRight, Download } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden font-sans">
      {/* Simple Navbar */}
      <nav className="bg-black relative z-20">
        <div className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full" /> {/* Logo Placeholder */}
            <span className="font-bold text-xl tracking-tight">LINEWATCH</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Enterprise</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Resources</a>
          </div>

          <div className="flex items-center gap-4">
              <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign in</a>
              <a href="/dashboard" className="bg-white text-black hover:bg-zinc-200 transition-colors px-4 py-2 rounded-full text-sm font-medium">
                  Launch App
              </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex flex-col items-center pt-20 pb-32 px-4 relative">
        {/* Background Gradient/Glow - subtle like Cursor */}


        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 z-10">
          You're a  <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500">fatass.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed z-10">
          Linewatch is the best way to hunt +EV sports bets. <br className="hidden md:block" /> 
          Real-time odds, sharp analysis, and instant alerts.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 z-10 mb-20">
           <button className="bg-white text-black hover:bg-zinc-200 transition-colors h-12 px-6 rounded-full text-base font-medium flex items-center gap-2">
             Download for Windows <Download className="w-4 h-4" />
           </button>
           <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors h-12 px-6 rounded-full text-base font-medium">
             Open in Browser
           </button>
        </div>

        {/* The "Top Bet" Example Section */}
        <div className="relative w-full max-w-5xl mx-auto z-10">
            {/* Decorative backdrop for the card area */}
             <div className="absolute -inset-4 bg-gradient-to-b from-zinc-800/20 to-transparent rounded-3xl blur-2xl -z-10" />
             
             <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                     <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            LIVE OPPORTUNITY
                        </div>
                        <h2 className="text-3xl font-bold text-white">Real-time Edge Finding</h2>
                        <p className="text-zinc-400 text-lg">
                            Our algorithms scan millions of odds every second to find discrepancies between bookmakers. When we find a profitable edge, you're the first to know.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-1 h-1 bg-zinc-500 rounded-full" />
                                <span>Instant notifications for &gt;5% EV</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-1 h-1 bg-zinc-500 rounded-full" />
                                <span>Direct integration with major sportsbooks</span>
                            </div>
                             <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-1 h-1 bg-zinc-500 rounded-full" />
                                <span>Historical tracking and ROI analysis</span>
                            </div>
                        </div>
                     </div>
                     
                     {/* The Card Visualization */}
                     <div className="flex-1 w-full flex justify-center perspective-1000">
                        <div className="transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-500 ease-out preserve-3d">
                            <TopBetCard />
                        </div>
                     </div>
                 </div>
             </div>
        </div>
      </main>
    </div>
  );
};

