const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    ID: { type: Schema.Types.Mixed, required: true },
    department: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
