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
// main()
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.log(err, "error"));

// async function main() {
//   await mongoose.connect(DB_URL);
// }

// ROUTES
app.use("/", router);

// SOCKET IO
io.on("connection", (socket) => {
  socket.on("sendData", (message, id) => {
    console.log(message, id);
    const bacthSize = 3;
    let index = 0;

    function sendNextBatch() {
      const batch = id.slice(index, index + bacthSize);

      if (batch.length > 0) {
        socket.emit("sendIds", message, batch);
        index += bacthSize;
        setTimeout(sendNextBatch, 60000);
      } else if (batch.length <= 0) {
        const endMsg = "all messages has been send please enter new id's";
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
