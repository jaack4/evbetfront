'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export const DashboardNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        {/* Left Side - Logo and Main Navigation */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/clearline.svg" 
              alt="Clearline" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>

          {/* Main Nav Links */}
          <div className="hidden md:flex items-center gap-1 h-full">
            <Link 
              href="/dashboard" 
              className={`relative px-3 py-1.5 text-[13px] font-medium transition-all rounded-lg ${
                pathname === '/dashboard' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/custom-bet" 
              className={`relative px-3 py-1.5 text-[13px] font-medium transition-all rounded-lg ${
                pathname === '/custom-bet' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Custom Bet
            </Link>
            <Link 
              href="/history" 
              className={`relative px-3 py-1.5 text-[13px] font-medium transition-all rounded-lg ${
                pathname === '/history' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              History
            </Link>
          </div>
        </div>

        {/* Right Side - Billing and User Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleManageSubscription}
            className="hidden md:block text-zinc-500 hover:text-white transition-colors text-[13px] font-medium"
          >
            Billing
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 ring-1 ring-white/10",
                userButtonPopoverCard: "bg-zinc-900 border border-white/10",
                userButtonPopoverActionButton: "hover:bg-white/[0.05]",
                userButtonPopoverActionButtonText: "text-zinc-300",
                userButtonPopoverFooter: "hidden",
              }
            }}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            <Link 
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium transition-all rounded-lg ${
                pathname === '/dashboard' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/custom-bet"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium transition-all rounded-lg ${
                pathname === '/custom-bet' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Custom Bet
            </Link>
            <Link 
              href="/history"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium transition-all rounded-lg ${
                pathname === '/history' 
                  ? 'text-white bg-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              History
            </Link>
            <button 
              onClick={() => {
                handleManageSubscription();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all font-medium rounded-lg"
            >
              Billing
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
