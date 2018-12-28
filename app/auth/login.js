const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'Server error.' });
    }

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // if (!user.confirmed) {
    //   return res.status(403).send({ message: 'User not confirmed' });
    // }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, {
        expiresIn: 86400,
      }
    );

    res.status(200).send({ token });
  }).select('+password');
});

module.exports = router;
