const express = require('express');
const router = express.Router();
const db = require('../db.js');
const passport = require('passport');
require('../config/passport')(passport);

require('pg').types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue.replace(" ", "T") + 'Z');
});

router.post('/add', passport.authenticate('jwt', { session: false}), (req, res) => {
  db.reviews.create({
    text: req.body.text
  }).then(obj => {
    res.json({
      id: obj.id,
      isLoaded: true,
      message: 'Отзыв успешно создан'
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  });
});

router.get('/get/:page', (req, res) => {
  let limit = 5;
  let offset = 0;
  db.reviews.findAndCountAll()
    .then(data => {
      let page = req.params.page;
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      return db.reviews.findAll({
        attributes: ['id', 'text'],
        limit: limit,
        offset: offset,
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .then(reviews => {
          res.status(200).json({data: reviews, count: data.count, pages: pages});
        }).catch(err => {
          res.status(500).json({
            status: 'error',
            message: err
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      })
    })
});

module.exports = router;
