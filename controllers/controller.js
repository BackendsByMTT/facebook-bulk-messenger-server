const userModule = require("../models/modules");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sign_up Agent
const registerUser = async (req, res) => {
  try {
    await new userModule.Agent(req.body).save();
    res.status(201).json("Agent registered successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const agent = await userModule.Agent.findOne({ email });
    if (!agent) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await agent.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: agent._id }, process.env.JWT_SECRET_KEY, {});
    res.status(200).json({ token, agentName: agent.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

module.exports = {
  createUserData,
  getData,
  deleteUserData,
  registerUser,
  loginUser,
};
