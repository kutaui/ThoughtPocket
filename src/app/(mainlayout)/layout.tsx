import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import '@/css/globals.css';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1444px] mx-auto">
      <Navbar />
      {children}
    </div>
  );
}
