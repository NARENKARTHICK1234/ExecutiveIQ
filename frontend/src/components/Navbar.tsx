import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Menu, X, Shield, BarChart3 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050509]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center shadow-glow-purple">
            <span className="font-display font-extrabold text-white text-xl">EQ</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-white tracking-tight">ExecutiveIQ</span>
            <span className="text-[10px] ml-1.5 px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-cyan font-bold tracking-wider uppercase border border-brand-purple/30">
              Enterprise BI
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link to="/" className="hover:text-white transition-colors text-white font-semibold">Home</Link>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
          <a href="#technology" className="hover:text-white transition-colors">Tech Stack</a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/datasets"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/5 border border-white/10 transition-all"
          >
            Analyze Dataset
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-cyan transition-all shadow-glow-purple flex items-center gap-2 group"
          >
            <span>Explore Dashboard</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080B16] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-sm font-medium text-text-secondary">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white">Home</Link>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#platform" onClick={() => setMobileMenuOpen(false)}>Platform</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <Link to="/datasets" onClick={() => setMobileMenuOpen(false)}>Dataset Management</Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-brand-cyan font-bold">
              Explore Dashboard →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
