const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Mailer = require('../mailer/index');
const ConfirmationMailBuilder = require('../mailer/ConfirmationMailBuilder');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function updateUserConfirmField(res, id) {
  User.findByIdAndUpdate(id, { confirmed: false }, (updateError, user) => {
    if (updateError) {
      res.status(500).send(
        'There was a problem with updating user confirmation.'
      );
    }
    res.status(200).send(user);
  });
}

router.get('/confirm/:token', (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token.',
      });
    }

    updateUserConfirmField(res, decoded.id);
  });
});

router.get('/confirm/resend/:id', (req, res) => {
  const { id, email } = req.params;

  const token = jwt.sign(
    { id: id },
    process.env.JWT_SECRET,
    { expiresIn: 86400 });

  const mailContent = ConfirmationMailBuilder.buildResentMail(token);
  Mailer.sendMail('Miriloth@gmail.com', mailContent);

  res.status(200).send('Confirmation email was resent');
});

module.exports = router;
