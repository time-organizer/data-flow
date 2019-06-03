const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');
const _ = require('lodash');

const Column = require('../../models/Column');
const Task = require('../../models/Task');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function updateSourceColumn(reorder) {
  const {
    taskId,
    columnSourceId,
  } = reorder;

  return Column.findById(columnSourceId)
    .then(column => {
      const tasksOrder = Array.from(column.tasksOrder);
      tasksOrder.splice(tasksOrder.indexOf(taskId), 1);
      column.tasksOrder = tasksOrder;

      return column.save();
    })
    .catch(error => {
      logger.error(error);
      throw error;
    });
}

function updateDestinationColumn(reorder) {
  const {
    taskId,
    columnDestinationId,
    newIndex,
  } = reorder;

  return Column.findById(columnDestinationId)
    .then(column => {
      const tasksOrder = Array.from(column.tasksOrder);

      tasksOrder.splice(newIndex, 0, taskId);
      column.tasksOrder = tasksOrder;

      return column.save();
    })
    .catch(error => {
      logger.error(error);
      throw error;
    });
}

function updateColumns(reorder) {
  return updateSourceColumn(reorder)
    .then(() => {
      return updateDestinationColumn(reorder);
    })
    .catch((error) => {
      logger.error(error);
    });
}

function updateTaskHistory(reorder, userId) {
  const {
    taskId,
    columnDestinationId,
  } = reorder;

  return Task.findById(taskId)
    .then(task => {
      const history = Array.from(task.history);
      const historyEntry = {
        columnId: columnDestinationId,
        updatedAt: Date.now(),
        userId,
      };

      history.unshift(historyEntry);
      task.history = history;
      task.save();
      return task;
    })
    .catch(error => {
      logger.error(error);
      throw error;
    });
}

router.post('/reorder', (req, res) => {
  const {
    reorder,
  } = req.body;
  const { userId } = req;

  Promise.all([
    updateColumns(reorder),
    updateTaskHistory(reorder, userId),
  ])
    .then((results) => {
      const [updatedColumn, updatedTask] = results;
      res.status(200).send({ updatedTask });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

module.exports = router;
