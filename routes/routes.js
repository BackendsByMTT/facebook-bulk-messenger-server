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
  res.status(200).json({ message: "Server Is healthy" });
});
//post api's
router.post("/userData", createUserData);
router.post("/reject", saveRejectedData);
//get api's
router.get("/getAll", getData);
router.get("/getRejected", getRejectedData);
module.exports = router;
