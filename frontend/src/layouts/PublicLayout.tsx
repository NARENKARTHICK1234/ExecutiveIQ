import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050509] text-text-primary flex flex-col relative selection:bg-brand-purple selection:text-white">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
