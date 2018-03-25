'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Post = require('../model/post.js');
const postStorage = require('../lib/post.js');
const bearerAuth = require('../lib/bearer-auth.js');

const router = express.Router();

router.get('/', bearerAuth, (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    postStorage.get(id)
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    postStorage.getAll()
      .then(posts => {
        res.send(posts);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

router.post('/', bearerAuth, (req, res) => {
  postStorage.save(req.body)
    .then(post => {
      res.status(200);
      res.send(post);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put('/', bearerAuth, (req, res) => {
  postStorage.update(req.query.id, req.body)
    .then(post => {
      res.status(200);
      res.send('updated successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete('/', (req, res) => {
  postStorage.remove(req.query.id)
    .then(post => {
      res.status(204);
      res.send('deleted successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;