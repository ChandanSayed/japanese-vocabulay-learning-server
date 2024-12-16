const mongoose = require("mongoose");
require("./Vocabulary");
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
