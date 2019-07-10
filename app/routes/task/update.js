const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const Task = require('../../models/Task');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.put('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { updatedObject, confirmOnly } = req.body;
  const updatedData = {
    ...updatedObject,
    lastUpdated: new Date(),
  };

  Task.findByIdAndUpdate(taskId, updatedData, { upsert: true, new: true })
    .then((updatedTask) => {
      return confirmOnly
        ? res.status(200).send({ message: 'Successfully updated task' })
        : res.status(200).send(updatedTask);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).send({ messasge: 'Server error' });
    });
});

module.exports = router;
