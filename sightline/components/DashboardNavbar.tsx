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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-black rounded-full" />
            </div>
            <span className="font-semibold text-white">Sightline</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/dashboard" className="text-white font-medium">Dashboard</Link>
            <button 
              onClick={handleManageSubscription}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Billing
            </button>
        </div>

        {/* User Menu */}
        <div className="flex items-center">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 ring-1 ring-zinc-700 ring-offset-1 ring-offset-black",
                userButtonPopoverCard: "bg-zinc-900 border border-zinc-800",
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
