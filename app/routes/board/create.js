const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../../middlewares/verifyToken');
const Board = require('../../models/Board');
const config = require('../../config');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function checkNumberOfboards(req, res, next) {
  const { userId } = req;

  Board.count({ ownerId: userId })
    .then(numOfBoards => {
      if (numOfBoards > config.MAX_NUM_OF_BOARDS) {
        res.status(400).send({ message: 'Number of boards exceeded' });
      } else {
        next();
      }
    })
    .catch(error => {
      console.warn(error);
      res.status(500).send({
        message: 'Something went wrong while checking number of boards',
      });
    });
}

router.post('/boards', verifyToken, checkNumberOfboards, (req, res) => {
  const { userId } = req;
  const {
    title,
    theme,
  } = req.body;

  const newBoard = {
    title,
    theme,
    columns: [],
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
