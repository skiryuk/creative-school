const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send/feedback', (req, res) => {
  const feedback = req.body;
  feedback.question = feedback.question.replace(/\n/g, "<br>");
  const transport = nodemailer.createTransport({
    service: "Yandex",
    auth: {
      user: "risuemperm59",
      pass: "QSXaz#2018"
    }
  });

  const mailOptions = {
    from: '"Рисуем Пермь" <risuemperm59@yandex.ru>',
    to: 'risuemperm59@yandex.ru',
    subject: 'Обратная связь',
    html: `${feedback.email ? '<b>Электронная почта: </b>' + feedback.email + '<br>' : ''}
           ${feedback.phone ? '<b>Телефон: </b>' + feedback.email + '<br>' : ''}
           <b>Сообщение:</b><br>${feedback.question}`
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
      message: 'Сообщение успешно отправлено'
    })
  });
});

module.exports = router;
