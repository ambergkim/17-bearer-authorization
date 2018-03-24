'use strict';

const User = require('../model/user.js');

function bearerAuth(req, res, next) {
  var authHeader = req.headers.authorization;
  var token = authHeader.split('Bearer ')[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    User.findOne({ username: decoded.username })
      .then(user => {
        req.user = user;
        next();
      });
  });
}

module.exports = bearerAuth;