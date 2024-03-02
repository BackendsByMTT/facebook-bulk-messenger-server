const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define UserData schema
const userDataSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

// Create model
const UserData = mongoose.model("UserData", userDataSchema);

// Export model
module.exports = { UserData };
