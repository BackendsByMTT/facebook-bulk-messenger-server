const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const io = require("socket.io");
const router = require("./routes/userRoutes");
//CORS
const corsOrigin = {
  origin: "*",
};
app.use(cors(corsOrigin));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("socketio", io);
//PORT & DB_URL
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

//CONNECTING db-
main().then(() => console.log("databse connected"));
main().catch((err) => console.log(err, "err"));

async function main() {
  await mongoose.connect(DB_URL);
}

//ROUTES
app.use("/", router);

//SOCKET IO
io.on("connection", (socket) => {
  socket.on("user-data", (userData) => {
    console.log(userData);
  });
});




//LISTING TO SERVER
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
