const player1Board = document.getElementById("player1-board");
const player1Shots = document.getElementById("player1-shots");
const player2Board = document.getElementById("player2-board");
const player2Shots = document.getElementById("player2-shots");
const message = document.getElementById("message");

let currentPlayer = 1;
let player1Ships = 5;
let player2Ships = 5;
let gameBoard1 = Array(100).fill(0); // 0: empty, 1: ship, 2: miss, 3: hit
let gameBoard2 = Array(100).fill(0);

// Create a separate game board for player 1 shots and player 2 shots
let gameBoard1Shots = Array(100).fill(0);
let gameBoard2Shots = Array(100).fill(0);

function createBoard(boardElement, gameBoard, clickable = true) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    if (clickable) {
      cell.addEventListener("click", () =>
        handleClick(boardElement, gameBoard, i)
      );
    }
    boardElement.appendChild(cell);
  }
}

function placeShips(gameBoard) {
  // Logic to place ships randomly (example for one ship)
  let shipPlaced = false;
  while (!shipPlaced) {
    let pos = Math.floor(Math.random() * 100);
    if (gameBoard[pos] === 0) {
      gameBoard[pos] = 1;
      shipPlaced = true;
    }
  }
}

function handleClick(boardElement, gameBoard, i) {
  // Check if the current player is shooting at their own board
  if (
    (currentPlayer === 1 && boardElement === player1Shots) ||
    (currentPlayer === 2 && boardElement === player2Shots)
  ) {
    // Update the game board and the display
    if (currentPlayer === 1) {
      if (gameBoard2[i] === 0) {
        gameBoard2[i] = 2;
        gameBoard1Shots[i] = 2;
        boardElement.children[i].classList.add("miss");
        message.textContent = `Player ${currentPlayer} missed!`;
      } else if (gameBoard2[i] === 1) {
        gameBoard2[i] = 3;
        gameBoard1Shots[i] = 3;
        boardElement.children[i].classList.add("hit");
        message.textContent = `Player ${currentPlayer} hit!`;
        player2Ships--;
        if (player2Ships === 0) {
          message.textContent = "Player 1 wins!";
        }
      }
    } else {
      if (gameBoard1[i] === 0) {
        gameBoard1[i] = 2;
        gameBoard2Shots[i] = 2;
        boardElement.children[i].classList.add("miss");
        message.textContent = `Player ${currentPlayer} missed!`;
      } else if (gameBoard1[i] === 1) {
        gameBoard1[i] = 3;
        gameBoard2Shots[i] = 3;
        boardElement.children[i].classList.add("hit");
        message.textContent = `Player ${currentPlayer} hit!`;
        player1Ships--;
        if (player1Ships === 0) {
          message.textContent = "Player 2 wins!";
        }
      }
    }
    // Switch the current player
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}

createBoard(player1Board, gameBoard1, false);
createBoard(player2Board, gameBoard2, false);
createBoard(player1Shots, gameBoard1Shots);
createBoard(player2Shots, gameBoard2Shots);

// Place ships for both players (example for one ship each)
placeShips(gameBoard1);
placeShips(gameBoard2);

// Mark ships on the players' own boards
for (let i = 0; i < 100; i++) {
  if (gameBoard1[i] === 1) {
    player1Board.children[i].classList.add("ship");
  }
  if (gameBoard2[i] === 1) {
    player2Board.children[i].classList.add("ship");
  }
}

// Update the display for player 1 shots and player 2 shots
setInterval(() => {
  for (let i = 0; i < 100; i++) {
    if (gameBoard1Shots[i] === 2) {
      player1Shots.children[i].classList.add("miss");
    } else if (gameBoard1Shots[i] === 3) {
      player1Shots.children[i].classList.add("hit");
    }
    if (gameBoard2Shots[i] === 2) {
      player2Shots.children[i].classList.add("miss");
    } else if (gameBoard2Shots[i] === 3) {
      player2Shots.children[i].classList.add("hit");
    }
  }
}, 100);
