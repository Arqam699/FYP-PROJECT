import express from 'express';
import mongoose from 'mongoose';
import connectdb from './config/db.js';
import dotenv from 'dotenv';
import authRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
  const port = 8000;

app.use(express.json())

app.use(cookieParser())


app.use("/api/auth",authRouter)

connectdb();

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});