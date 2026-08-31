const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restart-btn');
const resetStatsBtn = document.querySelector('#reset-stats-btn');

const scoreXText = document.querySelector('#score-x');
const scoreOText = document.querySelector('#score-o');
const scoreTiesText = document.querySelector('#score-ties');

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
  [0, 4, 8], [2, 4, 6]             // Diagonales
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

let scoreX = 0;
let scoreO = 0;
let ties = 0;

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  
  if (resetStatsBtn) {
    resetStatsBtn.addEventListener('click', resetStats);
  }
  
  updateStatusDisplay();
}

function cellClicked() {
  const cellIndex = this.getAttribute('data-index');

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  updateStatusDisplay();
}

function updateStatusDisplay() {
  const colorClass = currentPlayer === "X" ? "neon-x" : "neon-o";
  statusText.innerHTML = `TURNO DE: <span id="current-player" class="${colorClass}">${currentPlayer}</span>`;
}

function checkWinner() {
  let roundWon = false;
  let winningCondition = null;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      winningCondition = condition;
      break;
    }
  }

  if (roundWon) {
    const colorClass = currentPlayer === "X" ? "neon-x" : "neon-o";
    statusText.innerHTML = `¡JUGADOR <span class="${colorClass}">${currentPlayer}</span> GANA!`;
    running = false;

    // Resaltar celdas ganadoras
    winningCondition.forEach(index => {
      cells[index].classList.add('winner-cell');
    });

    // Actualizar marcadores
    if (currentPlayer === "X") {
      scoreX++;
      scoreXText.textContent = scoreX;
    } else {
      scoreO++;
      scoreOText.textContent = scoreO;
    }
  } else if (!options.includes("")) {
    statusText.textContent = `¡EMPATE!`;
    ties++;
    scoreTiesText.textContent = ties;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  updateStatusDisplay();
  
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winner-cell');
  });
  
  running = true;
}

function resetStats() {
  scoreX = 0;
  scoreO = 0;
  ties = 0;
  scoreXText.textContent = scoreX;
  scoreOText.textContent = scoreO;
  scoreTiesText.textContent = ties;
  restartGame();
}