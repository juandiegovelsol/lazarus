import { io } from "socket.io-client";

const socket = io(); // Connection with socket.io
const apartmentsDiv = document.getElementById("apartments");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");

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
