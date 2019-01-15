const bcrypt = require('bcryptjs');
const saltRounds = 10

module.exports = {
  encryptPassword(password) {
    const output = bcrypt.hash(password, saltRounds, (err, hash) => {
      return hash;
    });
    return output;
  }
}

