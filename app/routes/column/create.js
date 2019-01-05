const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const verifyToken = require('../../middlewares/verifyToken');
const Board = require('../../models/Board');
const Column = require('../../models/Column');
const config = require('../../config');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function checkNumberOfColumns(req, res, next) {
  const { userId } = req;

  Column.countDocuments({ ownerId: userId })
    .then(numOfColumns => {
      if (numOfColumns > config.MAX_NUM_OF_COLUMNS) {
        res.status(400).send({ message: 'Number of columns exceeded' });
      } else {
        next();
      }
    })
    .catch(error => {
      console.warn(error);
      res.status(500).send({
        message: 'Something went wrong while checking number of columns',
      });
    });
}

function updateBoardsColumns(req, res, column) {
  const { _id, boardId, title } = column;

  Board.findById(boardId)
    .then(board => {
      board.columns = {
        ...board.columns,
        [_id]: {
          _id,
          title,
        }
      };

      board.save()
        .then(updatedBoard => res.status(200).send(updatedBoard))
        .catch(error => {
          logger.error(error);
          throw error;
        });
    })
    .catch(error => {
      logger.error(error);
      Column.deleteOne({ _id })
        .then(() => {
          res.status(400).send({
            message: 'Board could not be updated, removed column',
          });
        })
        .catch((error) => {
          logger.error(error);
          res.status(500).send({
            message: 'Board could not be updated, column could not be removed',
          });
        });
    });
}

router.post('/columns', verifyToken, checkNumberOfColumns, (req, res) => {
  const { userId } = req;
  const {
    title,
    boardId,
  } = req.body;

  const newColumn = {
    title,
    boardId,
    createdAt: new Date(),
    ownerId: userId,
  };

  Column.create(newColumn)
    .then(createdColumn => {
      updateBoardsColumns(req, res, createdColumn);
    })
    .catch((error) => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
