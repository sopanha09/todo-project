const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use(errorHandler);

console.log(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
