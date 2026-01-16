import React from 'react';
import { BetCard, Bet } from './BetCard';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Snowfall } from './Snowfall';
import { FeatureSpotlight } from './FeatureSpotlight';
import { AccountDropdown } from './AccountDropdown';
import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

async function getTopBet(): Promise<Bet | null> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) return null;
    
    const apiKey = process.env.API_KEY;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add X-API-KEY header if API key is available
    if (apiKey) {
      headers['X-API-KEY'] = apiKey;
    }
    
    const res = await fetch(`${apiUrl}/bets?limit=1`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers
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
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-hidden">
      <Snowfall />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/clearline.svg" 
              alt="Clearline" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Live Odds</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <AccountDropdown userName={user.firstName || user.emailAddresses[0].emailAddress} />
                <a href="/dashboard" className="group px-4 py-1.5 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-zinc-100 transition-all flex items-center gap-1.5">
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </>
            ) : (
              <>
                <a href="/sign-in" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors hidden md:block">
                  Log in
                </a>
                <a href="/sign-up" className="group px-4 py-1.5 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-zinc-100 transition-all flex items-center gap-1.5">
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex flex-col items-center pt-32 pb-24 px-6 relative z-10">
        
        {/* Badge/Announcement */}
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-medium text-zinc-400 tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            v2.0 Algorithm Now Live
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          <span className="text-gradient">Beat the sportsbooks</span>
          <br />
          <span className="text-white">with math.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-base md:text-lg text-zinc-400 text-center max-w-xl mx-auto mb-10 leading-relaxed">
          Real-time odds scanning, +EV opportunity detection, and instant arbitrage alerts. Stop gambling and start investing.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
          <a 
            href={user ? "/dashboard" : "/sign-up"} 
            className="group relative px-6 py-3 bg-white text-black hover:bg-zinc-100 transition-all rounded-xl text-sm font-semibold flex items-center gap-2 shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
          >
            {user ? "Go to Dashboard" : "Start free trial"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <FeatureSpotlight topBet={topBet} />
      </main>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-zinc-900/0 via-zinc-900/0 to-black pointer-events-none" />
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

    </div>
  );
};
