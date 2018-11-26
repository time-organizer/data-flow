const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../../middlewares/verifyToken');
const Board = require('../../models/Board');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/boards', verifyToken, (req, res) => {
  Board.find({})
    .then(boards => {
      res.status(200).send(boards);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get('/boards/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  Board.findById(id)
    .then(board => {
      if (!board) {
        res.status(404).send({ message: 'Board not found' });
      }
      res.status(200).send(board);
    })
    .catch(error => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
