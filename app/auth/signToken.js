const jwt = require('jsonwebtoken');

const config = require('../config');

const signToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET, {
      expiresIn: config.TOKEN_EXPIRATION,
    }
  );
};

module.exports = signToken;
