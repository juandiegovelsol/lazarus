const grid = document.querySelector(".grid");
let cards;
let flippedCards = [];
let matchedCards = [];
let lives = 3;

const cardValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
const livesElement = document.createElement("div");
livesElement.classList.add("lives");
livesElement.textContent = `Lives: ${lives}`;
document.querySelector(".game-container").appendChild(livesElement);

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
    <div class="front">${value}</div>
    <div class="back">${value}</div>
  `;
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
  const value1 = card1.querySelector(".back").textContent;
  const value2 = card2.querySelector(".back").textContent;

  if (value1 === value2) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cardValues.length) {
      alert("You Win!");
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCards = [];
    lives--;
    livesElement.textContent = `Lives: ${lives}`;
    if (lives === 0) {
      alert("Game Over!");
      // disable all cards
      cards.forEach((card) => card.removeEventListener("click", flipCard));
    }
  }
}

function startGame() {
  const shuffledValues = shuffle(cardValues);
  shuffledValues.forEach((value) => {
    const card = createCard(value);
    grid.appendChild(card);
  });
  cards = document.querySelectorAll(".card");
}

startGame();
