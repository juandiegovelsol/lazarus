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
let shipPositioning = true; // Flag to indicate if we're in ship positioning mode
let shipSizes = [3, 2, 1]; // Array of ship sizes
let currentShipSize = 0; // Current ship size being positioned
let shipOrientation = "h"; // Orientation of the ship (h or v)

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
    } else if (shipPositioning) {
      // Add event listener for ship positioning
      cell.addEventListener("click", () => {
        handleShipPositioning(boardElement, i);
      });
    }
    boardElement.appendChild(cell);
  }
}

// Function to handle ship positioning
function handleShipPositioning(boardElement, i) {
  // Get the current game board
  let gameBoard = currentPlayer === 1 ? gameBoard1 : gameBoard2;

  // Check if the ship can be placed at the current position
  if (canPlaceShip(gameBoard, i, shipOrientation, shipSizes[currentShipSize])) {
    // Place the ship on the board
    placeShip(gameBoard, i, shipOrientation, shipSizes[currentShipSize]);

    // Update the board to visually show the ship
    updateBoard(boardElement, gameBoard);

    // Move to the next ship size
    currentShipSize++;

    // Check if all ships have been placed
    if (currentShipSize >= shipSizes.length) {
      // Switch to the next player or start the game
      if (currentPlayer === 1) {
        currentPlayer = 2;
        currentShipSize = 0;
      } else {
        shipPositioning = false;
        currentPlayer = 1;
      }
    }
  } else {
    message.textContent = "Cannot place ship at that position.";
  }
}

// Function to check if a ship can be placed at a given position
function canPlaceShip(gameBoard, i, orientation, size) {
  // Check if the ship would go out of bounds
  if (orientation === "h" && (i % 10) + size > 10) return false;
  if (orientation === "v" && Math.floor(i / 10) + size > 10) return false;

  // Check if the ship would overlap with another ship
  for (let j = 0; j < size; j++) {
    if (orientation === "h") {
      if (gameBoard[i + j] !== 0) return false;
    } else {
      if (gameBoard[i + j * 10] !== 0) return false;
    }
  }

  return true;
}

// Function to place a ship at a given position
function placeShip(gameBoard, i, orientation, size) {
  for (let j = 0; j < size; j++) {
    if (orientation === "h") {
      gameBoard[i + j] = 1;
    } else {
      gameBoard[i + j * 10] = 1;
    }
  }
}

// Function to update the visual representation of the board
function updateBoard(boardElement, gameBoard) {
  for (let i = 0; i < 100; i++) {
    if (gameBoard[i] === 1) {
      boardElement.children[i].classList.add("ship");
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

// Create the game boards
createBoard(player1Board);
createBoard(player2Board);
createBoard(player1Shots, true);
createBoard(player2Shots, true);

// Initialize the message
message.textContent = "Player 1, place your 3-cell ship.";
