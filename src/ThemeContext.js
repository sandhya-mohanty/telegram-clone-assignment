import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme');
    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('app-theme', newMode);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderComponent;
