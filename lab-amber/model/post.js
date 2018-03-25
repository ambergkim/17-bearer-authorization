'use strict';

const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: String
});

module.exports = mongoose.model('Post', Post);