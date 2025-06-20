const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.use('/api/tasks', require('./routes/taskRoutes'));

console.log(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
