const express = require("express");
const router = express.Router();
const {
  createUserData,
  getData,
  deleteUserData,
} = require("../controllers/controller");

// Default route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Server Is Running healthy" });
});

// Post APIs
router.post("/userData", createUserData);

// Get APIs
router.get("/getAll", getData);

// Delete API
router.delete("/delete/:id", deleteUserData);

module.exports = router;
