import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import connectdb from './config/db.js';
dotenv.config();
const app = express();

  const port = 8000;

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectdb();
});
