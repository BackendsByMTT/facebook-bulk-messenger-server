const express = require("express");
const router = express.Router();
const { createUserData,getUserDataById } = require("../controllers/userData");

//default route
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server Is healthy" });
});
router.post("/userData", createUserData);
router.get("/userData/:id", getUserDataById);

module.exports = router;



