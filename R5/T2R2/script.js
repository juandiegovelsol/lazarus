// Get the canvas element
const captchaCanvas = document.getElementById("captcha-canvas");
const refreshCaptchaButton = document.getElementById("refresh-captcha");

// Generate a random Captcha code
function generateCaptcha() {
  const captchaCode = Math.random().toString(36).substr(2, 6).toUpperCase();
  return captchaCode;
}

// Draw the Captcha code on the canvas
function drawCaptcha(captchaCode) {
  const ctx = captchaCanvas.getContext("2d");
  ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#007BFF";
  ctx.fillText(captchaCode, captchaCanvas.width / 2, captchaCanvas.height / 2);
}

// Generate and draw a new Captcha code
function refreshCaptcha() {
  const captchaCode = generateCaptcha();
  drawCaptcha(captchaCode);
  // You can store the Captcha code in a variable or a hidden input field
  // to verify it later
  console.log(captchaCode);
}

// Generate and draw the initial Captcha code
refreshCaptcha();

// Add an event listener to the refresh Captcha button
refreshCaptchaButton.addEventListener("click", refreshCaptcha);
