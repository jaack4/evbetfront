'use client'

import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export const DashboardNavbar = () => {
  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error opening billing portal:', error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Sightline</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/dashboard" className="text-white transition-colors">Dashboard</Link>
            <button 
              onClick={handleManageSubscription}
              className="hover:text-white transition-colors"
            >
              Billing
            </button>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-white/10 ring-offset-2 ring-offset-black",
                userButtonPopoverCard: "bg-zinc-900 border border-white/10",
                userButtonPopoverActionButton: "hover:bg-zinc-800",
                userButtonPopoverActionButtonText: "text-zinc-300",
                userButtonPopoverFooter: "hidden",
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
};
