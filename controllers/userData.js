const UserData = require("../models/dataSchema");

const createUserData = async (req, res) => {
  try {
    const userData = new UserData(req.body);
    await userData.save();
    res.status(201).json("message and id's has been saved succesfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserDataById = async (req, res) => {
  try {
    const userData = await UserData.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({ error: "UserData not found" });
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserData, getUserDataById };
