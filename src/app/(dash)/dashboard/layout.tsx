'use client';

import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

export default function DashLayout({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTheme(resolvedTheme || null);
  }, [resolvedTheme]);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="max-w-[1444px] mx-auto">
      <div className="flex w-full">
        <div className="w-[60%]" />
        <div className="flex w-full mt-5 justify-around">
          <div className="w-[60%]">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <div className="w-[30%] mt-1">
            {currentTheme !== null && (
              <Switch
                checked={currentTheme === 'dark'}
                onClick={handleThemeToggle}
              />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
