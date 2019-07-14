const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Mailer = require('../mailer/index');
const ConfirmationMailBuilder = require('../mailer/ConfirmationMailBuilder');
const config = require('../config');
const signToken = require('./signToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');

const checkIfUserExists = (req, res, next) => {
  const { email } = req.body;

  User.find({ email: email.toLowerCase() }).then(users => {
    if (users.length) {
      return res.status(409).send({
        message: 'User with this email already exists',
      });
    }

    next();
  })
    .catch(() => {
      return res.status(500).send({
        message: 'Could not add new user to the database',
      });
    });
};

router.post('/sign-up', checkIfUserExists, (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const { name, email } = req.body;

  User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    confirmed: true,
    createdAt: new Date(),
  })
    .then((user) => {
      const token = signToken(user._id, user.email);

      res.status(200).send({ token });

      // const mailContent = ConfirmationMailBuilder.buildMail(user.name, token);
      // Mailer.sendMail(user.email, mailContent);
    })
    .catch((error) => {
      return res.status(500).send({
        message: 'Could not add new user to the database',
      });
    });
});

module.exports = router;
