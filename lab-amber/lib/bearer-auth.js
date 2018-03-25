'use strict';

const jwt = require('jsonwebtoken');

const User = require('../model/user.js');

function bearerAuth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401);
    res.send('Not authorized');
    res.end();
    return;
  }
  var authHeader = req.headers.authorization;
  var token = authHeader.split('Bearer ')[1];
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      return next(err);
    }
    User.findOne({ username: decoded.username })
      .then(user => {
        req.user = user;
        console.log('req.user', req.user);
        next();
      });
  });
}

module.exports = bearerAuth;