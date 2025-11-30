import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'neon_planner_theme_is_dark';

export default function useTheme(initialValue = false) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) return raw === 'true';
    } catch (e) {
      // ignore if localStorage unavailable
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      if (isDark) document.documentElement.classList.add('dark-mode');
      else document.documentElement.classList.remove('dark-mode');
      localStorage.setItem(STORAGE_KEY, isDark ? 'true' : 'false');
    } catch (e) {
      // ambientes sem DOM/localStorage
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(v => !v), []);

  return { isDark, setIsDark, toggle };
}
