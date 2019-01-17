const db = require('../models/database')
const axios = require('axios')

const keys = require('../config/keys')

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
  getCountryId(req, res, next) {
    const currencyCode = req.params.foreignCountry
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

  getRate(req, res, next) {
    const { home, foreign } = req.query;
    console.log('req.query: ', req.query);
    axios.get(`http://apilayer.net/api/live?access_key=${keys.accessKey}&source=${home}&currencies=${foreign}&format=1`)
      .then(data => {
        console.log('data is ', data);
        let rate = Object.values(data.data.quotes)[0]
        res.locals.rate = rate
        next();
      })
  },

  getTaxRate(req, res, next) {
    const { currencyCode } = req.query;
    db.query(
      `SELECT id, tax_rate FROM countries WHERE currency_code = $1`, currencyCode
    )
    .then(result => {
      console.log('result[0] is', result[0]);
      res.locals.id = result[0].id;
      res.locals.taxRate = result[0].tax_rate*1;
      next();
    })
    .catch(err => console.log(err));
  }
}