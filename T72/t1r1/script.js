const grid = document.querySelector(".grid");
let cards;
let flippedCards = [];
let matchedCards = [];
let lives = 6;
let timer = 60;
let intervalId;
let goldenPairValue; // new variable to store the golden pair value
let goldenPairIndex; // new variable to store the golden pair index

const cardValues = [
  1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
];

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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(value, isGolden) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front"></div>
    <div class="back ${isGolden ? "golden" : ""}">${value}</div>
  `;
  card.dataset.value = value;
  card.dataset.isGolden = isGolden; // new dataset to check if the card is golden
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (
    flippedCards.length < 2 &&
    !flippedCards.includes(this) &&
    !matchedCards.includes(this)
  ) {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
}

function checkForMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1 !== card2 && card1.dataset.value === card2.dataset.value) {
    if (card1.dataset.isGolden === "true") {
      // if the pair is golden, win the game automatically
      gameWon();
    } else {
      matchedCards.push(card1, card2);
      flippedCards = [];
      updateLives(1);
      updateTimer(5);
      if (matchedCards.length === cardValues.length - 2) {
        gameWon();
      }
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCards = [];
    updateLives(-1);
    if (lives === 0) {
      gameOver();
    }
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
  grid.innerHTML = "";
  startGame();
}

function startGame() {
  const shuffledValues = shuffle(cardValues);
  goldenPairIndex = Math.floor(Math.random() * shuffledValues.length);
  goldenPairValue = shuffledValues[goldenPairIndex]; // assign a random value as the golden pair
  shuffledValues.forEach((value, index) => {
    const isGolden =
      index === goldenPairIndex ||
      (index > goldenPairIndex && value === goldenPairValue); // only one pair is golden
    const card = createCard(value, isGolden);
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