const express = require("express");
const {
  register,
  login,
  logout,
  loginWithToken,
  getAllUsers,
  updatedUser,
} = require("../controllers/auth-controller");
const { protect } = require("../middleware/auth-middleware");
const { authorizeAdmin } = require("../middleware/admin-middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", protect, loginWithToken);
router.post("/logout", logout);
router.get("/all-users", protect, authorizeAdmin, getAllUsers);
router.put("/update-user", protect, authorizeAdmin, updatedUser);

module.exports = router;
