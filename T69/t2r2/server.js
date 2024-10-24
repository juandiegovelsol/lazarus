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

app.use(express.static("."));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

const residents = {
  1: { password: "password1", socketID: "" },
  2: { password: "password2", socketID: "" },
  3: { password: "password3", socketID: "" },
  4: { password: "password4", socketID: "" },
  5: { password: "password5", socketID: "" },
  6: { password: "password6", socketID: "" },
  7: { password: "password7", socketID: "" },
  8: { password: "password8", socketID: "" },
  9: { password: "password9", socketID: "" },
  10: { password: "password10", socketID: "" },
};

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("login", (apartment, password) => {
    if (password === residents[apartment].password) {
      // Simulated password check
      residents[apartment].socketID = socket.id;
      socket.emit("login-success");
    } else {
      console.log("Invalid password");
    }
  });

  socket.on("call", (apartment) => {
    if (residents[apartment].socketID) {
      const residentSocketId = residents[apartment].socketID;
      io.to(residentSocketId).emit("call", apartment);
    }
  });

  socket.on("open", () => {
    socket.broadcast.emit("door-open");
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("photo", (photo) => {
    socket.broadcast.emit("photo", photo);
  });

  socket.on("visitor-entered", () => {
    socket.broadcast.emit("visitor-entered");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
