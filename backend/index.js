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
import contactRouter from './routes/contact.routes.js';
import geminiResponse from './gemini.js';
const app = express();
app.use(cors({
  origin: process.env.frontendUrl,
  credentials:true
}))

  const port = process.env.PORT || 5000;

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.get("/",async (req,res)=>{
  let prompt = req.query.prompt
  let data = await geminiResponse(prompt)
  res.json(data)
} )

 app.use("/api/contact",contactRouter);


  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectdb();
});
