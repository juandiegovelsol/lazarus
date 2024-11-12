document.addEventListener("DOMContentLoaded", () => {
  // Update the UI when the document is ready
  const drawButton = document.querySelector(".draw-button");
  const swapButton = document.querySelector(".swap-button");
  const discardButton = document.querySelector(".discard-button");
  const skrewButton = document.querySelector(".skrew-button");

  skrewGame.dealCards(); // Ensure cards are dealt at start

  updateUI(); // Initial UI update

  drawButton.addEventListener("click", () => {
    skrewGame.playerTurn(skrewGame.players[skrewGame.currentPlayerIndex]);
    updateUI();
  });

  swapButton.addEventListener("click", () => {
    skrewGame.swapCard(skrewGame.players[skrewGame.currentPlayerIndex]);
    updateUI();
  });

  discardButton.addEventListener("click", () => {
    skrewGame.discardCard(skrewGame.players[skrewGame.currentPlayerIndex]);
    updateUI();
  });

  skrewButton.addEventListener("click", () => {
    skrewGame.callSkrew(skrewGame.players[skrewGame.currentPlayerIndex]);
    updateUI();
  });
});

// Function to update the UI
function updateUI() {
  const playerContainer = document.querySelector(".player-container");
  const playerHand = playerContainer.querySelector(".player-hand");
  playerHand.innerHTML = ""; // Clear current cards

  // Get the current player
  const player = skrewGame.players[skrewGame.currentPlayerIndex];

  player.cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = card.value; // Show card value
    playerHand.appendChild(cardDiv);
  });

  // Display the top card of the discard pile
  const discardCard = document.querySelector(".discard-pile .card");
  discardCard.textContent =
    skrewGame.discardPile[skrewGame.discardPile.length - 1].value;
}
