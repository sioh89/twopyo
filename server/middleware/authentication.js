const jwt = require('jsonwebtoken');
const JWT_KEY = require('../config.js').JWTSECRET;

const authenticationFunctions = {
  generateToken: function(userInfo) {
    const token = {
      accessToken: jwt.sign(userInfo, JWT_KEY),
    };
    
    return token;
  },
  authenticate: function(req, res, next) {
    const authorizationHeader = req.get('Authorization');
    let token;

    // console.log('--------', authorizationHeader);

    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }

    if (token) {
      jwt.verify(token, JWT_KEY, (e, decoded) => {
        if (e) {
          res.status(401).json({ error: 'Failed to authenticate' })
        } else {
          req.userInfo = decoded;
          /*
            req.userInfo = {
              name,
              id,
              iat,
            }
          */
          next();
        }
      });
    } else {
      res.status(403).json({ error: 'No token provided' });
    }
  }
};

module.exports = authenticationFunctions;