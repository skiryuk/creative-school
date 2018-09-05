const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || "development";
const config = require('../config/config')[env];

const db = require('../db.js');
const Users = db.users;

router.post('/login', (req, res) => {
  Users.find({
    where: {
      user: req.body.login
    }
  })
    .then(user => {
      if (!user) {
        res.status(401).send({success: false, msg: 'Аутентификация не удалась. Пользователь не найден'});
      } else {
        const isValid = user.validPassword(req.body.pass);
        if (isValid) {
          const token = jwt.sign(user.toJSON(), config.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).json({status: 'error', message: 'Аутентификация не удалась. Неверный пароль'});
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      })
    })
});

module.exports = router;
