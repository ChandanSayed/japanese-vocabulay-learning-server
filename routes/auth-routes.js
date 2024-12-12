const express = require("express");
const { register, login, logout, loginWithToken } = require("../controllers/auth-controller");
const { protect } = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", protect, loginWithToken);
router.post("/logout", logout);

module.exports = router;
