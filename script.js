'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const progressBar = document.querySelector('[data-scroll-progress]');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const gameRoot = document.querySelector('.game-panel');
  const storage = createStorage();
  const themeStorageKey = 'dooho-h-theme';
  const darkThemeColor = '#0d1320';
  const lightThemeColor = '#f4efe7';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  let scrollFrame = 0;

  function createStorage() {
    try {
      const probe = window.localStorage;
      const key = '__portfolio_probe__';
      probe.setItem(key, '1');
      probe.removeItem(key);
      return probe;
    } catch {
      const store = new Map();
      return {
        getItem(key) {
          return store.has(key) ? store.get(key) : null;
        },
        setItem(key, value) {
          store.set(key, String(value));
        },
        removeItem(key) {
          store.delete(key);
        }
      };
    }
  }

  function updateThemeMeta(theme) {
    if (themeMeta) {
      themeMeta.content = theme === 'dark' ? darkThemeColor : lightThemeColor;
    }
  }

  function applyTheme(theme, persist = false) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    html.dataset.theme = nextTheme;
    html.style.colorScheme = nextTheme;
    updateThemeMeta(nextTheme);

    if (themeToggle) {
      const isDark = nextTheme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Enable light theme' : 'Enable dark theme');
    }

    if (persist) {
      storage.setItem(themeStorageKey, nextTheme);
    }
  }

  function resolveInitialTheme() {
    const storedTheme = storage.getItem(themeStorageKey);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }

    return prefersDark.matches ? 'dark' : 'light';
  }

  function updateProgressBar() {
    if (!progressBar) {
      return;
    }

    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress)).toFixed(3)}%`;
  }

  function requestProgressUpdate() {
    if (scrollFrame) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      updateProgressBar();
    });
  }

  applyTheme(resolveInitialTheme());
  updateProgressBar();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  prefersDark.addEventListener('change', () => {
    if (storage.getItem(themeStorageKey)) {
      return;
    }

    applyTheme(prefersDark.matches ? 'dark' : 'light');
  });

  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate);
  window.addEventListener('load', requestProgressUpdate);

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      nav.dataset.open = String(!isOpen);
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) {
        return;
      }

      if (window.matchMedia('(max-width: 780px)').matches) {
        nav.dataset.open = 'false';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (gameRoot && window.SnakeGame) {
    const game = new window.SnakeGame(gameRoot);
    window.__portfolioSnakeGame = game;
  }
});
