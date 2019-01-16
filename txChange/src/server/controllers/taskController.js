const db = require('../models/database')

module.exports = {
  // gets all transactions for specified user id
  getAllUserTransactions(req, res, next) {
    const userId = req.params.id;

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
  getUserData(req, res, next) {
    db.query(
      `SELECT * FROM users`
      )
    .then(response => console.log(response))
    next()
  }
}