// DarkModeToggle.jsx
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;