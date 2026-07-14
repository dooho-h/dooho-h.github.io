'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const gameRoot = document.querySelector('.game-panel');

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
