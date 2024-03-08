const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Define Agent schema
const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define UserData schema
const agentsData = new Schema(
  {
    agentId: {
      type: String,
      required: true},

          message: {
            type: String,
            required: true,
          },
          FacebookID: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            required: true,
          },
        }  ,
  { timestamps: true }
);

// Hash password before saving
agentSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Compare password method
agentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create models
const AgentsData = mongoose.model("agentsData", agentsData);
const Agent = mongoose.model("Agent", agentSchema);

// Export models
module.exports = { AgentsData, Agent };
