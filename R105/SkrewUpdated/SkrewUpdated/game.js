class Card {
    constructor(value, isSpecial = false) {
        this.value = value;
        this.isSpecial = isSpecial;
    }
}

class Player {
    constructor(id) {
        this.id = id;
        this.cards = [];
        this.score = 0;
        this.points = 0; // Keep track of points each round
    }

    seeCards() {
        return this.cards;
    }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(index) {
        this.cards.splice(index, 1);
    }

    calculatePoints() {
        this.points = this.cards.reduce((total, card) => total + card.value, 0);
    }

    resetPoints() {
        this.points = 0;
    }
}

class Game {
    constructor(numPlayers = 4) {
        this.players = Array.from({ length: numPlayers }, (_, i) => new Player(i + 1));
        this.deck = this.createDeck();
        this.discardPile = [];
        this.currentPlayerIndex = 0;
        this.rounds = 5;
        this.currentRound = 1;
        this.skrewCalled = false;
    }

    createDeck() {
        const deck = [];
        for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < 4; j++) {
                deck.push(new Card(i));
            }
        }
        deck.push(new Card(7, true), new Card(8, true)); // Eye cards
        deck.push(new Card(9, true), new Card(10, true)); // Eye cards for opponents
        for (let j = 0; j < 2; j++) {
            deck.push(new Card(10, true), new Card(0), new Card(-1)); // Double, Screwdriver, -1 cards
        }
        for (let j = 0; j < 4; j++) {
            deck.push(new Card(20)); // +20 points
        }
        for (let j = 0; j < 2; j++) {
            deck.push(new Card(25)); // Screw cards
        }
        return this.shuffle(deck);
    }

    shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    dealCards() {
        for (let player of this.players) {
            for (let i = 0; i < 4; i++) {
                player.addCard(this.deck.pop());
            }
        }
        this.discardPile.push(this.deck.pop()); // Initial discard card
    }

    play() {
        this.dealCards();
        for (let round = 1; round <= this.rounds; round++) {
            console.log(`Round ${round}`);
            this.currentRound = round;
            for (let turn = 0; turn < this.players.length; turn++) {
                const player = this.players[this.currentPlayerIndex];
                console.log(`Player ${player.id}'s turn`);
                this.playerTurn(player);
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            }
            this.endRound();
        }
        this.gameOver();
    }

    playerTurn(player) {
        const action = this.getPlayerAction(player);
        switch (action) {
            case 'draw':
                this.drawCard(player);
                break;
            case 'swap':
                this.swapCard(player);
                break;
            case 'discard':
                this.discardCard(player);
                break;
            case 'skrew':
                this.callSkrew(player);
                break;
        }
    }

    getPlayerAction(player) {
        // For now, just return a random action
        const actions = ['draw', 'swap', 'discard', 'skrew'];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    drawCard(player) {
        const drawnCard = this.deck.pop();
        player.addCard(drawnCard);
        console.log(`Player ${player.id} drew a card with value ${drawnCard.value}`);
    }

    swapCard(player) {
        const swappedCard = this.discardPile.pop();
        const playerCard = player.cards.pop();
        player.addCard(swappedCard);
        this.discardPile.push(playerCard);
        console.log(`Player ${player.id} swapped a card with the top card of the discard pile`);
    }

    discardCard(player) {
        const discardedCard = player.cards.pop();
        this.discardPile.push(discardedCard);
        console.log(`Player ${player.id} discarded a card with value ${discardedCard.value}`);
    }

    callSkrew(player) {
        this.skrewCalled = true;
        console.log(`Player ${player.id} called Skrew!`);
    }

    endRound() {
        console.log("Ending round...");
        if (this.skrewCalled) {
            this.skrewRound();
        } else {
            for (let player of this.players) {
                player.calculatePoints();
                player.score += player.points;
                player.resetPoints();
            }
        }
        this.skrewCalled = false;
        this.currentPlayerIndex = 0;
    }

    skrewRound() {
        for (let player of this.players) {
            player.calculatePoints();
        }
        const lowestPoints = Math.min(...this.players.map(player => player.points));
        const lowestPlayer = this.players.find(player => player.points === lowestPoints);
        lowestPlayer.score += 0;
        for (let player of this.players) {
            if (player !== lowestPlayer) {
                player.score += player.points;
            }
        }
        if (this.currentRound === 5) {
            for (let player of this.players) {
                player.score *= 2;
            }
        }
        for (let player of this.players) {
            player.resetPoints();
        }
    }

    gameOver() {
        console.log("Game over!");
        const winner = this.players.reduce((min, player) => player.score < min.score ? player : min, this.players[0]);
        console.log(`Player ${winner.id} wins with a score of ${winner.score}!`);
    }
}

// Start the game
const skrewGame = new Game();
