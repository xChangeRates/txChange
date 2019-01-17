const db = require('../models/database')
const dotenv = require('dotenv');
dotenv.config();

const accessKey = process.env.access_key

module.exports = {
  // 
  getAllUserTransactions(req, res, next) {
    const userId = req.params.id;
    console.log(userId);

    db.query(
      `SELECT * FROM history WHERE user_id = $1`, userId
    )
    .then(response => res.send(response))

    next()
  },
  recordTransaction(req, res, next) {
    console.log(req.body)
    const { 
      userId,
      countryId,
      timestamp,
      conversionRate,
      transaction
    } = req.body;

    db.query(
      `
      INSERT INTO history (user_id, country_id, timestamp, conversion_rate, transaction) 
      VALUES ($1, $2, $3, $4, $5)
      `, [userId, countryId, timestamp, conversionRate,transaction]
    )
    .then(response => console.log(response))
    .then(next())
    .catch(err => console.log(err))
  },
  
  // getRate(req, res, next) {
  //   // const { home, foreign } = req.body;  
  //   // fetch(`http://apilayer.net/api/live?${accessKey}&source=${home}&currencies=${foreign}&format=1`)
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     res.locals.rate = Object.values(data.quotes)[0];
  //   //     next();
  //   //   })

  // }
}