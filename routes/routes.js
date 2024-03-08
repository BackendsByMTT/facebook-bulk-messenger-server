const express = require("express");
const router = express.Router();
const {
  createAgentsData,
  getData,
  registerUser,
  loginUser,
  deleteAgentsData,
} = require("../controllers/controller");
const authMiddleware = require("../middleware/authentication");

// Default route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Server Is Running healthy" });
});

// Post APIs
router.post("/userData", createAgentsData);
router.post("/sign_up", registerUser);
router.post("/login", loginUser);

// Get APIs - Apply authMiddleware to restrict access to authenticated users only
router.get("/getData", getData);

// Delete API
router.delete("/delete/:id", deleteAgentsData);

module.exports = router;
