const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

console.log(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
