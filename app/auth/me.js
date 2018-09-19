const verifyToken = require('../middlewares/verifyToken');
const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.get('/me', verifyToken, (req, res) => {
  const { userId } = req;

  User.findById(userId, { password: 0, confirmed: 0 }, (err, user) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user);
  });
});

module.exports = router;
