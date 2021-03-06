const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const Board = require('../../models/Board');
const getBoardWithColumnsAndTasks =
  require('../../helpers/getBoardWithColumnsAndTasks');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/boards', (req, res) => {
  const { userId, userEmail } = req;

  Board.find({ ownerId: userId })
    .then(ownBoards => {
      Board.find({ participants: userEmail })
        .then(participatedBoards => {
          const boards = [
            ...ownBoards,
            ...participatedBoards,
          ];

          res.status(200).send(boards);
        })
        .catch(error => {
          logger.error(error);
          res.status(500).send(error);
        });
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send(error);
    });
});

router.get('/boards/:id', (req, res) => {
  const { id } = req.params;

  Board.findById(id)
    .then(board => {
      if (!board) {
        logger.warn('Board not found');
        res.status(404).send({ message: 'Board not found' });
      }

      getBoardWithColumnsAndTasks(board.toJSON())
        .then(board => {
          res.status(200).send(board);
        });
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
