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

function createBoard(boardElement, gameBoard) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    cell.addEventListener("click", () =>
      handleClick(boardElement, gameBoard, i)
    );
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
  if (gameBoard[i] === 0) {
    gameBoard[i] = 2;
    boardElement.children[i].classList.add("miss");
    message.textContent = `Player ${currentPlayer} missed!`;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  } else if (gameBoard[i] === 1) {
    gameBoard[i] = 3;
    boardElement.children[i].classList.add("hit");
    message.textContent = `Player ${currentPlayer} hit!`;
    if (currentPlayer === 1) {
      player2Ships--;
    } else {
      player1Ships--;
    }
    if (player1Ships === 0) {
      message.textContent = "Player 2 wins!";
    } else if (player2Ships === 0) {
      message.textContent = "Player 1 wins!";
    }
  }
}

createBoard(player1Board, gameBoard1);
createBoard(player2Board, gameBoard2);
createBoard(player1Shots, []);
createBoard(player2Shots, []);

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
