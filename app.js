"use client";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/userRoutes");
const server = http.createServer(app);
const io = socketIo(server);
// CORS
const corsOrigin = {
  origin: "*",
};
app.use(cors(corsOrigin));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PORT & DB_URL
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

// CONNECTING db
main()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err, "error"));

async function main() {
  await mongoose.connect(DB_URL);
}

// ROUTES
app.use("/", router);

// SOCKET IO
let ids = [];
let currentIndex = 0;

io.on("connection", (socket) => {
  socket.on("user-data", (message, id, time) => {
    console.log(message, id, time);
    ids.push(id);
    if (ids.length >= 1 || currentIndex >= ids.length) {
      const batch = ids.slice(0, 2);
      console.log(batch);
      // currentIndex += 3;

      socket.emit("sendData", message, batch);

      if (currentIndex >= ids.length) {
        currentIndex = 0;
        ids = [];
      }
    }
  });
});

// LISTENING TO SERVER
server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
