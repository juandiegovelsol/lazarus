let blockCounter = 0;
let towerHeight = 0;
let lastBlockWidth = 100;
let lastBlockLeft = 150;
let gameOver = false;

const tower = document.querySelector(".tower");
const blockCounterElement = document.querySelector(".block-counter");
const restartButton = document.querySelector(".restart-button");

restartButton.addEventListener("click", restartGame);

function createBlock(width) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.width = `${width}px`;
  block.style.height = "20px";
  block.style.left = `${lastBlockLeft - width / 2 + lastBlockWidth / 2}px`;
  block.style.bottom = `${towerHeight}px`;
  tower.appendChild(block);
  return block;
}

function generateRandomWidth() {
  return Math.floor(Math.random() * 50) + 50;
}

function updateBlockCounter() {
  blockCounterElement.textContent = `Blocks: ${blockCounter}`;
}

function checkGameOver(newBlockLeft, newBlockWidth) {
  if (
    newBlockLeft < lastBlockLeft - lastBlockWidth / 2 ||
    newBlockLeft + newBlockWidth / 2 > lastBlockLeft + lastBlockWidth / 2
  ) {
    return true;
  }
  return false;
}

function handleMouseMove(event) {
  if (gameOver) return;
  const newBlock = document.querySelector(".block:last-child");
  const newBlockWidth = parseInt(newBlock.style.width);
  const newBlockLeft =
    event.clientX - newBlockWidth / 2 - tower.offsetParent.offsetLeft;
  newBlock.style.left = `${newBlockLeft}px`;
}

function handleMouseUp() {
  if (gameOver) return;
  const newBlock = document.querySelector(".block:last-child");
  const newBlockWidth = parseInt(newBlock.style.width);
  const newBlockLeft = parseInt(newBlock.style.left);
  if (checkGameOver(newBlockLeft, newBlockWidth)) {
    gameOver = true;
    alert("Game Over!");
  } else {
    blockCounter++;
    updateBlockCounter();
    towerHeight += 20;
    lastBlockWidth = newBlockWidth;
    lastBlockLeft = newBlockLeft + newBlockWidth / 2;
    createBlock(generateRandomWidth());
  }
}

function restartGame() {
  gameOver = false;
  blockCounter = 0;
  towerHeight = 0;
  lastBlockWidth = 100;
  lastBlockLeft = 150;
  updateBlockCounter();
  tower.innerHTML = "";
  createBlock(generateRandomWidth());
}

createBlock(generateRandomWidth());

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
