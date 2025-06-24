const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
