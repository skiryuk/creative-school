const express = require('express');
const router = express.Router();
const db = require('../db.js');
const passport = require('passport');
require('../config/passport')(passport);
const upload = require('../config/multer.config.js');
const stream = require('stream');
const nodemailer = require('nodemailer');

const env = process.env.NODE_ENV || "development";
const config = require('../config/config')[env];

const dateFormat = require('dateformat');

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

router.get('/remove/:id', (req, res) => {
  db.events.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedRecord => {
      if (deletedRecord === 1){
        res.status(200).json({
          status: 'success',
          message: 'Занятие успешно удалено'
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Занятие не найдено в БД'
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

router.post('/join', (req, res) => {
  const joinEvent = req.body;
  const event = joinEvent.event;
  const transport = nodemailer.createTransport({
    service: "Yandex",
    auth: {
      user: config.mail.user,
      pass: config.mail.pass
    }
  });

  const mailOptions = {
    from: '"Рисуем Пермь" <risuemperm59@yandex.ru>',
    to: 'risuemperm59@yandex.ru',
    subject: 'Запись на занятие',
    html: `${joinEvent.email ? '<b>Электронная почта: </b>' + joinEvent.email + '<br>' : ''}
           ${joinEvent.phone ? '<b>Телефон: </b>+' + joinEvent.phone + '<br>' : ''}
           ${joinEvent.name ? '<b>Имя: </b>' + joinEvent.name + '<br>' : ''}
           <b>Записался на занятие:</b><br><br>
           ${event.title}<br>
           ${dateFormat(event.date, 'dd.mm.yyyy HH:MM')}<br>
           ${event.abonement ? 'Абонемент<br>' : ''}
           ${event.price ? event.price + 'р.' : ''}
           `
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: err
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Запись на занятие произошла успешно'
    })
  });
});

module.exports = router;
