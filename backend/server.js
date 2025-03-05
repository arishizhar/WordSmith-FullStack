require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to Wordsmith API");
});

app.get("/api/posts", (req, res) => {
  res.json([
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post.",
    },
  ]);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
