const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const Board = require('../../models/Board');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.put('/boards/:boardId', (req, res) => {
  const { boardId } = req.params;
  const { updatedObject, confirmOnly } = req.body;
  const updatedData = {
    ...updatedObject,
    lastUpdated: new Date(),
  };

  Board.findByIdAndUpdate(boardId, updatedData, { upsert: true, new: true })
    .then((updatedBoard) => {
      return confirmOnly
        ? res.status(200).send({ message: 'Successfully updated board' })
        : res.status(200).send(updatedBoard);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).send({ messasge: 'Server error' });
    });
});

module.exports = router;
