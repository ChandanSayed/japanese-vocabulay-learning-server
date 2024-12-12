const express = require("express");
const {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson-controller");
const { authorizeAdmin } = require("../middleware/admin-middleware");
const { getVocabularyByLesson } = require("../controllers/vocabulary-controller");
const router = express.Router();

router.post("/create-lesson/", authorizeAdmin, createLesson);
router.get("/get-lessons/", getLessons);
router.put("/update-lesson/:id", authorizeAdmin, updateLesson);
router.delete("/delete-lesson/:id", authorizeAdmin, deleteLesson);

router.get("/lesson/:id", getVocabularyByLesson);

module.exports = router;
