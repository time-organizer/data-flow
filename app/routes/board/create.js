const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../../middlewares/verifyToken');
const Board = require('../../models/Board');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/boards', verifyToken, (req, res) => {
  const { userId } = req;

  const {
    title,
    theme,
  } = req.body;

  const newBoard = {
    title,
    theme,
    createdAt: new Date(),
    ownerId: userId,
  };

  Board.create(newBoard)
    .then(createdBoard => {
      res.status(200).send(createdBoard);
    })
    .catch((error) => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
