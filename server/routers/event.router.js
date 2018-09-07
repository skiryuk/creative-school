const express = require('express');
const router = express.Router();
const db = require('../db.js');
const passport = require('passport');
require('../config/passport')(passport);
const upload = require('../config/multer.config.js');

router.post('/add', [upload.single("file"), passport.authenticate('jwt', { session: false})], (req, res) => {
  const fileInfo = JSON.parse(req.body.info);
  db.events.create({
    title: fileInfo.title,
    description: fileInfo.description,
    abonement: fileInfo.abonement,
    price: fileInfo.price,
    type: fileInfo.type,
    mime_type: req.file.mimetype,
    data: req.file.buffer
  }).then(obj => {
    res.json({
      id: obj.id,
      isLoaded: true,
      message: 'Мероприятие успешно создано'
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  });
});

module.exports = router;
