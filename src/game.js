export class SnakeGame {
  constructor(canvas, scoreElement, finalScoreElement, gameOverElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scoreElement = scoreElement;
    this.finalScoreElement = finalScoreElement;
    this.gameOverElement = gameOverElement;
    
    this.gridSize = 20;
    this.tileCount = canvas.width / this.gridSize;
    
    this.init();
    this.setupControls();
  }

  init() {
    this.snake = [{ x: 10, y: 10 }];
    this.food = { x: 5, y: 5 };
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.gameOver = false;
    this.scoreElement.textContent = '0';
    this.gameOverElement.style.display = 'none';
    this.generateFood();
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp':
          if (this.dy === 0) { this.dx = 0; this.dy = -1; }
          break;
        case 'ArrowDown':
          if (this.dy === 0) { this.dx = 0; this.dy = 1; }
          break;
        case 'ArrowLeft':
          if (this.dx === 0) { this.dx = -1; this.dy = 0; }
          break;
        case 'ArrowRight':
          if (this.dx === 0) { this.dx = 1; this.dy = 0; }
          break;
      }
    });
  }

  generateFood() {
    this.food = {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of this.snake) {
      if (this.food.x === segment.x && this.food.y === segment.y) {
        this.generateFood();
        break;
      }
    }
  }

  draw() {
    if (this.gameOver) return;

    // Move snake
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    
    // Check collision with walls
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.endGame();
      return;
    }

    // Check collision with self
    for (let i = 0; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.endGame();
        return;
      }
    }

    this.snake.unshift(head);

    // Check if food is eaten
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.scoreElement.textContent = this.score;
      this.generateFood();
    } else {
      this.snake.pop();
    }

    // Clear canvas
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw snake
    this.ctx.fillStyle = '#646cff';
    this.snake.forEach(segment => {
      this.ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });

    // Draw food
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize - 2,
      this.gridSize - 2
    );

    setTimeout(() => this.draw(), 100);
  }

  endGame() {
    this.gameOver = true;
    this.finalScoreElement.textContent = this.score;
    this.gameOverElement.style.display = 'block';
  }

  reset() {
    this.init();
    this.draw();
  }

  start() {
    this.draw();
  }
}