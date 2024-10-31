// Initialize game variables
let currentPlayer = "red";
let gameBoard = [];
let winner = null;

// Create game board
for (let i = 0; i < 7; i++) {
  gameBoard[i] = [];
  for (let j = 0; j < 6; j++) {
    gameBoard[i][j] = null;
  }
}

// Generate game board HTML
const gameBoardElement = document.querySelector(".game-board");
for (let i = 0; i < 7; i++) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("column");
  columnElement.dataset.columnIndex = i;
  for (let j = 0; j < 6; j++) {
    const slotElement = document.createElement("div");
    slotElement.classList.add("slot");
    columnElement.appendChild(slotElement);
  }
  gameBoardElement.appendChild(columnElement);
}

// Add event listeners to columns
const columns = document.querySelectorAll(".column");
columns.forEach((column) => {
  column.addEventListener("click", handleColumnClick);
});

// Add event listener to reset button
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);

// Handle column click
function handleColumnClick(event) {
  const columnIndex = parseInt(
    event.target.closest(".column").dataset.columnIndex
  );
  const column = gameBoard[columnIndex];
  for (let i = column.length - 1; i >= 0; i--) {
    if (column[i] === null) {
      column[i] = currentPlayer;
      updateGameBoard();
      checkForWinner();
      switchPlayer();
      return;
    }
  }
  alert("Column is full. Please choose another column.");
}

// Update game board
function updateGameBoard() {
  const slotElements = document.querySelectorAll(".slot");
  let slotIndex = 0;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      const slotElement = slotElements[slotIndex];
      if (gameBoard[i][j] === "red") {
        slotElement.classList.add("red");
        slotElement.classList.remove("blue");
      } else if (gameBoard[i][j] === "blue") {
        slotElement.classList.add("blue");
        slotElement.classList.remove("red");
      } else {
        slotElement.classList.remove("red", "blue");
      }
      slotIndex++;
    }
  }
}

// Check for winner
function checkForWinner() {
  // Check horizontal
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        gameBoard[j][i] !== null &&
        gameBoard[j][i] === gameBoard[j + 1][i] &&
        gameBoard[j][i] === gameBoard[j + 2][i] &&
        gameBoard[j][i] === gameBoard[j + 3][i]
      ) {
        winner = gameBoard[j][i];
        return;
      }
    }
  }

  // Check vertical
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        gameBoard[i][j] !== null &&
        gameBoard[i][j] === gameBoard[i][j + 1] &&
        gameBoard[i][j] === gameBoard[i][j + 2] &&
        gameBoard[i][j] === gameBoard[i][j + 3]
      ) {
        winner = gameBoard[i][j];
        return;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        gameBoard[i][j] !== null &&
        gameBoard[i][j] === gameBoard[i + 1][j + 1] &&
        gameBoard[i][j] === gameBoard[i + 2][j + 2] &&
        gameBoard[i][j] === gameBoard[i + 3][j + 3]
      ) {
        winner = gameBoard[i][j];
        return;
      }
    }
  }

  // Check diagonal (bottom-left to top-right)
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j < 6; j++) {
      if (
        gameBoard[i][j] !== null &&
        gameBoard[i][j] === gameBoard[i + 1][j - 1] &&
        gameBoard[i][j] === gameBoard[i + 2][j - 2] &&
        gameBoard[i][j] === gameBoard[i + 3][j - 3]
      ) {
        winner = gameBoard[i][j];
        return;
      }
    }
  }

  // Check if game is a draw
  let isDraw = true;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      if (gameBoard[i][j] === null) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) {
      break;
    }
  }
  if (isDraw) {
    alert("Game is a draw!");
    resetGame();
  }
}

// Switch player
function switchPlayer() {
  if (currentPlayer === "red") {
    currentPlayer = "blue";
  } else {
    currentPlayer = "red";
  }
}

// Reset game
function resetGame() {
  currentPlayer = "red";
  winner = null;
  gameBoard = [];
  for (let i = 0; i < 7; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 6; j++) {
      gameBoard[i][j] = null;
    }
  }
  updateGameBoard();
}
