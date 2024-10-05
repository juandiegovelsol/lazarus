// Get the canvas element
const captchaCanvas = document.getElementById('captchaCanvas');
const ctx = captchaCanvas.getContext('2d');
const refreshCaptcha = document.getElementById('refreshCaptcha');

// Generate a random Captcha code
function generateCaptcha() {
    const captchaCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    localStorage.setItem('captchaCode', captchaCode);
    drawCaptcha(captchaCode);
}

// Draw the Captcha code on the canvas
function drawCaptcha(captchaCode) {
    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#007BFF';
    ctx.fillText(captchaCode, captchaCanvas.width / 2, captchaCanvas.height / 2);
}

// Refresh the Captcha code
refreshCaptcha.addEventListener('click', generateCaptcha);

// Generate a Captcha code on page load
generateCaptcha();

// Validate the Captcha code on form submit
document.getElementById('contactForm').addEventListener('submit', (e) => {
    const userCaptcha = document.getElementById('captcha').value.toUpperCase();
    const storedCaptcha = localStorage.getItem('captchaCode');
    if (userCaptcha !== storedCaptcha) {
        alert('Invalid Captcha code');
        e.preventDefault();
    }
});