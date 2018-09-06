const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');

function updateUserConfirmField(res, id) {
  User.findByIdAndUpdate(id, { confirmed: true }, (updateError, user) => {
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

module.exports = router;
