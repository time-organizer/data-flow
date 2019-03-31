const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const Column = require('../../models/Column');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.put('/columns/:columnId', (req, res) => {
  const { columnId } = req.params;
  const { updatedObject, confirmOnly } = req.body;
  const updatedData = {
    ...updatedObject,
    lastUpdated: new Date(),
  };

  Column.findByIdAndUpdate(columnId, updatedData, { upsert: true, new: true })
    .then((updatedColumn) => {
      return confirmOnly
        ? res.status(200).send({ message: 'Successfully updated column' })
        : res.status(200).send(updatedColumn);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).send({ messasge: 'Server error' });
    });
});

module.exports = router;
