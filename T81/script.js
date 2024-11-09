const board = document.getElementById("board");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = i;
  cell.addEventListener("click", handleCellClick);
  board.appendChild(cell);
}

function handleCellClick(event) {
  const cellId = parseInt(event.target.id);

  if (gameBoard[cellId] === "" && gameActive) {
    gameBoard[cellId] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      alert("Player " + currentPlayer + " wins!");
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

function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}
