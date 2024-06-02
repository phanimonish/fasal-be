const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    title: mongoose.SchemaTypes.String,
    movies: [mongoose.SchemaTypes.String],
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

module.exports = { listSchema, List };
