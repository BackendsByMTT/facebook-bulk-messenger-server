const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserDataSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    FacebookID: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = UserData;
