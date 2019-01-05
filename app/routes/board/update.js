const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../../middlewares/verifyToken');
const Board = require('../../models/Board');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.put('/boards/:boardId', verifyToken, (req, res) => {
  const { boardId } = req.params;
  const { updatedObject } = req.body;
  const updatedData = {
    ...updatedObject,
    lastUpdated: new Date(),
  };

  Board.findByIdAndUpdate(boardId, updatedData, { upsert: true, new: true })
    .then((updatedBoard) => {
      return res.status(200).send(updatedBoard);
    })
    .catch((error) => {
      return res.status(500).send({ messasge: 'Server error' });
    });
});

module.exports = router;
