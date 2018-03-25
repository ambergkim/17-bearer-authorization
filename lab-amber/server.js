'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loginAPI = require('./route/user.js');
const postAPI = require('./route/post.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', loginAPI);
app.use('/api/posts', postAPI);
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});
app.get('*', function (req, res) {
  res.status(404)
  res.send('Not Found');
});

app.listen(PORT, () => {
  console.info(`Listening in at http://localhost:${PORT}.`);
});