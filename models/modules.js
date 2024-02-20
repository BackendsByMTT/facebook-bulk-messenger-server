const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define UserData schema
const userDataSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      unique: true,
    },
    FacebookID: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

// Define RejectedIds schema
const rejectedIdsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create models
const UserData = mongoose.model("UserData", userDataSchema);
const RejectedIds = mongoose.model("Rejected", rejectedIdsSchema);

// Export models
module.exports = { UserData, RejectedIds };
