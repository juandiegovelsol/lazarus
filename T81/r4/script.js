// Select the board and game info elements
const board = document.getElementById("board");
const roundInfo = document.getElementById("round-info");
const scoreInfo = document.getElementById("score-info");
const gamesToWinInput = document.getElementById("games-to-win");
const startGameButton = document.getElementById("start-game");

// Initialize game state
let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameActive = false;
let currentRound = 0;
let gamesToWin = 0;
let playerXScores = 0;
let playerOScores = 0;

// Function to start a new game
function startGame() {
  // Get the number of games to win from the input field
  gamesToWin = parseInt(gamesToWinInput.value);

  if (gamesToWin > 0) {
    // Reset the game state
    currentPlayer = "X";
    gameBoard = Array(9).fill("");
    gameActive = true;
    currentRound = 1;
    playerXScores = 0;
    playerOScores = 0;

    // Update the game info display
    roundInfo.textContent = `Round: ${currentRound}`;
    scoreInfo.textContent = `X: ${playerXScores}/${gamesToWin} O: ${playerOScores}/${gamesToWin}`;

    // Clear the board
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    // Add event listeners to each cell for click events
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  } else {
    alert("Please enter a positive number of games to win.");
  }
}

// Function to handle cell click event
function handleCellClick(event) {
  const cellId = parseInt(event.target.id);

  if (gameBoard[cellId] === "" && gameActive) {
    gameBoard[cellId] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      // Update the scores
      if (currentPlayer === "X") {
        playerXScores++;
      } else {
        playerOScores++;
      }

      // Update the game info display
      scoreInfo.textContent = `X: ${playerXScores}/${gamesToWin} O: ${playerOScores}/${gamesToWin}`;

      // Check if the game is over
      if (playerXScores === gamesToWin || playerOScores === gamesToWin) {
        alert(`Player ${currentPlayer} wins the game!`);
        gameActive = false;
      } else {
        // Start a new round
        alert(`Player ${currentPlayer} wins this round!`);
        startNewRound();
      }
    }

    if (checkDraw()) {
      alert("It's a draw!");
      startNewRound();
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to start a new round
function startNewRound() {
  // Reset the game board
  gameBoard = Array(9).fill("");

  // Clear the board
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  // Update the round number
  currentRound++;
  roundInfo.textContent = `Round: ${currentRound}`;
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

// Add event listener to the start game button
startGameButton.addEventListener("click", startGame);
