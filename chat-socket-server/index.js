import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  // connectionStateRecovery: {},
  path: "/chat-socket/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome Home</h1>");
});

// Incoming Connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listening from Client
  socket.on("chat message", (msg, callback) => {
    console.log("Received:", msg);
    io.emit("chat message", msg);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from server");
  });
});

server.listen(5000, () => {
  console.log("listening to PORT 5000");
});
