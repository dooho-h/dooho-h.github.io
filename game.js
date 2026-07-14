'use strict';

(function () {
  const STORAGE_KEY = 'dooho-h-snake-high-score';
  const GRID_SIZE = 20;
  const CELL_COLOR = '#63f1aa';
  const HEAD_COLOR = '#f8ff7a';
  const FOOD_COLOR = '#ff7d6a';
  const BODY_COLOR = '#2fcf8b';
  const GRID_LINE = 'rgba(255,255,255,0.08)';
  const BG_COLOR = '#09111d';

  function createStorageFallback() {
    const store = new Map();
    return {
      getItem(key) {
        return store.has(key) ? store.get(key) : null;
      },
      setItem(key, value) {
        store.set(key, String(value));
      }
    };
  }

  function getStorage() {
    try {
      const probe = window.localStorage;
      const key = '__portfolio_probe__';
      probe.setItem(key, '1');
      probe.removeItem(key);
      return probe;
    } catch {
      return createStorageFallback();
    }
  }

  class SnakeGame {
    constructor(root) {
      this.root = root;
      this.board = root.querySelector('[data-game-board]');
      this.stage = root.querySelector('[data-game-stage]');
      this.overlay = root.querySelector('[data-game-overlay]');
      this.message = root.querySelector('[data-game-message]');
      this.scoreNode = root.querySelector('[data-score]');
      this.highScoreNode = root.querySelector('[data-high-score]');
      this.stateNode = root.querySelector('[data-game-state]');
      this.startButton = root.querySelector('[data-action="start"]');
      this.pauseButton = root.querySelector('[data-action="pause"]');
      this.restartButton = root.querySelector('[data-action="restart"]');
      this.section = root.closest('#games') || document;
      this.directionButtons = [...this.section.querySelectorAll('[data-direction]')];
      this.ctx = this.board.getContext('2d');
      this.storage = getStorage();
      this.resizeObserver = null;
      this.loopTimer = null;
      this.isVisible = true;
      this.gameState = 'idle';
      this.direction = { x: 1, y: 0 };
      this.nextDirection = { x: 1, y: 0 };
      this.snake = [];
      this.food = null;
      this.score = 0;
      this.highScore = this.readHighScore();
      this.boardSize = 0;
      this.pointerStart = null;
      this.initialized = false;

      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
      this.handleWindowResize = this.handleWindowResize.bind(this);
      this.handlePointerDown = this.handlePointerDown.bind(this);
      this.handlePointerUp = this.handlePointerUp.bind(this);
      this.handlePointerCancel = this.handlePointerCancel.bind(this);
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);
      this.handleTouchCancel = this.handleTouchCancel.bind(this);

      this.bindEvents();
      this.reset(true);
      this.syncBoardSize();
      this.render();
      this.updateHud();
      this.initialized = true;
    }

    bindEvents() {
      this.startButton?.addEventListener('click', () => this.start());
      this.pauseButton?.addEventListener('click', () => this.togglePause());
      this.restartButton?.addEventListener('click', () => this.restart());

      this.directionButtons.forEach((button) => {
        button.addEventListener('click', () => {
          this.changeDirection(button.dataset.direction, true);
        });
      });

      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      window.addEventListener('resize', this.handleWindowResize);
      this.board.addEventListener('pointerdown', this.handlePointerDown);
      this.board.addEventListener('pointerup', this.handlePointerUp);
      this.board.addEventListener('pointercancel', this.handlePointerCancel);
      this.board.addEventListener('pointerleave', this.handlePointerCancel);
      this.board.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      this.board.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      this.board.addEventListener('touchcancel', this.handleTouchCancel, { passive: true });
      this.root.addEventListener('focusin', () => {
        this.root.classList.add('is-focused');
      });
      this.root.addEventListener('focusout', (event) => {
        if (!this.root.contains(event.relatedTarget)) {
          this.root.classList.remove('is-focused');
        }
      });

      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => {
          this.syncBoardSize();
          this.render();
        });
        this.resizeObserver.observe(this.stage);
      }
    }

    readHighScore() {
      const raw = this.storage.getItem(STORAGE_KEY);
      const value = Number.parseInt(raw || '0', 10);
      return Number.isFinite(value) ? value : 0;
    }

    writeHighScore(value) {
      this.highScore = value;
      try {
        this.storage.setItem(STORAGE_KEY, String(value));
      } catch {
        /* storage fallback already covers this */
      }
    }

    reset(preserveHighScore = true) {
      this.clearLoop();
      this.gameState = 'idle';
      this.score = 0;
      this.direction = { x: 1, y: 0 };
      this.nextDirection = { x: 1, y: 0 };
      this.snake = [
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 }
      ];
      this.food = this.spawnFood();
      if (!preserveHighScore) {
        this.writeHighScore(0);
      }
      this.updateHud();
      this.updateOverlay('Ready to play', 'Start the game with the button or use arrow keys / WASD while the game panel is focused.');
    }

    start() {
      if (this.gameState === 'running') {
        return;
      }

      if (this.gameState === 'idle' || this.gameState === 'gameover') {
        if (this.gameState === 'gameover') {
          this.reset(true);
        }
      }

      this.gameState = 'running';
      this.clearLoop();
      this.updateHud();
      this.updateOverlay('Playing', 'Collect food, grow, and avoid the walls and your own body.');
      this.scheduleNextTick();
      this.render();
    }

    togglePause() {
      if (this.gameState === 'running') {
        this.pause();
        return;
      }

      if (this.gameState === 'paused') {
        this.resume();
        return;
      }

      if (this.gameState === 'idle') {
        this.start();
        return;
      }

      if (this.gameState === 'gameover') {
        this.start();
      }
    }

    pause() {
      if (this.gameState !== 'running') {
        return;
      }

      this.gameState = 'paused';
      this.clearLoop();
      this.updateHud();
      this.updateOverlay('Paused', 'Resume with the Pause button, Space, or P.');
      this.render();
    }

    resume() {
      if (this.gameState !== 'paused') {
        return;
      }

      this.gameState = 'running';
      this.updateHud();
      this.updateOverlay('Playing', 'Collect food, grow, and avoid the walls and your own body.');
      this.scheduleNextTick();
      this.render();
    }

    restart() {
      this.reset(true);
      this.start();
    }

    gameOver(reason) {
      this.gameState = 'gameover';
      this.clearLoop();
      if (this.score > this.highScore) {
        this.writeHighScore(this.score);
      }
      this.updateHud();
      this.updateOverlay('Game over', reason || 'Hit Restart to try again.');
      this.render();
    }

    scheduleNextTick() {
      this.clearLoop();
      if (this.gameState !== 'running') {
        return;
      }

      this.loopTimer = window.setTimeout(() => {
        this.loopTimer = null;
        this.step();
      }, this.getTickDelay());
    }

    clearLoop() {
      if (this.loopTimer !== null) {
        window.clearTimeout(this.loopTimer);
        this.loopTimer = null;
      }
    }

    getTickDelay() {
      return Math.max(72, 150 - Math.floor(this.score / 3) * 4);
    }

    setDirection(direction, fromInput = false) {
      if (!direction) {
        return;
      }

      const next = this.normalizeDirection(direction);
      if (!next) {
        return;
      }

      if (this.isOpposite(next, this.direction) || this.isOpposite(next, this.nextDirection)) {
        return;
      }

      this.nextDirection = next;
      if (this.gameState === 'idle' && fromInput) {
        this.start();
      }

      if (this.gameState === 'paused' && fromInput) {
        this.updateOverlay('Paused', 'Resume with the Pause button, Space, or P.');
      }
    }

    changeDirection(direction, fromInput = false) {
      this.setDirection(direction, fromInput);
    }

    normalizeDirection(direction) {
      if (typeof direction === 'string') {
        switch (direction.toLowerCase()) {
          case 'up':
            return { x: 0, y: -1 };
          case 'down':
            return { x: 0, y: 1 };
          case 'left':
            return { x: -1, y: 0 };
          case 'right':
            return { x: 1, y: 0 };
          default:
            return null;
        }
      }

      if (typeof direction === 'object' && direction) {
        return { x: Math.sign(direction.x) || 0, y: Math.sign(direction.y) || 0 };
      }

      return null;
    }

    isOpposite(a, b) {
      return a.x === -b.x && a.y === -b.y;
    }

    spawnFood() {
      const occupied = new Set(this.snake.map((segment) => `${segment.x},${segment.y}`));
      const free = [];

      for (let y = 0; y < GRID_SIZE; y += 1) {
        for (let x = 0; x < GRID_SIZE; x += 1) {
          const key = `${x},${y}`;
          if (!occupied.has(key)) {
            free.push({ x, y });
          }
        }
      }

      if (free.length === 0) {
        return null;
      }

      return free[Math.floor(Math.random() * free.length)];
    }

    step() {
      if (this.gameState !== 'running') {
        return;
      }

      this.direction = { ...this.nextDirection };
      const head = this.snake[0];
      const nextHead = {
        x: head.x + this.direction.x,
        y: head.y + this.direction.y
      };

      if (nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE) {
        this.gameOver('Wall collision.');
        return;
      }

      const willEat = Boolean(this.food && nextHead.x === this.food.x && nextHead.y === this.food.y);
      const bodyToCheck = willEat ? this.snake : this.snake.slice(0, -1);
      if (bodyToCheck.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)) {
        this.gameOver('Self collision.');
        return;
      }

      this.snake.unshift(nextHead);
      if (willEat) {
        this.score += 1;
        this.food = this.spawnFood();
        if (this.score > this.highScore) {
          this.writeHighScore(this.score);
        }
        this.updateHud();
        if (!this.food) {
          this.gameOver('You filled the board.');
          return;
        }
      } else {
        this.snake.pop();
      }

      this.render();
      this.scheduleNextTick();
    }

    updateHud() {
      this.scoreNode.textContent = String(this.score);
      this.highScoreNode.textContent = String(this.highScore);
      this.stateNode.textContent = this.getStateLabel();
      this.pauseButton.textContent = this.gameState === 'paused' ? 'Resume' : 'Pause';
    }

    getStateLabel() {
      switch (this.gameState) {
        case 'running':
          return 'Playing';
        case 'paused':
          return 'Paused';
        case 'gameover':
          return 'Game over';
        default:
          return 'Idle';
      }
    }

    updateOverlay(title, message) {
      this.overlay.querySelector('.overlay-title').textContent = title;
      this.message.textContent = message;
      const shouldHide = this.gameState === 'running';
      this.overlay.classList.toggle('is-hidden', shouldHide);
    }

    syncBoardSize() {
      const rect = this.stage.getBoundingClientRect();
      const size = Math.floor(Math.min(rect.width, rect.height));
      if (!size || Number.isNaN(size) || size === this.boardSize) {
        return;
      }

      this.boardSize = size;
      const dpr = window.devicePixelRatio || 1;
      this.board.width = Math.round(size * dpr);
      this.board.height = Math.round(size * dpr);
      this.board.style.width = `${size}px`;
      this.board.style.height = `${size}px`;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.render();
    }

    logicalCellSize() {
      return this.boardSize / GRID_SIZE;
    }

    render() {
      if (!this.boardSize) {
        this.syncBoardSize();
      }

      const size = this.boardSize;
      if (!size) {
        return;
      }

      const cell = this.logicalCellSize();
      const ctx = this.ctx;

      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, size, size);

      this.drawGrid(ctx, size, cell);
      this.drawFood(ctx, cell);
      this.drawSnake(ctx, cell);

      if (this.gameState !== 'running') {
        this.drawStateLabel(ctx, size);
      }
    }

    drawGrid(ctx, size, cell) {
      ctx.strokeStyle = GRID_LINE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < GRID_SIZE; i += 1) {
        const position = Math.round(i * cell) + 0.5;
        ctx.moveTo(position, 0);
        ctx.lineTo(position, size);
        ctx.moveTo(0, position);
        ctx.lineTo(size, position);
      }
      ctx.stroke();
    }

    drawSnake(ctx, cell) {
      const segments = this.snake;
      segments.forEach((segment, index) => {
        const padding = index === 0 ? cell * 0.1 : cell * 0.16;
        const x = segment.x * cell + padding;
        const y = segment.y * cell + padding;
        const size = cell - padding * 2;
        ctx.fillStyle = index === 0 ? HEAD_COLOR : BODY_COLOR;
        this.roundRect(ctx, x, y, size, size, Math.max(4, size * 0.25));
        ctx.fill();
      });
    }

    drawFood(ctx, cell) {
      if (!this.food) {
        return;
      }

      const padding = cell * 0.18;
      const size = cell - padding * 2;
      ctx.fillStyle = FOOD_COLOR;
      this.roundRect(ctx, this.food.x * cell + padding, this.food.y * cell + padding, size, size, Math.max(4, size * 0.3));
      ctx.fill();
    }

    drawStateLabel(ctx, size) {
      ctx.save();
      ctx.fillStyle = 'rgba(8, 17, 28, 0.35)';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 28px Georgia, Times New Roman, serif';
      ctx.fillText(this.getStateLabel(), size / 2, size / 2 - 16);
      ctx.font = '500 16px Avenir Next, Trebuchet MS, sans-serif';
      const message = this.gameState === 'paused'
        ? 'Use Resume to continue.'
        : this.gameState === 'gameover'
          ? 'Hit Restart to play again.'
          : 'Press Start.';
      ctx.fillText(message, size / 2, size / 2 + 18);
      ctx.restore();
    }

    roundRect(ctx, x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + height, r);
      ctx.arcTo(x + width, y + height, x, y + height, r);
      ctx.arcTo(x, y + height, x, y, r);
      ctx.arcTo(x, y, x + width, y, r);
      ctx.closePath();
    }

    handleKeyDown(event) {
      const key = event.key.toLowerCase();
      const captures = this.gameState !== 'idle' || this.root.contains(document.activeElement) || document.activeElement === this.board;
      const keyMap = {
        arrowup: 'up',
        w: 'up',
        arrowdown: 'down',
        s: 'down',
        arrowleft: 'left',
        a: 'left',
        arrowright: 'right',
        d: 'right'
      };

      if (key in keyMap) {
        if (captures) {
          event.preventDefault();
          this.changeDirection(keyMap[key], true);
        }
        return;
      }

      if (!captures) {
        return;
      }

      if (key === ' ' || key === 'spacebar' || key === 'p') {
        event.preventDefault();
        this.togglePause();
        return;
      }

      if (key === 'enter') {
        event.preventDefault();
        if (this.gameState === 'idle' || this.gameState === 'gameover') {
          this.start();
        }
      }
    }

    handleVisibilityChange() {
      if (document.hidden && this.gameState === 'running') {
        this.pause();
      }
    }

    handleWindowResize() {
      this.syncBoardSize();
    }

    handlePointerDown(event) {
      this.pointerStart = { x: event.clientX, y: event.clientY };
      this.root.focus({ preventScroll: true });
      try {
        this.board.setPointerCapture(event.pointerId);
      } catch {
        /* optional */
      }
    }

    handlePointerUp(event) {
      if (!this.pointerStart) {
        return;
      }

      const dx = event.clientX - this.pointerStart.x;
      const dy = event.clientY - this.pointerStart.y;
      const distance = Math.hypot(dx, dy);
      this.pointerStart = null;

      if (distance < 24) {
        return;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        this.changeDirection(dx > 0 ? 'right' : 'left', true);
      } else {
        this.changeDirection(dy > 0 ? 'down' : 'up', true);
      }
    }

    handlePointerCancel() {
      this.pointerStart = null;
    }

    handleTouchStart(event) {
      const touch = event.touches && event.touches[0];
      if (!touch) {
        return;
      }

      this.pointerStart = { x: touch.clientX, y: touch.clientY };
      this.root.focus({ preventScroll: true });
    }

    handleTouchEnd(event) {
      const touch = event.changedTouches && event.changedTouches[0];
      if (!this.pointerStart || !touch) {
        this.pointerStart = null;
        return;
      }

      const dx = touch.clientX - this.pointerStart.x;
      const dy = touch.clientY - this.pointerStart.y;
      const distance = Math.hypot(dx, dy);
      this.pointerStart = null;

      if (distance < 24) {
        return;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        this.changeDirection(dx > 0 ? 'right' : 'left', true);
      } else {
        this.changeDirection(dy > 0 ? 'down' : 'up', true);
      }
    }

    handleTouchCancel() {
      this.pointerStart = null;
    }
  }

  window.SnakeGame = SnakeGame;
})();
