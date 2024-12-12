const Vocabulary = require("../models/Vocabulary");

exports.createVocabulary = async (req, res) => {
  const { word, pronunciation, meaning, whenToSay, lessonNo } = req.body;

  try {
    const newVocabulary = new Vocabulary({
      word,
      pronunciation,
      meaning,
      whenToSay,
      lessonNo,
      creator: req.user.email,
    });

    await newVocabulary.save();
    res.status(201).json(newVocabulary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVocabularies = async (req, res) => {
  const { lessonNo } = req.query;
  const filter = lessonNo ? { lessonNo } : {};

  try {
    const vocabularies = await Vocabulary.find(filter);
    res.status(200).json(vocabularies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.UpdateVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVocabulary = await Vocabulary.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedVocabulary) return res.status(404).json({ message: "Vocabulary not found" });

    res.status(200).json(updatedVocabulary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVocabulary = await Vocabulary.findByIdAndDelete(id);

    if (!deletedVocabulary) return res.status(404).json({ message: "Vocabulary not found" });

    res.status(200).json({ message: "Vocabulary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVocabularyByLesson = async (req, res) => {
  const { lessonNo } = req.params;

  try {
    const vocabularies = await Vocabulary.find({ lessonNo }).select(
      "word pronunciation meaning whenToSay updatedAt"
    );

    if (!vocabularies.length) {
      return res.status(404).json({ message: "No vocabulary found for this lesson." });
    }

    res.status(200).json(vocabularies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
