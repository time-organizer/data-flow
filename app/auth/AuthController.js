const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Mailer = require('../mailer/index');
const ConfirmationMailBuilder = require('../mailer/ConfirmationMailBuilder');

const User = require('../models/User');

router.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    confirmed: false,
  })
    .then((user) => {
      res.status(200).send();
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 86400 });
      const mailContent = ConfirmationMailBuilder.buildMail(user.name, token);

      Mailer.sendMail('Miriloth@gmail.com', mailContent);
    })
    .catch(() => {
      return res.status(500).send('Could not add new user to the database');
    });
});

module.exports = router;
