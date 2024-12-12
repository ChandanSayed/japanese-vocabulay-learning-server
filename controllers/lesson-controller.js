const Lesson = require("../models/Lesson");
const User = require("../models/User");

exports.createLesson = async (req, res) => {
  const { name, number } = req.body;

  try {
    const userId = req.user._id;

    // Ensure the user exists
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

    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
