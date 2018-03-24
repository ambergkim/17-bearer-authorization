'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const mongone = require('./mongone.js');

const User = require('../model/user.js');

const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(DATABASE_URL).then(
  () => {
    console.info(`Mongoose connection successfully created.`);
  })
  .catch((error) => {
    console.error(`Error on connection: ${error}`);
  });

function save(user) {
  let userModel = new User({
    username: user.username,
    email: user.email,
    password: user.password
  });
  return new Promise((resolve, reject) => {
    userModel.save((err, savedUser) => {
      if (err) {
        console.error(err);
      }
      resolve(savedUser);
    });
  });
}

function get(username){
  return new Promise((resolve, reject) => {
    User.findOne({username: username}, (err, user) => {
      resolve(user);
    });
  });
}

module.exports = {
  save,
  get
};