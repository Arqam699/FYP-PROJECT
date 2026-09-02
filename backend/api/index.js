import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/users.routes.js";
import contactRouter from "../routes/contact.routes.js";
import geminiResponse from "../gemini.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

app.get("/", async (req, res) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.json({ message: "Backend is running successfully" });
    }

    const data = await geminiResponse(prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gemini request failed",
    });
  }
});

// MongoDB connection
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URL);
  isConnected = true;

  console.log("MongoDB Connected");
}

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({
      message: "Database connection failed",
    });
  }
}