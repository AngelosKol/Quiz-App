import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import questionsRouter from "./routes/routing.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// Serve static files
app.use(express.static(path.resolve("public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(
  cors({
    origin: ["*"],
    methods: ["GET"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Questions API" });
});

// Questions API routes
app.use("/api/questions", questionsRouter);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
