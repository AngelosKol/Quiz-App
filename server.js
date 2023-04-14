const path = require("path");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Questions Api" });
});

const questionsRouter = require("./routes/questions");
app.use("/api/questions", questionsRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
