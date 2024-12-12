// import packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// import files
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const lessonRoutes = require("./routes/lesson-routes");
const vocabularyRoutes = require("./routes/vocabulary-routes");
const { protect } = require("./middleware/auth-middleware");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running!!");
});

connectDB();

app.use("/auth", authRoutes);
app.use("/api", protect, lessonRoutes);
app.use("/api", protect, vocabularyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
