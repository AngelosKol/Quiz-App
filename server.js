const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

const questionsRouter = require("./routes/questions");
app.use("/api/questions", questionsRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
