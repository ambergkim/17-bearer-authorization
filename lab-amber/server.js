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
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', loginAPI);
app.use('/', postAPI);
app.get('*', function(req, res){
  res.send('Not Found', 404);
});

app.listen(PORT, ()=> {
  console.info(`Listening in at http://localhost:${PORT}.`);
});