import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

const socket = io();
const loginForm = document.getElementById("login-form");
const apartmentSelect = document.getElementById("apartment");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const callDiv = document.getElementById("call");
const visitorSpan = document.getElementById("visitor");
const openBtn = document.getElementById("open");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const visitorEnteredMessageDiv = document.getElementById(
  "visitor-entered-message"
);

let apartmentNumber;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  apartmentNumber = apartmentSelect.value;
  socket.emit("login", apartmentNumber, passwordInput.value);
});

socket.on("login-success", () => {
  console.log("Login successful");
  loginForm.style.display = "none";
});

socket.on("call", (apartment) => {
  if (apartment.toString() === apartmentNumber.toString()) {
    callDiv.style.display = "block";
    visitorSpan.textContent = `Apartment ${apartment}`;
    chatDiv.style.display = "block";
  }
});

openBtn.addEventListener("click", () => {
  socket.emit("open");
  callDiv.style.display = "none";
});

sendBtn.addEventListener("click", () => {
  socket.emit("message", messageInput.value);
  messageInput.value = "";
});

socket.on("message", (message) => {
  const msgElement = document.createElement("p");
  msgElement.textContent = message;
  messagesDiv.appendChild(msgElement);
});

socket.on("visitor-entered", () => {
  visitorEnteredMessageDiv.style.display = "block";
});
