const express = require("express");
const {} = require("../controllers/lesson-controller");
const { authorizeAdmin } = require("../middleware/admin-middleware");
const {
  createVocabulary,
  getVocabularies,
  UpdateVocabulary,
  deleteVocabulary,
} = require("../controllers/vocabulary-controller");
const router = express.Router();

router.post("/create-vocabulary/", authorizeAdmin, createVocabulary);
router.get("/get-vocabularies/", getVocabularies);
router.put("/update-vocabulary/:id", authorizeAdmin, UpdateVocabulary);
router.delete("/delete-vocabulary/:id", authorizeAdmin, deleteVocabulary);

module.exports = router;
