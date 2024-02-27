const express = require("express");
const router = express.Router();
const {
  createUserData,
  saveRejectedData,
  getData,
  getRejectedData,
} = require("../controllers/controller");
//default route
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server Is Running healthy" });
});
//post api's
router.post("/userData", createUserData);
//get api's
router.get("/getAll", getData);
module.exports = router;
