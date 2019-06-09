const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const Label = require('../../models/Label');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/labels/:boardId', (req, res) => {
  const { boardId } = req.params;

  Label.find({ boardId }).sort([['createdAt', 'descending']])
    .then(labels => {
      res.status(200).send(labels);
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send(error);
    });
});

router.get('/labels/:id', (req, res) => {
  const { id } = req.params;

  Label.findById(id)
    .then(label => {
      if (!label) {
        logger.warn('Board not found');
        res.status(404).send({ message: 'Label not found' });
      }

      res.status(200).send(label);
    })
    .catch(error => {
      logger.error(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
