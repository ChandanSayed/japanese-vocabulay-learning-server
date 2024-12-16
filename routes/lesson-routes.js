const express = require("express");
const {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
  getLesson,
} = require("../controllers/lesson-controller");
const { authorizeAdmin } = require("../middleware/admin-middleware");
const { getVocabularyByLesson } = require("../controllers/vocabulary-controller");
const router = express.Router();

router.post("/create-lesson/", authorizeAdmin, createLesson);
router.get("/get-lessons/", getLessons);
router.get("/get-lesson/:id", authorizeAdmin, getLesson);
router.put("/update-lesson/:id", authorizeAdmin, updateLesson);
router.delete("/delete-lesson/:id", authorizeAdmin, deleteLesson);

router.get("/lesson/:id/vocabulary", getVocabularyByLesson);

module.exports = router;
