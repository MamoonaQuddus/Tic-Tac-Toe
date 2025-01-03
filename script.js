// board: Dynamically manipulates the grid (game board) structure and content.

const board = document.getElementById('board');

// statusText: Displays game progress and results to the players

const statusText = document.getElementById('status');

// resetButton: Provides a mechanism for players to restart the game.

const resetButton = document.getElementById('reset');


// This variable keeps track of whose turn it is in the game.
// Default value:
// 'X', because player X always starts first.

let currentPlayer = 'X';

// Each index corresponds to a cell on the 3x3 grid.
// An array of empty strings (''), indicating that all cells are initially empty.
// When a player clicks a cell, the value of currentPlayer is stored in the corresponding index of this array.
// The array is checked after every move to:
// Determine if a player has won.
// Check if the game is a draw.
// Update the board's visual representation.

let gameState = ['', '', '', '', '', '', '', '', ''];

// This variable indicates whether the game is still in progress or has ended.

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
