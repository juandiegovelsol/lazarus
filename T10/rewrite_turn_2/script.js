// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Initialize game variables
let score = 0;
let timer = 10;
let circleX = canvas.width / 2;
let circleY = canvas.height / 2;
let circleRadius = 20;
let gameStarted = false;
let gameOver = false;
let circleMoveTimeout = null;

// Draw the initial circle
drawCircle(circleX, circleY);

// Update the game state every 100 milliseconds
const updateInterval = setInterval(update, 100);

// Handle mouse clicks
canvas.addEventListener('click', handleCanvasClick);

// Handle canvas click events
function handleCanvasClick(event) {
    if (gameOver) return;

    // Get the mouse coordinates
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the mouse click is within the circle
    if (isInsideCircle(mouseX, mouseY, circleX, circleY, circleRadius)) {
        if (!gameStarted) {
            gameStarted = true;  // Start the game only when clicking the circle
        } else {
            score++;
        }
        moveCircle();
    } else if (gameStarted) {
        // If the game has started, allow moving the circle by clicking outside
        moveCircle();
    }
}

// Update the game state
function update() {
    if (gameStarted && !gameOver) {
        timer -= 0.1;

        // Check if the game is over
        if (timer <= 0) {
            gameOver = true;
            clearTimeout(circleMoveTimeout);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawText(`Game Over! Final Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2);
            drawRestartButton();
            return;
        }

        // Redraw dynamic elements
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the circle
        drawCircle(circleX, circleY);

        // Draw the score and timer
        drawText(`Score: ${score}`, 10, 20, 'left');
        drawText(`Time: ${timer.toFixed(1)}`, 10, 50, 'left');
    }
}

// Move the circle to a new location
function moveCircle() {
    circleX = Math.random() * (canvas.width - circleRadius * 2) + circleRadius;
    circleY = Math.random() * (canvas.height - circleRadius * 2) + circleRadius;

    // Reset the 2-second click timeout
    if (circleMoveTimeout) {
        clearTimeout(circleMoveTimeout);
    }
    circleMoveTimeout = setTimeout(() => {
        if (!gameOver) {
            moveCircle();
        }
    }, 2000);
}

// Draw a circle
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Draw text
function drawText(text, x, y) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
}

// Check if a point is inside a circle
function isInsideCircle(x, y, circleX, circleY, radius) {
    return Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2) <= radius;
}

// Draw the restart button
function drawRestartButton() {
    const buttonWidth = 100;
    const buttonHeight = 30;
    const buttonX = canvas.width / 2 - 50;
    const buttonY = canvas.height / 2 + 50;

    // Ensure that the restart button displays correctly
    ctx.fillStyle = 'black';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Restart', canvas.width / 2, buttonY + buttonHeight / 2);

    // Add event listener without { once: true }
    canvas.addEventListener('click', handleRestartClick);


    // Handle restart button click
    function handleRestartClick(event) {
        // Get the mouse coordinates
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check if the click is inside the restart button
        // Do nothing if the click is outside the button
        if (
            mouseX >= buttonX &&
            mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY &&
            mouseY <= buttonY + buttonHeight
        ) {
            restartGame();
            canvas.removeEventListener('click', handleRestartClick);
        }
    }

}

// Restart the game
function restartGame() {
    // Reset the game state
    score = 0;
    timer = 10;
    circleX = canvas.width / 2;
    circleY = canvas.height / 2;
    gameStarted = false;
    gameOver = false;

    // Clear any existing click timeout
    if (circleMoveTimeout) {
        clearTimeout(circleMoveTimeout);
    }

    // Clear the canvas and draw the initial circle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(circleX, circleY);

    // Re-add the main click listener
    canvas.addEventListener('click', handleCanvasClick);
}