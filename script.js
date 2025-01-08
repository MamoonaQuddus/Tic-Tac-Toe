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

// It is an array containing multiple smaller arrays.
// Contents: Each smaller array represents a winning combination of indices for a Tic Tac Toe game.

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
// The createBoard function is responsible for dynamically creating the Tic Tac Toe game board in the browser. 
function createBoard() {

  // Clears any previous board content (resets the board visually).

  board.innerHTML = '';

  // The forEach method loops through each cell in the gameState array.
  // cell: The current value at that index (e.g., '', 'X', or 'O').
  // index: The position of the current cell (e.g., 0, 1, 2,...).

  gameState.forEach((cell, index) => {

  // Dynamically creates a <div> for each cell in the game board.

    const cellDiv = document.createElement('div');

    // Adds the class cell to the newly created <div>.

    cellDiv.classList.add('cell');

    // Adds a custom data-index attribute to the <div> (e.g., <div data-index="0"></div>).
    // Why?: This helps identify which cell is clicked, so we know which position in the gameState array to update.

//     The dataset property is a way to manage custom data attributes (data-*) in HTML.
// These attributes allow you to store extra information directly in the HTML element.
// data-index is a custom attribute being added to each cellDiv. It holds the value of index
// It assigns the index value (from 0 to 8) to the data-index attribute of the cell.
// cellDiv.dataset.index = 0 adds a data-index="0" attribute to the <div>
    

    cellDiv.dataset.index = index;

    // Attaches an event listener to each cell to handle clicks. 
    // What happens when clicked?:
    // When a cell is clicked, the handleCellClick function is triggered.

    cellDiv.addEventListener('click', handleCellClick);

    // Adds the newly created <div> (cell) to the <div id="board">.

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

  // some()
  // What it does: Checks if at least one condition in the winningConditions array is satisfied.
  // How it works: Loops through each condition and applies the callback function

  return winningConditions.some(condition => 

    // every()
    // What it does: Checks if all elements in the current condition array satisfy a certain condition.
    // gameState[index] is the content of the cell at the given index.
// It verifies if all cells in the current condition array are equal to currentPlayer (e.g., "X" or "O").
// If one of the conditions satisfies the win criteria, some() immediately returns true otherwise false
// The index corresponds to the position in the gameState array:
// index = 0: Refers to the first cell in gameState..

    condition.every(index => gameState[index] === currentPlayer)
  );
}

// This function resets the game to its initial state, preparing it for a new round of Tic-Tac-Toe.

// Reset the game
function resetGame() {

  // Sets all 9 cells in the gameState array to empty strings (''), which means no moves have been made.

  gameState = ['', '', '', '', '', '', '', '', ''];

  // Resets the starting player to "X".

  currentPlayer = 'X';

// Re-enables gameplay by setting isGameActive to true.
// Why it's needed: Prevents the game from being stuck in a finished state.

  isGameActive = true;

  // Updates the status message to indicate that it's Player X's turn.

  statusText.textContent = `Player X's turn`;

  // Calls the createBoard() function to redraw the board.

  createBoard();
}

// This connection between the button and the resetGame function ensures 
// that the user can reset the game anytime by simply clicking the "Reset Game" button.

// Initialize the game
resetButton.addEventListener('click', resetGame);

// Calls the createBoard() function to redraw the board.

createBoard();
