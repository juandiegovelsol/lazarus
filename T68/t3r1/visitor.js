import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

const socket = io(); // Connection with socket.io
const apartmentsDiv = document.getElementById("apartments");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const doorOpenSound = document.getElementById("door-open-sound");

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

// Receive door open event
socket.on("door-open", () => {
  doorOpenSound.play();
  setTimeout(() => {
    socket.emit("visitor-entered");
  }, 3000); // Assume the sound lasts for 3 seconds
});
