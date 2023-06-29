const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
