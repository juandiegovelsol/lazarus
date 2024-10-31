// Initialize game variables
let currentPlayer = "red";
let gameBoard = [];
let winner = null;
let isAnimating = false;

// Create game board
function initializeGameBoard() {
  gameBoard = [];
  for (let i = 0; i < 7; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 6; j++) {
      gameBoard[i][j] = null;
    }
  }
}

// Generate game board HTML
function createGameBoardHTML() {
  const gameBoardElement = document.querySelector(".game-board");
  gameBoardElement.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.dataset.columnIndex = i;
    for (let j = 0; j < 6; j++) {
      const slotElement = document.createElement("div");
      slotElement.classList.add("slot");
      slotElement.dataset.rowIndex = j;
      columnElement.appendChild(slotElement);
    }
    gameBoardElement.appendChild(columnElement);
  }
}

// Add event listeners to columns
function addColumnEventListeners() {
  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => {
    column.addEventListener("click", handleColumnClick);
  });
}

// Add event listener to reset button
document.querySelector("#reset-button").addEventListener("click", resetGame);

// Modal event listeners
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");
const modalResetButton = document.getElementById("modal-reset-button");

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

modalResetButton.onclick = function () {
  modal.style.display = "none";
  resetGame();
};

// Handle column click
function handleColumnClick(event) {
  if (winner || isAnimating) return;
  const columnIndex = parseInt(event.currentTarget.dataset.columnIndex);
  const column = gameBoard[columnIndex];
  for (let i = column.length - 1; i >= 0; i--) {
    if (column[i] === null) {
      column[i] = currentPlayer;
      animatePieceThroughSlots(columnIndex, i, currentPlayer);
      return;
    }
  }
  flashColumn(event.currentTarget);
}

// Update game board and flash if column is full
function flashColumn(columnElement) {
  columnElement.style.backgroundColor = "#ffdddd";
  setTimeout(() => {
    columnElement.style.backgroundColor = "";
  }, 300);
}

// Animate piece falling through each slot
function animatePieceThroughSlots(columnIndex, rowIndex, player) {
  isAnimating = true;
  const columnElement = document.querySelectorAll(".column")[columnIndex];
  const slotElements = columnElement.querySelectorAll(".slot");

  let currentSlot = 0;
  const piece = document.createElement("div");
  piece.classList.add("piece", player);

  function movePieceToNextSlot() {
    if (currentSlot <= rowIndex) {
      slotElements[currentSlot].appendChild(piece);
      currentSlot++;
      setTimeout(movePieceToNextSlot, 100);
    } else {
      finalizePiecePosition(columnIndex, rowIndex, player);
    }
  }

  movePieceToNextSlot();
}

// Finalize piece position after animation completes
function finalizePiecePosition(columnIndex, rowIndex, player) {
  isAnimating = false;
  checkForWinner(columnIndex, rowIndex);
  if (!winner) {
    checkDraw();
    switchPlayer();
  }
}

// Check for winner
function checkForWinner(col, row) {
  if (
    checkDirection(col, row, 1, 0) ||
    checkDirection(col, row, 0, 1) ||
    checkDirection(col, row, 1, 1) ||
    checkDirection(col, row, 1, -1)
  ) {
    winner = gameBoard[col][row];
    showModal(`${capitalize(winner)} Wins!`);
    disableBoard();
  }
}

// Check if game is a draw
function checkDraw() {
  if (winner) return;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      if (gameBoard[i][j] === null) {
        return;
      }
    }
  }
  showModal("It's a Draw!");
}

// Show modal with message
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "block";
}

// Check specific direction for four in a row
function checkDirection(col, row, deltaX, deltaY) {
  let count = 1;
  count += countPieces(col, row, deltaX, deltaY);
  count += countPieces(col, row, -deltaX, -deltaY);
  return count >= 4;
}

// Count consecutive pieces in a direction
function countPieces(col, row, deltaX, deltaY) {
  let count = 0;
  let player = gameBoard[col][row];
  let i = 1;
  while (true) {
    let newCol = col + deltaX * i;
    let newRow = row + deltaY * i;
    if (newCol < 0 || newCol >= 7 || newRow < 0 || newRow >= 6) break;
    if (gameBoard[newCol][newRow] === player) {
      count++;
      i++;
    } else {
      break;
    }
  }
  return count;
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "red" ? "blue" : "red";
}

// Reset game
function resetGame() {
  currentPlayer = "red";
  winner = null;
  isAnimating = false;

  initializeGameBoard();
  createGameBoardHTML();
  enableBoard();

  addColumnEventListeners();
}

// Enable the board by adding event listeners
function enableBoard() {
  addColumnEventListeners();
}

// Disable the board by removing event listeners
function disableBoard() {
  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => {
    column.removeEventListener("click", handleColumnClick);
  });
}

// Capitalize first letter
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Initialize game on page load
window.onload = function () {
  initializeGameBoard();
  createGameBoardHTML();
  addColumnEventListeners();
};
