const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: mongoose.SchemaTypes.String,
    password: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    lists: [{ type: mongoose.SchemaTypes.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { userSchema, User };
