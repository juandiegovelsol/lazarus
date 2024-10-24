const grid = document.querySelector(".grid");
let cards;
let flippedCards = [];
let matchedCards = [];
let lives = 6;
let timer = 60;
let intervalId;
let goldenPairValue;
let goldenPairIndex;
let isProcessingFlip = false;
let cardValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
let cardData = {};

// Create a lives display
const livesDisplay = document.createElement("div");
livesDisplay.classList.add("lives");
livesDisplay.textContent = `Lives: ${lives}`;
document.querySelector(".game-container").appendChild(livesDisplay);

// Create a timer display
const timerDisplay = document.createElement("div");
timerDisplay.classList.add("timer");
timerDisplay.textContent = `Time: ${timer}s`;
document.querySelector(".game-container").appendChild(timerDisplay);

function shuffle(array) {
  const randomBuffer = new Uint32Array(array.length);
  crypto.getRandomValues(randomBuffer);
  const indices = Array.from(array.keys());
  indices.sort((a, b) => randomBuffer[a] - randomBuffer[b]);
  return indices.map((i) => array[i]);
}

function createCard(id, isGolden) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front"></div>
    <div class="back ${isGolden ? "golden" : ""}"></div>
  `;
  card.dataset.id = id;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (
    !isProcessingFlip &&
    flippedCards.length < 2 &&
    !flippedCards.includes(this) &&
    !matchedCards.includes(this)
  ) {
    this.classList.add("flipped");
    this.querySelector(".back").textContent = cardData[this.dataset.id].value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      isProcessingFlip = true;
      setTimeout(checkForMatch, 1000);
    }
  }
}

function checkForMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (cardData[card1.dataset.id].value === cardData[card2.dataset.id].value) {
    if (cardData[card1.dataset.id].isGolden) {
      gameWon();
    } else {
      matchedCards.push(card1, card2);
      flippedCards = [];
      isProcessingFlip = false;
      updateLives(1);
      updateTimer(5);
      if (matchedCards.length === cardValues.length - 2) {
        gameWon();
      }
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.querySelector(".back").textContent = "";
    card2.querySelector(".back").textContent = "";
    setTimeout(() => {
      flippedCards = [];
      updateLives(-1);
      isProcessingFlip = false;
      if (lives === 0) {
        gameOver();
      }
    }, 500);
  }
}

function updateLives(delta) {
  lives += delta;
  livesDisplay.textContent = `Lives: ${lives}`;
}

function updateTimer(delta) {
  timer += delta;
  timerDisplay.textContent = `Time: ${timer}s`;
}

function gameWon() {
  clearInterval(intervalId);
  const restartButton = confirm(
    "Congratulations, you won! Do you want to play again?"
  );
  if (restartButton) {
    restartGame();
  } else {
    cards.forEach((card) => {
      card.removeEventListener("click", flipCard);
    });
  }
}

function gameOver() {
  clearInterval(intervalId);
  const restartButton = confirm("Game Over! Do you want to play again?");
  if (restartButton) {
    restartGame();
  } else {
    cards.forEach((card) => {
      card.removeEventListener("click", flipCard);
    });
  }
}

function restartGame() {
  lives = 6;
  timer = 60;
  livesDisplay.textContent = `Lives: ${lives}`;
  timerDisplay.textContent = `Time: ${timer}s`;
  matchedCards = [];
  flippedCards = [];
  isProcessingFlip = false;
  grid.innerHTML = "";
  startGame();
}

function startGame() {
  const shuffledValues = shuffle(cardValues);
  goldenPairIndex = Math.floor(Math.random() * shuffledValues.length);
  goldenPairValue = shuffledValues[goldenPairIndex];
  cardData = {};
  shuffledValues.forEach((value, index) => {
    const isGolden = value === goldenPairValue;
    const cardId = `card-${index}`;
    cardData[cardId] = { value, isGolden };
    const card = createCard(cardId, isGolden);
    grid.appendChild(card);
  });
  cards = document.querySelectorAll(".card");
  intervalId = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Time: ${timer}s`;
    if (timer === 0) {
      gameOver();
    }
  }, 1000);
}

startGame();
