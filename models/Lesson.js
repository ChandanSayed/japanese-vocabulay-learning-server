const mongoose = require("mongoose");
require("./Vocabulary");

const validator = require("validator");

const lessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
lessonSchema.virtual("vocabularyCount", {
  ref: "Vocabulary",
  localField: "number",
  foreignField: "lessonNo",
  count: true,
});
module.exports = mongoose.model("Lesson", lessonSchema);
