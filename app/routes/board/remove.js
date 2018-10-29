const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../../middlewares/verifyToken');
const Board = require('../../models/Board');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.delete('/boards/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  Board.findById(id).remove().exec()
    .then(() => {
      res.status(200).send({ message: 'Deleted successfully' });
    })
    .catch(error => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
