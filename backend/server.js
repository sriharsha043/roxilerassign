const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/indexRoutes'); // Import centralized routes

const cors = require("cors");

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/roxiler?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'mydatabase' with your DB name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB connection error:', err));

// Use centralized routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});