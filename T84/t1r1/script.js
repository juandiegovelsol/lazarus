// Get the board elements for player 1
const player1Board = document.getElementById("player1-board");
const player1Shots = document.getElementById("player1-shots");

// Get the board elements for player 2
const player2Board = document.getElementById("player2-board");
const player2Shots = document.getElementById("player2-shots");

// Get the message element to display game status
const message = document.getElementById("message");

// Initialize game variables
let currentPlayer = 1;
let player1Ships = 3;
let player2Ships = 3;
let gameBoard1 = Array(100).fill(0);
let gameBoard2 = Array(100).fill(0);
let player1ShotBoard = Array(100).fill(0);
let player2ShotBoard = Array(100).fill(0);
let gameOver = false;

// Function to create a game board
function createBoard(boardElement, shotBoard = false) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;

    if (shotBoard && !gameOver) {
      cell.addEventListener("click", () => {
        if (boardElement === player1Shots && currentPlayer === 1) {
          handleShotClick(player1Shots, gameBoard2, i);
        } else if (boardElement === player2Shots && currentPlayer === 2) {
          handleShotClick(player2Shots, gameBoard1, i);
        }
      });
    }
    boardElement.appendChild(cell);
  }
}

// Function to place ships randomly on the board (ships of size 3, 2, and 1)
function placeShips(gameBoard) {
  function isValidPosition(size, row, col, direction) {
    if (direction === "h") {
      if (col + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (gameBoard[row * 10 + col + i] !== 0) return false;
      }
    } else {
      if (row + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (gameBoard[(row + i) * 10 + col] !== 0) return false;
      }
    }
    return true;
  }

  function placeShip(size, row, col, direction) {
    if (direction === "h") {
      for (let i = 0; i < size; i++) {
        gameBoard[row * 10 + col + i] = 1;
      }
    } else {
      for (let i = 0; i < size; i++) {
        gameBoard[(row + i) * 10 + col] = 1;
      }
    }
  }

  let shipSizes = [3, 2, 1];
  for (let size of shipSizes) {
    let placed = false;
    while (!placed) {
      let direction = Math.random() < 0.5 ? "h" : "v";
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      if (isValidPosition(size, row, col, direction)) {
        placeShip(size, row, col, direction);
        placed = true;
      }
    }
  }
}

// Function to handle clicks on the shot board
function handleShotClick(boardElement, opponentGameBoard, i) {
  if (gameOver) return;

  let shotBoard = currentPlayer === 1 ? player1ShotBoard : player2ShotBoard;
  let opponentBoard = currentPlayer === 1 ? player2Board : player1Board;

  if (shotBoard[i] === 0) {
    if (opponentGameBoard[i] === 1) {
      opponentGameBoard[i] = 3;
      shotBoard[i] = 3;
      boardElement.children[i].classList.add("hit");
      opponentBoard.children[i].classList.add("hit");

      if (currentPlayer === 1) {
        let shipCount = 0;
        for (let j = 0; j < 100; j++) {
          if (opponentGameBoard[j] === 1) shipCount++;
        }
        player2Ships = shipCount === 0 ? 0 : player2Ships;
        message.textContent = "Player 1 hit!";
        if (player2Ships === 0) {
          message.textContent = "Player 1 wins!";
          gameOver = true;
        }
      } else {
        let shipCount = 0;
        for (let j = 0; j < 100; j++) {
          if (opponentGameBoard[j] === 1) shipCount++;
        }
        player1Ships = shipCount === 0 ? 0 : player1Ships;
        message.textContent = "Player 2 hit!";
        if (player1Ships === 0) {
          message.textContent = "Player 2 wins!";
          gameOver = true;
        }
      }
    } else {
      opponentGameBoard[i] = 2;
      shotBoard[i] = 2;
      boardElement.children[i].classList.add("miss");
      opponentBoard.children[i].classList.add("miss");
      message.textContent = `Player ${currentPlayer} missed!`;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}

// Function to update the visual representation of the boards
function updateBoards() {
  for (let i = 0; i < 100; i++) {
    if (gameBoard1[i] === 1) {
      player1Board.children[i].classList.add("ship");
    }
    if (gameBoard2[i] === 1) {
      player2Board.children[i].classList.add("ship");
    }
  }
}

// Create the game boards
createBoard(player1Board);
createBoard(player2Board);
createBoard(player1Shots, true);
createBoard(player2Shots, true);

// Place ships on the boards
placeShips(gameBoard1);
placeShips(gameBoard2);

// Update the boards to visually show the ships
updateBoards();
