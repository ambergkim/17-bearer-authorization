'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user.js');
const storage = require('../lib/user.js');

const router = express.Router();

router.post('/api/signup', (req, res) => {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(400);
    res.send('Must provide username/password');
    return;
  }
  if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined) {
    res.status(400);
    res.send('Must provide valid JSON in body');
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  storage.save(newUser).then(user => {
    res.send({
      username: user.username,
      email: user.email,
      _id: user._id
    });
  }).catch(err => {
    console.error(err);
  });
});

router.get('/api/signin', (req, res) => {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(400);
    res.send('Must provide username/password');
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  let hash;
  storage.get(username).then(user => {
    hash = user.password;
    let isValid = bcrypt.compareSync(password, hash);
    if (isValid) {
      let token = jwt.sign({username: user.username}, process.env.APP_SECRET, (err, newToken) => {
        res.status(200);
        res.send({
          signedIn: true,
          token: newToken
        });
      });
    } else {
      res.status(401);
      res.send('Unauthorized');
    }
  });
});

module.exports = router;