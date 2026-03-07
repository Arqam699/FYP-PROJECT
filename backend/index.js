import express from 'express';
import connectdb from './config/db.js';
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectdb();
  console.log(`Server is running on port ${port}`);
});