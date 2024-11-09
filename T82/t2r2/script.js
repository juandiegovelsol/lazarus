// Get the board elements for player 1
const player1Board = document.getElementById("player1-board"); // Player 1's own board
const player1Shots = document.getElementById("player1-shots"); // Player 1's shot board

// Get the board elements for player 2
const player2Board = document.getElementById("player2-board"); // Player 2's own board
const player2Shots = document.getElementById("player2-shots"); // Player 2's shot board

// Get the message element to display game status
const message = document.getElementById("message");

// Initialize game variables
let currentPlayer = 1; // Start with player 1
let player1Ships = 3; // Number of ships for player 1
let player2Ships = 3; // Number of ships for player 2
let gameBoard1 = Array(100).fill(0); // Player 1's game board (0: empty, 1: ship, 2: miss, 3: hit)
let gameBoard2 = Array(100).fill(0); // Player 2's game board
let player1ShotBoard = Array(100).fill(0); // Player 1's shot tracking board
let player2ShotBoard = Array(100).fill(0); // Player 2's shot tracking board
let gameOver = false; // Flag to indicate if the game is over

// Function to create a game board
function createBoard(
  boardElement, // The HTML element to contain the board
  gameBoard, // The array representing the game board data
  shotBoard = false, // Flag to indicate if it's a shot board
  playerNumber = 1 // The player number associated with the board
) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;

    // Add click event listener for shot boards
    if (shotBoard && !gameOver) {
      cell.addEventListener("click", () => {
        if (playerNumber === currentPlayer) {
          handleShotClick(
            boardElement,
            playerNumber === 1 ? gameBoard2 : gameBoard1, // Determine opponent's game board
            i
          );
        }
      });
    }
    boardElement.appendChild(cell);
  }
}

// Function to place ships randomly on the board (ships of size 3, 2, and 1)
function placeShips(gameBoard) {
  // Function to check if a ship can be placed at a given position
  function isValidPosition(size, row, col, direction) {
    if (direction === "h") {
      // Check horizontal placement
      if (col + size > 10) return false; // Ship would go out of bounds
      for (let i = 0; i < size; i++) {
        if (gameBoard[row * 10 + col + i] !== 0) return false; // Cell is occupied
      }
    } else {
      // Check vertical placement
      if (row + size > 10) return false; // Ship would go out of bounds
      for (let i = 0; i < size; i++) {
        if (gameBoard[(row + i) * 10 + col] !== 0) return false; // Cell is occupied
      }
    }
    return true;
  }

  // Function to place a ship at a given position
  function placeShip(size, row, col, direction) {
    if (direction === "h") {
      // Place horizontally
      for (let i = 0; i < size; i++) {
        gameBoard[row * 10 + col + i] = 1;
      }
    } else {
      // Place vertically
      for (let i = 0; i < size; i++) {
        gameBoard[(row + i) * 10 + col] = 1;
      }
    }
  }

  // Place ships of size 3, 2, and 1
  let shipSizes = [3, 2, 1];
  for (let size of shipSizes) {
    let placed = false;
    while (!placed) {
      let direction = Math.random() < 0.5 ? "h" : "v"; // Random direction
      let row = Math.floor(Math.random() * 10); // Random row
      let col = Math.floor(Math.random() * 10); // Random column
      if (isValidPosition(size, row, col, direction)) {
        placeShip(size, row, col, direction);
        placed = true;
      }
    }
  }
}

// Function to handle clicks on the shot board
function handleShotClick(boardElement, opponentGameBoard, i) {
  if (gameOver) return; // Do nothing if game is over

  let shotBoard = currentPlayer === 1 ? player1ShotBoard : player2ShotBoard;
  let opponentBoard = currentPlayer === 1 ? player2Board : player1Board;

  if (shotBoard[i] === 0) {
    // Check if the cell hasn't been shot at before
    if (opponentGameBoard[i] === 1) {
      // Hit
      opponentGameBoard[i] = 3;
      shotBoard[i] = 3;
      boardElement.children[i].classList.add("hit");
      opponentBoard.children[i].classList.add("hit");

      if (currentPlayer === 1) {
        // Update player 2's ship count
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
        // Update player 1's ship count
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
      // Miss
      opponentGameBoard[i] = 2;
      shotBoard[i] = 2;
      boardElement.children[i].classList.add("miss");
      opponentBoard.children[i].classList.add("miss");
      message.textContent = `Player ${currentPlayer} missed!`;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch to the other player
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
createBoard(player1Board, gameBoard1); // Create player 1's board
createBoard(player2Board, gameBoard2); // Create player 2's board
createBoard(player1Shots, gameBoard2, true, 1); // Create player 1's shot board
createBoard(player2Shots, gameBoard1, true, 2); // Create player 2's shot board

// Place ships on the boards
placeShips(gameBoard1); // Place player 1's ships
placeShips(gameBoard2); // Place player 2's ships

// Update the boards to visually show the ships
updateBoards();
