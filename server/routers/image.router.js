const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config.js');

const stream = require('stream');
const passport = require('passport');
require('../config/passport')(passport);
const db = require('../db.js');

require('pg').types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue.replace(" ", "T") + 'Z');
});

router.post('/upload', [upload.single("file"), passport.authenticate('jwt', { session: false})], (req, res) => {
  db.images.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  }).then(obj => {
    res.json({
      id: obj.id,
      isLoaded: true,
      name: req.file.originalname,
      message: 'Фото успешно загружено'
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  });
});

router.get('/get/:page', (req, res) => {
  let limit = 10;
  let offset = 0;
  db.images.findAndCountAll()
    .then(data => {
      let page = req.params.page;
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      return db.images.findAll({
        attributes: ['id'],
        limit: limit,
        offset: offset,
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .then(images => {
          res.status(200).json({data: images, count: data.count, pages: pages});
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
  db.images.findById(req.params.id).then(file => {
    const fileContents = Buffer.from(file.data, "base64");
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    /*res.set('Content-disposition', 'attachment; filename=' + file.name);*/
    res.set('Content-Type', file.type);

    readStream.pipe(res);
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  });
});

router.get('/remove/:id', (req, res) => {
  db.images.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedRecord => {
      if (deletedRecord === 1){
        res.status(200).json({
          status: 'success',
          message: 'Фото успешно удалено'
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Фото не найдено в БД'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      })
    });
});

module.exports = router;
