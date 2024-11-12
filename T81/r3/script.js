// Select the board and game info elements
const board = document.getElementById("board");
const gameInfo = document.getElementById("game-info");
const roundNumberElement = document.getElementById("round-number");
const scoreElement = document.getElementById("score");
const setupElement = document.getElementById("setup");
const gamesToWinInput = document.getElementById("games-to-win");
const startGameButton = document.getElementById("start-game");

// Initialize game state
let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameActive = false;
let roundNumber = 0;
let gamesToWin = 0;
let playerXScore = 0;
let playerOScore = 0;

// Add event listener to start game button
startGameButton.addEventListener("click", startGame);

// Function to start the game
function startGame() {
  gamesToWin = parseInt(gamesToWinInput.value);
  if (gamesToWin <= 0) {
    alert("Please enter a positive number of games to win.");
    return;
  }
  setupElement.style.display = "none";
  gameActive = true;
  resetGameBoard();
  updateGameInfo();
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

// Function to handle cell click event
function handleCellClick(event) {
  const cellId = parseInt(event.target.id);

  if (gameBoard[cellId] === "" && gameActive) {
    gameBoard[cellId] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      if (currentPlayer === "X") {
        playerXScore++;
      } else {
        playerOScore++;
      }
      updateGameInfo();
      checkGameOver();
      return;
    }

    if (checkDraw()) {
      alert("It's a draw!");
      resetGameBoard();
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }

  return false;
}

// Function to check for a draw
function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}

// Function to check if the game is over
function checkGameOver() {
  if (playerXScore >= gamesToWin) {
    alert("Player X wins the game!");
    gameActive = false;
  } else if (playerOScore >= gamesToWin) {
    alert("Player O wins the game!");
    gameActive = false;
  } else {
    roundNumber++;
    resetGameBoard();
  }
}

// Function to reset the game board
function resetGameBoard() {
  currentPlayer = "X";
  gameBoard = Array(9).fill("");
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

// Function to update the game info
function updateGameInfo() {
  roundNumberElement.textContent = `Round: ${roundNumber + 1}`;
  scoreElement.textContent = `Score - X: ${playerXScore}/${gamesToWin}, O: ${playerOScore}/${gamesToWin}`;
}
