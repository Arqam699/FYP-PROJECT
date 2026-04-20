import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import connectdb from './config/db.js';
dotenv.config();
import cors from 'cors';
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

  const port = process.env.PORT

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello Pakistan!');
});

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectdb();
});
