import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  currency: string;
  setCurrency: (c: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (r: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('executiveiq_theme') as Theme) || 'dark';
  });
  const [currency, setCurrencyState] = useState<string>(() => {
    return localStorage.getItem('executiveiq_currency') || 'INR';
  });
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    return localStorage.getItem('executiveiq_reduced_motion') === 'true';
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('executiveiq_theme', t);
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    localStorage.setItem('executiveiq_currency', c);
  };

  const setReducedMotion = (r: boolean) => {
    setReducedMotionState(r);
    localStorage.setItem('executiveiq_reduced_motion', String(r));
  };

  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currency, setCurrency, reducedMotion, setReducedMotion }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
