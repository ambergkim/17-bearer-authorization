'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/post.js');
const postStorage = require('../lib/jobs.js');

const router = express.Router();

// router.get('/', (req, res) => {
//   if (req.query.id) {
//     let id = req.query.id;
//     contactStorage.get(id)
//       .then(contact => {
//         res.send(contact);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   } else {
//     contactStorage.getAll()
//       .then(contacts => {
//         res.send(contacts);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }
// });

router.post('/posts', (req, res) => {
  postStorage.save(req.body)
    .then(post => {
      res.status(200);
      res.send(post);
    })
    .catch(err => {
      console.error(err);
    });
});

// router.put('/', (req, res) => {
//   contactStorage.update(req.query.id, req.body)
//     .then(contact => {
//       res.status(200);
//       res.send('updated successfully');
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

// router.delete('/', (req, res) => {
//   contactStorage.remove(req.query.id)
//     .then(contact => {
//       res.status(204);
//       res.send('deleted successfully');
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

module.exports = router;