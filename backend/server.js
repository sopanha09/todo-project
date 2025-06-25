const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDb();

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/columns', require('./routes/columnRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
