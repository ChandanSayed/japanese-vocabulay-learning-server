const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password, confirmPassword, image, name } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .send(
        "Password must be at least 8 characters long and include at least one number, one lowercase letter, and one uppercase letter"
      );
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email address");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already in use");
    }

    const user = new User({ email, password, image, name });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: "1d",
      });
      const { password, __v, _id, ...userProperties } = user.toObject();
      res.json({ loginSuccessful: true, token, data: userProperties });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginWithToken = async (req, res) => {
  try {
    res.status(200).json({
      message: "Token validated",
      user: {
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
        userType: req.user.userType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.updatedUser = async (req, res) => {
  try {
    const { id } = req.query;
    const updates = req.body;

    if (updates.password) {
      return res.status(400).json({ error: "Password cannot be updated through this route." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
};
