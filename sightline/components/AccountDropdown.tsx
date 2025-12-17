'use client';

import { useState, useRef, useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { User, LogOut, CreditCard, ChevronDown, Loader2 } from 'lucide-react';

interface AccountDropdownProps {
  userName: string;
}

export const AccountDropdown = ({ userName }: AccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingBilling, setIsLoadingBilling] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useClerk();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle billing portal redirect
  const handleBillingClick = async () => {
    setIsLoadingBilling(true);
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error:', data.error);
        // If no subscription, redirect to pricing page
        if (response.status === 404) {
          window.location.href = '/pricing';
        }
        return;
      }

      // Redirect to Stripe billing portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoadingBilling(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        <span>{userName}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="py-1">
            {/* Billing Button */}
            <button
              onClick={handleBillingClick}
              disabled={isLoadingBilling}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingBilling ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              <span>Billing</span>
            </button>

            {/* Divider */}
            <div className="border-t border-white/5 my-1" />

            {/* Sign Out Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ redirectUrl: '/' });
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

