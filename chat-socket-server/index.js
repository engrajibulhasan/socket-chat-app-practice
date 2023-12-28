import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
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

  //   receiving Message by this Event
  socket.on("chat message", (msg) => {
    console.log("Received:", msg);
    // Now sent to others, also including sender
    socket.emit("chat message", msg);
    // socket.broadcast.emit(msg); // it will emmit instead of sender to all
  });

  //   Receiving request request
  socket.on("request", (arg1, arg2, callback) => {
    console.log("Love Request:", arg1, arg2);
    callback({
      status: "ok",
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from server");
  });
});

server.listen(5000, () => {
  console.log("listening to PORT 5000");
});
