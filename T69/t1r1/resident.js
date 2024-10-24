import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

const socket = io();
const loginForm = document.getElementById("login-form");
const apartmentSelect = document.getElementById("apartment");
const passwordInput = document.getElementById("password");
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

let isLoggedIn = false;
let residentApartment;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const apartment = apartmentSelect.value;
  const password = passwordInput.value;
  // Simulated login, in a real scenario you would hash and compare the password
  if (password === "password123") {
    isLoggedIn = true;
    residentApartment = apartment;
    loginForm.style.display = "none";
    socket.emit("resident-login", apartment);
  } else {
    alert("Invalid password");
  }
});

// Receive call
socket.on("call", (apartment) => {
  if (isLoggedIn && apartment === residentApartment) {
    callDiv.style.display = "block";
    visitorSpan.textContent = `Apartment ${apartment}`;
    chatDiv.style.display = "block";
  }
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

// Receive visitor entered event
socket.on("visitor-entered", () => {
  visitorEnteredMessageDiv.style.display = "block";
});
