// db.js
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/roxiler?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'mydatabase' with your DB name
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
