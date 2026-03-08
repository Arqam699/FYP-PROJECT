import express from 'express';
import mongoose from 'mongoose';
import connectdb from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
  const port = 8000;
app.get('/', (req, res) => {
  res.send('Hello World');

});

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
      connectdb();
});