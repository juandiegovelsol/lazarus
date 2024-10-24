import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files from current directory
app.use(express.static("."));

// Serve socket.io-client from node_modules
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

let connectedResidents = {};

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("resident-login", (apartment) => {
    connectedResidents[apartment] = socket.id;
  });

  socket.on("call", (apartment) => {
    if (connectedResidents[apartment]) {
      io.to(connectedResidents[apartment]).emit("call", apartment);
    }
  });

  socket.on("open", () => {
    socket.broadcast.emit("door-open");
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("visitor-entered", () => {
    socket.broadcast.emit("visitor-entered");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    for (const apartment in connectedResidents) {
      if (connectedResidents[apartment] === socket.id) {
        delete connectedResidents[apartment];
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
