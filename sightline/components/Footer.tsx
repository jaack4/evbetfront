import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">SIGHTLINE</span>
            </div>
            <p className="text-zinc-500 max-w-sm mb-8">
              Institutional-grade sports betting analytics for the modern investor. Stop gambling, start trading.
            </p>
            <div className="flex gap-4">
                <a href="#" className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Linkedin className="w-4 h-4" />
                </a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Live Feed</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Arbitrage Finder</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Backtesting</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-zinc-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-600">
                &copy; {new Date().getFullYear()} Sightline Analytics Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-zinc-600">
                <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};
