let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

// Modified printBoard function to display the board correctly
function printBoard() {
  for (let row = 0; row < 3; row++) {
    let rowDisplay = "";
    for (let col = 0; col < 3; col++) {
      rowDisplay += board[row][col] === "" ? "-" : board[row][col]; // Changed board[col][row] to board[row][col]
    }
    console.log(rowDisplay);
  }
}

// Modified makeMove function to prevent inputs for cells that are already filled
function makeMove(row, col) {
  if (board[row][col] === "") {
    board[row][col] = currentPlayer;
    printBoard();
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    console.log("Cell already occupied. Please choose a different cell.");
    playerTurn();
  }
}

// Modified aiMove function to prevent AI from attempting to move to occupied cells
function aiMove() {
  let row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (board[row][col] !== "");

  board[row][col] = "O"; // Changed currentPlayer to "O" to ensure AI plays as "O"
  printBoard();
  checkWinner();
  currentPlayer = "X";
}

// Modified checkWinner function to consistently detect winning conditions
function checkWinner() {
  let win = false;

  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2] &&
      board[row][0] !== ""
    ) {
      win = true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col] &&
      board[0][col] !== ""
    ) {
      win = true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== "") ||
    (board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== "")
  ) {
    win = true;
  }

  if (win) {
    console.log(`Player ${currentPlayer === "X" ? "O" : "X"} wins!`); // Changed currentPlayer to the opposite player
    gameActive = false;
  } else {
    // Check for a draw
    let draw = true;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          draw = false;
        }
      }
    }
    if (draw) {
      console.log("It's a draw!");
      gameActive = false;
    }
  }
}

function playerTurn() {
  let row = parseInt(
    prompt(`Player ${currentPlayer}, enter row (0, 1, or 2): `)
  );
  let col = parseInt(
    prompt(`Player ${currentPlayer}, enter col (0, 1, or 2): `)
  );
  makeMove(row, col);
}

function gameLoop() {
  printBoard();
  while (gameActive) {
    if (vsAI) {
      if (currentPlayer === "X") {
        playerTurn();
      } else {
        aiMove();
      }
    } else {
      playerTurn();
    }
  }
}

function startGame() {
  let mode = prompt("Choose mode: Enter '1' for multiplayer or '2' for vs AI");
  if (mode === "2") vsAI = true;
  gameLoop();
}

startGame();
