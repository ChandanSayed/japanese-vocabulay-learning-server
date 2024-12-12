const express = require("express");
const { createLesson } = require("../controllers/lesson-controller");
const router = express.Router();

router.post("/create-lesson/", createLesson);

module.exports = router;
