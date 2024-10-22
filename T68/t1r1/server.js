const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("dist")); // Serve static files

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("call", (apartment) => {
    socket.broadcast.emit("call", apartment); // Forward the "call" event to all others
  });

  socket.on("open", () => {
    socket.broadcast.emit("open"); // Forward the "open" event
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message); // Forward the chat message
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

console.log(`Serving static files from ${__dirname}`);
