const mongoose = require("mongoose");

const validator = require("validator");

const vocabularySchema = new mongoose.Schema(
  {
    words: {
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
      type: String,
      required: true,
      ref: "User",
      validate: {
        validator: v => validator.isEmail(v),
        message: props => `${props.value} is not a valid email address!`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vocabulary", vocabularySchema);
