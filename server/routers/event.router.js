const express = require('express');
const router = express.Router();
const db = require('../db.js');
const passport = require('passport');
require('../config/passport')(passport);
const upload = require('../config/multer.config.js');
const stream = require('stream');

require('pg').types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue.replace(" ", "T") + 'Z');
});

router.post('/add', [upload.single("file"), passport.authenticate('jwt', { session: false})], (req, res) => {
  const fileInfo = JSON.parse(req.body.info);
  db.events.create({
    title: fileInfo.title,
    description: fileInfo.description,
    date: fileInfo.date,
    abonement: fileInfo.abonement,
    price: fileInfo.price,
    type: fileInfo.type,
    mime_type: (req.file) ? req.file.mimetype : null,
    data: (req.file) ? req.file.buffer : null
  }).then(obj => {
    res.json({
      id: obj.id,
      isLoaded: true,
      message: 'Занятие успешно создано'
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  });
});

router.get('/get/:category/:page', (req, res) => {
  let limit = 5;
  let offset = 0;
  db.events.findAndCountAll({
    where: {
      type: req.params.category
    }
  })
    .then(data => {
      let page = req.params.page;
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      return db.events.findAll({
        attributes: ['id', 'title', 'description', 'date', 'abonement', 'price', 'type'],
        limit: limit,
        offset: offset,
        where: {
          type: req.params.category
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .then(events => {
          res.status(200).json({data: events, count: data.count, pages: pages});
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

router.get('/view/:id', (req, res) => {
  db.events.findById(req.params.id).then(file => {
    const fileContents = Buffer.from(file.data, "base64");
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    /*res.set('Content-disposition', 'attachment; filename=' + file.name);*/
    res.set('Content-Type', file.mime_type);

    readStream.pipe(res);
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  });
});

module.exports = router;
