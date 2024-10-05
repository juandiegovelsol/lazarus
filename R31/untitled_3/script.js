// Get the captcha canvas and context
const captchaCanvas = document.getElementById('captchaCanvas');
const ctx = captchaCanvas.getContext('2d');
// Get the refresh captcha button
const refreshCaptcha = document.getElementById('refreshCaptcha');

// Define the characters for the captcha
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';

// Function to generate a random captcha code
function generateCaptcha() {
    // Define the length of the captcha code
    const captchaLength = 6;
    // Initialize the captcha code
    let captchaCode = '';
    // Loop through the length of the captcha code
    for (let i = 0; i < captchaLength; i++) {
        // Get a random character from the characters string
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        // Add the random character to the captcha code
        captchaCode += randomChar;
    }
    // Store the captcha code in local storage
    localStorage.setItem('captchaCode', captchaCode);
    // Draw the captcha code on the canvas
    drawCaptcha(captchaCode);
}

// Function to draw the captcha code on the canvas
function drawCaptcha(captchaCode) {
    // Clear the canvas
    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    // Create a gradient for the background
    const gradient = ctx.createLinearGradient(0, 0, captchaCanvas.width, captchaCanvas.height);
    gradient.addColorStop(0, '#FFB6C1');
    gradient.addColorStop(1, '#00BFFF');
    // Set the fill style to the gradient
    ctx.fillStyle = gradient;
    // Fill the canvas with the gradient
    ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    // Set the font and text align for the captcha code
    const fonts = ['24px Arial', '26px Courier', '28px Georgia', '24px Tahoma'];
    ctx.font = fonts[Math.floor(Math.random() * fonts.length)];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Set the fill style to a random color
    ctx.fillStyle = randomColor();
    // Draw the captcha code on the canvas
    ctx.fillText(captchaCode, captchaCanvas.width / 2, captchaCanvas.height / 2);
    // Draw random lines on the canvas
    drawRandomLines();
}

// Function to get a random color
function randomColor() {
    // Get random red, green, and blue values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Return the random color as a string
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to draw random lines on the canvas
function drawRandomLines() {
    // Loop through 5 times
    for (let i = 0; i < 5; i++) {
        // Start a new path
        ctx.beginPath();
        // Move to a random point on the canvas
        ctx.moveTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
        // Line to a random point on the canvas
        ctx.lineTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
        // Set the stroke style to a random color
        ctx.strokeStyle = randomColor();
        // Set the line width to 1.5
        ctx.lineWidth = 1.5;
        // Stroke the path
        ctx.stroke();
    }
}

// Add an event listener to the refresh captcha button
refreshCaptcha.addEventListener('click', () => {
    // Add the rotate class to the refresh captcha button
    refreshCaptcha.classList.add('rotate');
    // Set a timeout to remove the rotate class after 500ms
    setTimeout(() => {
        refreshCaptcha.classList.remove('rotate');
    }, 500);
    // Generate a new captcha code
    generateCaptcha();
});


// Generate a new captcha code
generateCaptcha();

// Add an event listener to the contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    // Get the user's captcha code
    const userCaptcha = document.getElementById('captcha').value;
    // Get the stored captcha code
    const storedCaptcha = localStorage.getItem('captchaCode');
    // Set a timeout to check the captcha code after 500ms
    setTimeout(() => {
        // Check if the user's captcha code matches the stored captcha code
        if (userCaptcha !== storedCaptcha) {
            // Alert the user that the captcha code is invalid
            alert('Invalid Captcha code. Please try again.');
            // Prevent the form from submitting
            e.preventDefault();
        } else {
            // Alert the user that the captcha code is valid
            alert('Captcha validated successfully!');
        }
    }, 500);
});