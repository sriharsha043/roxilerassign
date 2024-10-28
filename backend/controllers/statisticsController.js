// controllers/statisticsController.js
const Transaction = require('../models/Transaction')

const getStatistics = async (req, res) => {
    const { month } = req.query;
    // console.log(month)
    try {
      const soldItems = await Transaction.find({ sold: true });
      const notSoldItems = await Transaction.find({ sold: false});
    //   const totalSaleAmount = await Transaction.aggregate([
    //     { $match: { sold: true, dateOfSale: { $regex: `-${month}-` } } },
    //     { $group: { _id: null, total: { $sum: "$price" } } }
    //   ]);
    let totalSales = 0
    if(month) {
        await soldItems.forEach(item => {
            let date = new Date(item.dateOfSale)
            if(date.getMonth() == (month-1)) {
                totalSales+=item.price
            }
        });
    }
    
  
      res.status(200).json({
        soldItems:soldItems.length,
        notSoldItems:notSoldItems.length,
        totalSales
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// controllers/statisticsController.js
const getBarChartData = async (req, res) => {
    const { month } = req.query;

    try {
        const pipeline =
        // {   $and:
            [
            {
              $match: {
                $expr: {
                  $eq: [{ $month: "$dateOfSale" }, parseInt(month)]  // 2 represents February
                }
              }
            },
            {
              $group: {
                _id: null,  // Grouping all results together
                range_0_100: {
                  $sum: {
                    $cond: [
                      { $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 200000] }] },
                      1,
                      0
                    ]
                  }
                },range_101_200: {
                    $sum: {
                        $cond: [
                            {$and: [{$gt: ["$price", 100]},{$lte: ["$price", 200]}]},1,0
                        ]
                    }
                }
              }
            }
        ]
    // }
    const results = await Transaction.aggregate(pipeline);
    console.log("query Results:", results)
    console.log(JSON.stringify(pipeline), month)
    res.status(200).json(results);

      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// controllers/statisticsController.js
const getPieChartData = async (req, res) => {
    const { month } = req.query;
    try {
      const categories = await Transaction.aggregate([
        { $match: { dateOfSale: { $regex: `-${month}-` } } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]);
  
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = { getStatistics, getBarChartData, getPieChartData };
  
  

  

  