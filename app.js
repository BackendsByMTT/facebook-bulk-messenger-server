"use client";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/routes");
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
io.on("connection", (socket) => {
  socket.on("sendData", (message, id, time, queue) => {
    console.log(message, id, time, queue);
    const batchSize = parseInt(queue);
    let index = 0;
    const Time = time * 10000;
    console.log(Time);
    function sendNextBatch() {
      const batch = id.slice(index, index + batchSize);
      if (batch.length > 0) {
        socket.emit("sendIds", message, batch);
        index += batchSize;

        setTimeout(sendNextBatch, Time);
      } else {
        const endMsg = "All messages have been sent. Please enter new IDs.";
        socket.emit("endMsg", endMsg);
      }
    }
    sendNextBatch();
  });
});

// LISTENING TO SERVER
server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
