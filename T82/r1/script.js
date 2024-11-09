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
let player1ShotBoard = Array(100).fill(0);
let player2ShotBoard = Array(100).fill(0);

function createBoard(boardElement, gameBoard, shotBoard = false) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    if (shotBoard) {
      cell.addEventListener("click", () =>
        handleShotClick(boardElement, gameBoard, i)
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

function handleShotClick(boardElement, opponentGameBoard, i) {
  if (currentPlayer === 1) {
    if (player1ShotBoard[i] === 0) {
      if (opponentGameBoard[i] === 1) {
        opponentGameBoard[i] = 3;
        player1ShotBoard[i] = 3;
        boardElement.children[i].classList.add("hit");
        player2Board.children[i].classList.add("hit");
        player2Ships--;
        message.textContent = "Player 1 hit!";
        if (player2Ships === 0) {
          message.textContent = "Player 1 wins!";
        }
      } else {
        opponentGameBoard[i] = 2;
        player1ShotBoard[i] = 2;
        boardElement.children[i].classList.add("miss");
        player2Board.children[i].classList.add("miss");
        message.textContent = "Player 1 missed!";
      }
      currentPlayer = 2;
    }
  } else {
    if (player2ShotBoard[i] === 0) {
      if (opponentGameBoard[i] === 1) {
        opponentGameBoard[i] = 3;
        player2ShotBoard[i] = 3;
        boardElement.children[i].classList.add("hit");
        player1Board.children[i].classList.add("hit");
        player1Ships--;
        message.textContent = "Player 2 hit!";
        if (player1Ships === 0) {
          message.textContent = "Player 2 wins!";
        }
      } else {
        opponentGameBoard[i] = 2;
        player2ShotBoard[i] = 2;
        boardElement.children[i].classList.add("miss");
        player1Board.children[i].classList.add("miss");
        message.textContent = "Player 2 missed!";
      }
      currentPlayer = 1;
    }
  }
}

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

createBoard(player1Board, gameBoard1);
createBoard(player2Board, gameBoard2);
createBoard(player1Shots, gameBoard2, true);
createBoard(player2Shots, gameBoard1, true);

placeShips(gameBoard1);
placeShips(gameBoard2);

updateBoards();
