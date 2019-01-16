const dotenv = require('dotenv');
dotenv.config();
const Promise = require("bluebird");

// Setting up options to use Bluebird promises
const initOptions = {
  promiseLib: Promise
};

const pgp = require('pg-promise')(initOptions)
// Preparing the connection details:
const cn = process.env.POSTGRES_URI;
// Creating a new database instance from the connection details:
const db = pgp(cn);

db.proc('version')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
      console.log(error);
  });


module.exports = db;




