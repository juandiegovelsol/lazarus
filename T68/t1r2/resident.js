import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

const socket = io();
const callDiv = document.getElementById("call");
const visitorSpan = document.getElementById("visitor");
const openBtn = document.getElementById("open");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");

// Receive call
socket.on("call", (apartment) => {
  callDiv.style.display = "block";
  visitorSpan.textContent = `Apartment ${apartment}`;
  chatDiv.style.display = "block";
});

// Open the door
openBtn.addEventListener("click", () => {
  socket.emit("open");
  callDiv.style.display = "none";
});

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
