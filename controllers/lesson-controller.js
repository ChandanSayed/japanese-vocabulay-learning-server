const Lesson = require("../models/Lesson");
const User = require("../models/User");

exports.createLesson = async (req, res) => {
  const { name, number } = req.body;

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newLesson = new Lesson({
      name,
      number,
      creator: userId,
    });

    await newLesson.save();

    const { _id, name: lessonName, number: lessonNumber, updatedAt } = newLesson.toObject();

    res.status(201).json({ _id, name: lessonName, number: lessonNumber, updatedAt });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("vocabularyCount").sort({ updatedAt: -1 });
    const response = lessons.map(({ _id, name, number, updatedAt, vocabularyCount }) => ({
      _id,
      name,
      number,
      updatedAt,
      vocabularyCount,
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ _id: req.params.id })
      .populate("vocabularyCount")
      .sort({ updatedAt: -1 });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    const { _id, name, number, updatedAt, vocabularyCount } = lesson;
    const response = {
      _id,
      name,
      number,
      updatedAt,
      vocabularyCount,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!lesson) return res.status(404).json({ message: "Lesson not found or unauthorized" });

    const { _id, name: lessonName, number: lessonNumber, updatedAt } = lesson.toObject();

    res.status(200).json({ _id, name: lessonName, number: lessonNumber, updatedAt });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOneAndDelete({ _id: id, creator: req.user._id });
    if (!lesson) return res.status(404).json({ message: "Lesson not found or unauthorized" });

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
