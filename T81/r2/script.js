// Select the board element
const board = document.getElementById("board");

// Initialize game state
let currentPlayer = "X";
let gameBoard = Array(9).fill(""); // Use Array.fill() to create an array of empty strings
let gameActive = true;

// Function to create a cell element
function createCell(id) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = id;
  cell.addEventListener("click", handleCellClick);
  return cell;
}

// Create and append cell elements to the board
for (let i = 0; i < 9; i++) {
  board.appendChild(createCell(i));
}

// Function to handle cell click event
function handleCellClick(event) {
  const cellId = parseInt(event.target.id);

  if (gameBoard[cellId] === "" && gameActive) {
    gameBoard[cellId] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`); // Use template literals for string interpolation
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      alert("It's a draw!");
      gameActive = false;
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
