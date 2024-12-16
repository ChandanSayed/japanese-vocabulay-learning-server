const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    whenToSay: {
      type: String,
      required: true,
    },
    lessonNo: {
      type: Number,
      required: true,
      ref: "Lesson",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vocabulary", vocabularySchema);
