// import packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// import files
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running!!");
});

connectDB();

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
