const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize the board
function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.dataset.index = index;
    cellDiv.addEventListener('click', handleCellClick);
    board.appendChild(cellDiv);
  });
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameState[index] !== '' || !isGameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (gameState.every(cell => cell !== '')) {
    statusText.textContent = `It's a draw!`;
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a win or draw
function checkWin() {
  return winningConditions.some(condition => 
    condition.every(index => gameState[index] === currentPlayer)
  );
}

// Reset the game
function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Player X's turn`;
  createBoard();
}

// Initialize the game
resetButton.addEventListener('click', resetGame);
createBoard();
