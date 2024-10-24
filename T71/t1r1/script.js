const grid = document.querySelector(".grid");
let cards;
let flippedCards = [];
let matchedCards = [];
let lives = 6;
let timer = 60; // new timer variable
let intervalId; // new interval ID variable

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

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front"></div>
    <div class="back">${value}</div>
  `;
  card.dataset.value = value;
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

  if (card1.dataset.value === card2.dataset.value) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    // add life and time when a pair is found
    lives++;
    timer += 5;
    livesDisplay.textContent = `Lives: ${lives}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    if (matchedCards.length === cardValues.length) {
      gameWon();
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCards = [];
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`;
    if (lives === 0) {
      gameOver();
    }
  }
}

function gameWon() {
  clearInterval(intervalId); // clear the interval
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
  clearInterval(intervalId); // clear the interval
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
  shuffledValues.forEach((value) => {
    const card = createCard(value);
    grid.appendChild(card);
  });
  cards = document.querySelectorAll(".card");
  // start the timer
  intervalId = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Time: ${timer}s`;
    if (timer === 0) {
      gameOver();
    }
  }, 1000);
}

startGame();
