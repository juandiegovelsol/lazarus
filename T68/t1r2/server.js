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

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("call", (apartment) => {
    socket.broadcast.emit("call", apartment);
  });

  socket.on("open", () => {
    socket.broadcast.emit("open");
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
