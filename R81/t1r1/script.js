let gameBoard = [];
let currentPlayer = 1;
let gameOver = false;

// Initialize game board
for (let i = 0; i < 7; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 6; j++) {
    gameBoard[i].push(0);
  }
}

// Function to drop a piece into a column
function dropPiece(column) {
  if (gameOver) return;

  for (let i = 5; i >= 0; i--) {
    if (gameBoard[column][i] === 0) {
      gameBoard[column][i] = currentPlayer;
      drawPiece(column, i);
      checkForWin();
      switchPlayer();
      return;
    }
  }

  alert("Column is full, choose another one.");
}

// Function to draw a piece on the board
function drawPiece(column, row) {
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(currentPlayer === 1 ? "red" : "blue");
  document.getElementById(`column-${column}`).appendChild(piece);
}

// Function to check for a win
function checkForWin() {
  // Check horizontal
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        gameBoard[j][i] === currentPlayer &&
        gameBoard[j + 1][i] === currentPlayer &&
        gameBoard[j + 2][i] === currentPlayer &&
        gameBoard[j + 3][i] === currentPlayer
      ) {
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
        return;
      }
    }
  }

  // Check vertical
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        gameBoard[i][j] === currentPlayer &&
        gameBoard[i][j + 1] === currentPlayer &&
        gameBoard[i][j + 2] === currentPlayer &&
        gameBoard[i][j + 3] === currentPlayer
      ) {
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
        return;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        gameBoard[i][j] === currentPlayer &&
        gameBoard[i + 1][j + 1] === currentPlayer &&
        gameBoard[i + 2][j + 2] === currentPlayer &&
        gameBoard[i + 3][j + 3] === currentPlayer
      ) {
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
        return;
      }
    }
  }

  // Check diagonal (bottom-left to top-right)
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j < 6; j++) {
      if (
        gameBoard[i][j] === currentPlayer &&
        gameBoard[i + 1][j - 1] === currentPlayer &&
        gameBoard[i + 2][j - 2] === currentPlayer &&
        gameBoard[i + 3][j - 3] === currentPlayer
      ) {
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
        return;
      }
    }
  }
}

// Function to switch player
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("turn").innerText = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to columns
for (let i = 0; i < 7; i++) {
  document.getElementById(`column-${i}`).addEventListener("click", () => {
    dropPiece(i);
  });
}

// Add event listener to reset button
document.getElementById("reset-button").addEventListener("click", () => {
  // Reset game board
  gameBoard = [];
  for (let i = 0; i < 7; i++) {
    gameBoard.push([]);
    for (let j = 0; j < 6; j++) {
      gameBoard[i].push(0);
    }
  }

  // Remove all pieces from the board
  for (let i = 0; i < 7; i++) {
    document.getElementById(`column-${i}`).innerHTML = "";
  }

  // Reset game state
  currentPlayer = 1;
  gameOver = false;
  document.getElementById("turn").innerText = `Player ${currentPlayer}'s turn`;
});
