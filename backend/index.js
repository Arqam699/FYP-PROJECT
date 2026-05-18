import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import connectdb from './config/db.js';
dotenv.config();
import cors from 'cors';
import userRouter from './routes/users.routes.js';
import geminiResponse from './gemini.js';
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

  const port = process.env.PORT

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)  

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectdb();
});
