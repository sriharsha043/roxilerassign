// controllers/transactionController.js
const axios = require('axios');
const Transaction = require('../models/Transaction');

//seeding with JSON data
const fetchAndSeedTransactions = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(transactions); // Seed new data

    res.status(200).json({ message: 'Data seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET List of Transactions
const getTransactions = async (req, res) => {
    try {
        // Extract query parameters
        const { page = 1, perPage = 10, search = '' } = req.query;
        
        // Set default pagination values
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(perPage, 10);
        
        // Build the search filter
        let searchQuery = {};
        if (search) {
          const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive search
          searchQuery = {
            $or: [
              { title: searchRegex },
              { description: searchRegex },
              { price: { $eq: parseFloat(search) } }  // Match price if the search is a number
            ]
          };
        }
        
        // Fetch transactions with pagination and search
        const transactions = await Transaction.find(searchQuery)
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize);
    
        // Get total number of records for pagination
        const totalRecords = await Transaction.countDocuments(searchQuery);
        
        // Return response with data and pagination details
        res.status(200).json({
          transactions,
          totalRecords,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalRecords / pageSize),
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}
	

  
module.exports = { fetchAndSeedTransactions, getTransactions };

