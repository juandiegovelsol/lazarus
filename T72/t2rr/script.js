const grid = document.querySelector(".grid");
let cards;
let flippedCards = [];
let matchedCards = [];
let lives = 6;
let timer = 60;
let intervalId;
let isProcessingFlip = false;

const generateSalt = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(36);
};

const salt = generateSalt();
const encodeCardData = (value, isGolden) => {
  const data = `${value}-${isGolden}-${salt}`;
  return btoa(data);
};

const decodeCardData = (encoded) => {
  try {
    const decoded = atob(encoded);
    const [value, isGolden] = decoded.split("-");
    return {
      value: parseInt(value),
      isGolden: isGolden === "true",
    };
  } catch {
    return null;
  }
};

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
  const randomBuffer = new Uint32Array(array.length);
  crypto.getRandomValues(randomBuffer);
  const indices = Array.from(array.keys());
  indices.sort((a, b) => randomBuffer[a] - randomBuffer[b]);
  return indices.map((i) => array[i]);
}

function createCard(value, isGolden) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front"></div>
    <div class="back"></div>
  `;

  const encodedData = encodeCardData(value, isGolden);
  card.setAttribute("data-encoded", encodedData);

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
    const encodedData = this.getAttribute("data-encoded");
    const { value, isGolden } = decodeCardData(encodedData);

    this.classList.add("flipped");
    const back = this.querySelector(".back");
    back.textContent = value;
    if (isGolden) {
      back.classList.add("golden");
    }
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

  const data1 = decodeCardData(card1.getAttribute("data-encoded"));
  const data2 = decodeCardData(card2.getAttribute("data-encoded"));

  if (card1 !== card2 && data1.value === data2.value) {
    if (data1.isGolden) {
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
    const back1 = card1.querySelector(".back");
    const back2 = card2.querySelector(".back");
    back1.textContent = "";
    back2.textContent = "";
    back1.classList.remove("golden");
    back2.classList.remove("golden");
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
  const goldenPairValue =
    shuffledValues[Math.floor(Math.random() * shuffledValues.length)];

  shuffledValues.forEach((value) => {
    const isGolden = value === goldenPairValue;
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
