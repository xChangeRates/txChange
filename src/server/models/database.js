var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://ehzexasz:068Ax8AvrL6PsUox2w2olwbgIlWAr-hR@baasu.db.elephantsql.com:5432/ehzexasz')

module.exports = db;

