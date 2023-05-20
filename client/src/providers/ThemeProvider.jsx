import React, { createContext, useState } from 'react';
import { Footer } from '../components/AllComponents.jsx';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  const themeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className='App' id={theme}>
        <div className='my-6 px-8 flex flex-col'>
          {children}
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};