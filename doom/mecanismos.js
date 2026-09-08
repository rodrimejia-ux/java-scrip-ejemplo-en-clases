const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

// Configuración de la cuadrícula
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Variables de juego
let snake = [];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval;
let changingDirection = false;
let isGameOver = false;

highScoreDisplay.textContent = highScore;

// Escuchar teclado para movimiento y reinicio con Enter
document.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', resetGame);

resetGame();

function resetGame() {
  snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 }
  ];
  score = 0;
  dx = gridSize;
  dy = 0;
  isGameOver = false;
  scoreDisplay.textContent = score;
  gameOverScreen.classList.add('hidden');
  
  generateFood();
  
  clearInterval(gameInterval);
  gameInterval = setInterval(mainLoop, 100);
}

function mainLoop() {
  if (hasGameEnded()) {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
    clearInterval(gameInterval);
    return;
  }

  changingDirection = false;
  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
}

function clearCanvas() {
  ctx.fillStyle = '#080811';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? '#00f0ff' : '#00a8ff';
    ctx.shadowBlur = index === 0 ? 10 : 0;
    ctx.shadowColor = '#00f0ff';

    ctx.fillRect(part.x, part.y, gridSize - 2, gridSize - 2);
  });
  ctx.shadowBlur = 0;
}

function moveSnake() {
  let newX = snake[0].x + dx;
  let newY = snake[0].y + dy;

  // Lógica de bordes infinitos / pasarela (Warping)
  if (newX < 0) {
    newX = canvas.width - gridSize; // Sale a la derecha
  } else if (newX >= canvas.width) {
    newX = 0; // Sale a la izquierda
  }

  if (newY < 0) {
    newY = canvas.height - gridSize; // Sale abajo
  } else if (newY >= canvas.height) {
    newY = 0; // Sale arriba
  }

  const head = { x: newX, y: newY };
  snake.unshift(head);

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score += 10;
    scoreDisplay.textContent = score;

    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem('snakeHighScore', highScore);
    }

    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount) * gridSize;
  food.y = Math.floor(Math.random() * tileCount) * gridSize;

  snake.forEach(part => {
    if (part.x === food.x && part.y === food.y) {
      generateFood();
    }
  });
}

function drawFood() {
  ctx.fillStyle = '#ff007f';
  ctx.shadowBlur = 12;
  ctx.shadowColor = '#ff007f';
  ctx.fillRect(food.x, food.y, gridSize - 2, gridSize - 2);
  ctx.shadowBlur = 0;
}

function handleKeyPress(event) {
  const key = event.key.toLowerCase();

  if (key === 'enter' && isGameOver) {
    resetGame();
    return;
  }

  if (changingDirection || isGameOver) return;

  const goingUp = dy === -gridSize;
  const goingDown = dy === gridSize;
  const goingRight = dx === gridSize;
  const goingLeft = dx === -gridSize;

  if ((key === 'arrowleft' || key === 'a') && !goingRight) {
    dx = -gridSize;
    dy = 0;
    changingDirection = true;
  }
  if ((key === 'arrowup' || key === 'w') && !goingDown) {
    dx = 0;
    dy = -gridSize;
    changingDirection = true;
  }
  if ((key === 'arrowright' || key === 'd') && !goingLeft) {
    dx = gridSize;
    dy = 0;
    changingDirection = true;
  }
  if ((key === 'arrowdown' || key === 's') && !goingUp) {
    dx = 0;
    dy = gridSize;
    changingDirection = true;
  }
}

function hasGameEnded() {
  // Solo pierde si se choca contra su propio cuerpo
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}