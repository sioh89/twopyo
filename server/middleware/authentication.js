const jwt = require('jsonwebtoken');
const JWT_KEY = require('../config.js').JWTSECRET;

const authenticationFunctions = {
  generateToken: function(userInfo) {
    const token = {
      accessToken: jwt.sign(userInfo, JWT_KEY),
    };
    
    return token;
  }
};

module.exports = authenticationFunctions;