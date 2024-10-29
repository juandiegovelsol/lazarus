import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

const socket = io();
const apartmentsDiv = document.getElementById("apartments");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const sendPhotoBtn = document.getElementById("send-photo");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const doorOpenSound = document.getElementById("door-open-sound");

let cameraStream;

// Generate buttons for the apartments
for (let i = 1; i <= 10; i++) {
  // Example: 10 apartments
  const btn = document.createElement("button");
  btn.textContent = `Apartment ${i}`;
  btn.addEventListener("click", () => {
    socket.emit("call", i); // Send "call" event to server
    chatDiv.style.display = "block";
  });
  apartmentsDiv.appendChild(btn);
}

// Send chat message
sendBtn.addEventListener("click", () => {
  socket.emit("message", messageInput.value);
  messageInput.value = "";
});

// Receive chat message
socket.on("message", (message) => {
  const msgElement = document.createElement("p");
  msgElement.textContent = message;
  messagesDiv.appendChild(msgElement);
});

// Send photo
sendPhotoBtn.addEventListener("click", async () => {
  if (!cameraStream) {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = cameraStream;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    socket.emit("photo", blob);
  });
});

// Receive door open event
socket.on("door-open", () => {
  // Add ended event listener before playing
  doorOpenSound.addEventListener(
    "ended",
    () => {
      socket.emit("visitor-entered");
    },
    { once: true }
  ); // Use once: true to ensure the listener is removed after it fires

  doorOpenSound.play().catch((error) => {
    console.error("Error playing sound:", error);
    // If sound fails to play, still emit the event
    socket.emit("visitor-entered");
  });
});