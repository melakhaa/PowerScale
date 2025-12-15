import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? 'dark' : 'light';
      setIsDarkMode(!isDarkMode);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Light Theme
const lightTheme = {
  isDark: false,
  colors: {
    primary: '#3498db',
    background: '#f5f6fa',
    surface: '#fff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    textTertiary: '#95a5a6',
    border: '#ecf0f1',
    card: '#fff',
    error: '#e74c3c',
    success: '#2ecc71',
    warning: '#f39c12',
  },
};

// Dark Theme
const darkTheme = {
  isDark: true,
  colors: {
    primary: '#3498db',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ecf0f1',
    textSecondary: '#bdc3c7',
    textTertiary: '#95a5a6',
    border: '#3d3d3d',
    card: '#2d2d2d',
    error: '#e74c3c',
    success: '#2ecc71',
    warning: '#f39c12',
  },
};
