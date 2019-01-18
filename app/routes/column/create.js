const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const verifyToken = require('../../middlewares/verifyToken');
const getBoardWithColumnsAndTasks =
  require('../../helpers/getBoardWithColumnsAndTasks');
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
      logger.warn(error);
      res.status(500).send({
        message: 'Something went wrong while checking number of columns',
      });
    });
}

function updateBoardColumns(req, res, column) {
  const { _id, boardId } = column;

  return Board.findById(boardId)
    .then(board => {
      board.columnsOrder.push(_id);

      return board.save()
        .then(updatedBoard => {
          return getBoardWithColumnsAndTasks(updatedBoard.toJSON());
        })
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
        .catch((deleteError) => {
          logger.error(deleteError);
          res.status(500).send({
            message: 'Board could not be updated, column could not be removed',
          });
        });
    });
}

router.post('/columns', verifyToken, checkNumberOfColumns, (req, res) => {
  const {
    title,
    boardId,
  } = req.body;

  const newColumn = {
    title,
    boardId,
    createdAt: new Date(),
    tasksOrder: [],
  };

  Column.create(newColumn)
    .then((createdColumn) => {
      updateBoardColumns(req, res, createdColumn)
        .then(updatedBoard => {
          res.status(200).send(updatedBoard);
        });
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
