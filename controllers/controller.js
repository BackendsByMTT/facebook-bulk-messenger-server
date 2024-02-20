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

const saveRejectedData = async (req, res) => {
  try {
    await new userModule.RejectedIds(req.body).save();
    res.status(201).json("Rejected ids have been saved to the database");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRejectedData = async (req, res) => {
  try {
    const rejectedData = await userModule.RejectedIds.find();
    res.status(200).json(rejectedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserData, getData, saveRejectedData, getRejectedData };
