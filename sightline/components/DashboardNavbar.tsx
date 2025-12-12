import React from 'react';
import Link from 'next/link';

export const DashboardNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">SIGHTLINE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/dashboard" className="text-white transition-colors">Dashboard</Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        </div>

        {/* Mobile Menu Button (Placeholder - can be expanded) */}
        <div className="md:hidden text-zinc-400">
           {/* Mobile menu icon would go here */}
        </div>
      </div>
    </nav>
  );
};

