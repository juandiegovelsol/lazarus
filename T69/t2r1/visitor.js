import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

const socket = io();
const apartmentsDiv = document.getElementById("apartments");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const sendPhotoBtn = document.getElementById("send-photo");
const photoContainer = document.getElementById("photo-container");
const video = document.getElementById("video");
const takePhotoBtn = document.getElementById("take-photo");
const canvas = document.getElementById("canvas");
const doorOpenSound = document.getElementById("door-open-sound");

let stream;
let apartmentNumber;

// Generate buttons for the apartments
for (let i = 1; i <= 10; i++) {
  // Example: 10 apartments
  const btn = document.createElement("button");
  btn.textContent = `Apartment ${i}`;
  btn.addEventListener("click", () => {
    socket.emit("call", i); // Send "call" event to server
    apartmentNumber = i;
    chatDiv.style.display = "block";
  });
  apartmentsDiv.appendChild(btn);
}

sendBtn.addEventListener("click", () => {
  socket.emit("message", messageInput.value);
  messageInput.value = "";
});

sendPhotoBtn.addEventListener("click", () => {
  photoContainer.style.display = "block";
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((mediaStream) => {
      stream = mediaStream;
      video.srcObject = mediaStream;
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
});

takePhotoBtn.addEventListener("click", () => {
  canvas.getContext("2d").drawImage(video, 0, 0, 320, 240);
  const photo = canvas.toDataURL();
  socket.emit("photo", photo, apartmentNumber);
  photoContainer.style.display = "none";
  stream.getTracks().forEach((track) => track.stop());
});

socket.on("message", (message) => {
  const msgElement = document.createElement("p");
  msgElement.textContent = message;
  messagesDiv.appendChild(msgElement);
});

socket.on("door-open", () => {
  doorOpenSound.addEventListener(
    "ended",
    () => {
      socket.emit("visitor-entered");
    },
    { once: true }
  );
  doorOpenSound.play().catch((error) => {
    console.error("Error playing sound:", error);
    socket.emit("visitor-entered");
  });
});
