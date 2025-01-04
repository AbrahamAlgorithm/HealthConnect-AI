const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Initiate connection to socket.io
io.on("connection", (socket) => {
  // Join a chat room of the chat room sent
  socket.on("join_room", (chatRoomNum) => {
    socket.join(chatRoomNum);
  });

  // Sends message gotten from the front back to front to the specified chatroom
  socket.on("send_message", (data) => {
    socket.to(data.chatRoomNum).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
