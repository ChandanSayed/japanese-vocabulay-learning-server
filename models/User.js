const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: v => v && v.length >= 3,
      message: "Name must be at least 3 characters",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: v => validator.isEmail(v),
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: v => v && v.length >= 8,
      message: "Password must be at least 8 characters",
    },
  },
  image: {
    type: String,
    default: "",
  },

  userType: {
    type: String,
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
