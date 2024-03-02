const userModule = require("../models/modules");

const createUserData = async (req, res) => {
  try {
    await new userModule.UserData(req.body).save();
    res.status(201).json("Message and ids have been saved successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  try {
    const userData = await userModule.UserData.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    await userModule.UserData.findByIdAndDelete(id);
    res.status(200).json("User data deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserData, getData, deleteUserData };
