const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');

router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmed: false,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      return res.status(500).send('Could not add new user to the database');
    });
});

module.exports = router;