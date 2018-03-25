'use strict';

const mongoose = require('mongoose');
const mongone = require('./mongone.js');

const Post = require('../model/post.js');

const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/401lab17';

mongoose.connect(DATABASE_URL).then(
  () => {
    console.info(`Mongoose connection successfully created.`);
  })
  .catch((error) => {
    console.error(`Error on connection: ${error}`);
  });

function getAll() {
  return new Promise((resolve, reject) => {
    Post.find((err, posts) => {
      resolve(posts);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    Post.findOne({_id: id}, (err, post) => {
      resolve(post);
    });
  });
}

function save(post) {
  let postModel = new Post({
    userId: post.userId,
    content: post.content
  });
  return new Promise((resolve, reject) => {
    postModel.save((err, savedPost) => {
      if (err) {
        console.error(err);
      }
      resolve(savedPost);
    });
  });
}

function update(id, post) {
  return new Promise((resolve, reject) => {
    Post.findOneAndUpdate({_id: id}, {content: post.content}, (err, post) => {
      if (err) {
        console.error(err);
      }
      resolve(post);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Post.remove({_id: id}, (err, post) => {
      if (err) {
        console.error(err);
      }
      resolve(post);
    });
  });
}


module.exports = {
  save,
  getAll,
  get,
  update,
  remove,
};