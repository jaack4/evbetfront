'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 h-16 flex items-center justify-between">
        {/* Left Side - Logo and Main Navigation */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
              </div>
              <span className="font-semibold text-white">Sightline</span>
          </Link>

          {/* Main Nav Links */}
          <div className="hidden md:flex items-center gap-8 h-full">
              <Link 
                href="/dashboard" 
                className={`relative h-16 flex items-center text-base font-medium transition-colors ${
                  pathname === '/dashboard' 
                    ? 'text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Dashboard
                {pathname === '/dashboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </Link>
              <Link 
                href="/custom-bet" 
                className={`relative h-16 flex items-center text-base font-medium transition-colors ${
                  pathname === '/custom-bet' 
                    ? 'text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Custom Bet
                {pathname === '/custom-bet' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </Link>
          </div>
        </div>

        {/* Right Side - Billing and User Menu */}
        <div className="flex items-center gap-8">
          <button 
            onClick={handleManageSubscription}
            className="hidden md:block text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Billing
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800/50 bg-black/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-1">
            <Link 
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 text-base font-medium transition-colors ${
                pathname === '/dashboard' 
                  ? 'text-white border-l-2 border-white' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/custom-bet"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 text-base font-medium transition-colors ${
                pathname === '/custom-bet' 
                  ? 'text-white border-l-2 border-white' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Custom Bet
            </Link>
            <button 
              onClick={() => {
                handleManageSubscription();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-base text-zinc-400 hover:text-white transition-colors font-medium"
            >
              Billing
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
