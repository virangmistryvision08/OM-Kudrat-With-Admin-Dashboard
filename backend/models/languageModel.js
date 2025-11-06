const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    languageName: { type: String },
  },
  { timestamps: true }
);

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;