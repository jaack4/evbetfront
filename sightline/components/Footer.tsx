import React from 'react';
import { Twitter, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/[0.06] py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-white">Sightline</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Product</a>
            <a href="#pricing" className="hover:text-zinc-300 transition-colors">Pricing</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all">
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Sightline Analytics. All rights reserved.
          </div>
          <div className="text-xs text-zinc-600">
            Smash the odds. Land your edge.
          </div>
        </div>

      </div>
    </footer>
  );
};
