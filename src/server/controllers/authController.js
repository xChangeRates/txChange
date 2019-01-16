const db = require('../models/database')

const bcrypt = require('bcryptjs');
const saltRounds = 10

module.exports = {
  authenticateUser(req, res, next) {
    const { email, password } = req.body;
    let hash;

    db.query(
      `SELECT password FROM users WHERE email = $1`, email
    )
    .then(response => {
      hash = response[0].password
      bcrypt.compare(password, hash, (err, res) => {
        if (res !== true) {
          // send message that username and password DO NOT match
          console.log('denied')
        } else {
          // give user access
          console.log('welcome')
        }
      });
    })
    next();
  },
  createNewUser(req, res, next) {
    // destructure user info from req.body object
    const { 
      email, 
      password,
      country
    } = req.body;
    // create hash using plain text password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // save user to db, saving encrypted password
      db.query(
        `
        INSERT INTO users (email, password, home_country) 
        VALUES ($1, $2, $3)
        `, [email, hash, country] 
      )
      .then(response => console.log(response))
      .catch(err => console.log(err))
    });
    next()
  },
  getUserData(req, res, next) {
    db.query(
      `SELECT * FROM users`
      )
    .then(response => console.log(response))
    next()
  }
}

