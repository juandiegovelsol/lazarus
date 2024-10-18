let blockCounter = 0;
let blockSize = 100;
let blocks = document.querySelector(".blocks");
let blockCounterElement = document.querySelector(".block-counter");
let restartButton = document.querySelector(".restart-button");
let gameArea = document.querySelector(".game-area");
let nextBlock;
let currentBlock;

function createBlock(size) {
  let block = document.createElement("div");
  block.classList.add("block");
  block.style.width = `${size}px`;
  block.style.height = "20px";
  return block;
}

function createNextBlock() {
  nextBlock = createBlock(blockSize);
  nextBlock.classList.add("next-block");
  gameArea.appendChild(nextBlock);
  nextBlock.style.left = `${gameArea.offsetWidth / 2 - blockSize / 2}px`;
  nextBlock.style.top = "0px";
}

function moveNextBlock(e) {
  if (nextBlock) {
    let x = e.clientX - gameArea.offsetLeft;
    nextBlock.style.left = `${x - blockSize / 2}px`;
  }
}

function dropNextBlock() {
  if (nextBlock) {
    let left = parseFloat(nextBlock.style.left);
    let top = parseFloat(nextBlock.style.top);
    if (
      left < currentBlock.offsetLeft - blockSize / 2 ||
      left + blockSize / 2 > currentBlock.offsetLeft + currentBlock.offsetWidth
    ) {
      alert("Game Over!");
      restartGame();
      return;
    }
    nextBlock.style.top = `${currentBlock.offsetTop - 20}px`;
    nextBlock.classList.remove("next-block");
    blocks.appendChild(nextBlock);
    currentBlock = nextBlock;
    nextBlock = null;
    createNextBlock();
    blockCounter++;
    blockCounterElement.textContent = `Blocks: ${blockCounter}`;
    blockSize = Math.max(50, blockSize - 5);
  }
}

function restartGame() {
  blockCounter = 0;
  blockSize = 100;
  blockCounterElement.textContent = `Blocks: ${blockCounter}`;
  while (blocks.firstChild) {
    blocks.removeChild(blocks.firstChild);
  }
  if (nextBlock) {
    gameArea.removeChild(nextBlock);
    nextBlock = null;
  }
  currentBlock = createBlock(blockSize);
  blocks.appendChild(currentBlock);
  createNextBlock();
}

restartButton.addEventListener("click", restartGame);
gameArea.addEventListener("mousemove", moveNextBlock);
gameArea.addEventListener("click", dropNextBlock);

currentBlock = createBlock(blockSize);
blocks.appendChild(currentBlock);
createNextBlock();
