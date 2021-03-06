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
      const currentIndex = _.findIndex(tasksOrder, taskIdEntry => taskId === taskIdEntry.toString());
      tasksOrder.splice(currentIndex, 1);
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

function singleColumnOrderUpdate(reorder) {
  const {
    taskId,
    columnSourceId,
    newIndex,
  } = reorder;

  return Column.findById(columnSourceId)
    .then(column => {
      const tasksOrder = Array.from(column.tasksOrder);
      const currentIndex = _.findIndex(tasksOrder, taskIdEntry => taskId === taskIdEntry.toString());
      tasksOrder.splice(currentIndex, 1);
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
  const { columnDestinationId, columnSourceId } = reorder;
  if (columnDestinationId === columnSourceId) {
    return singleColumnOrderUpdate(reorder);
  }

  return updateSourceColumn(reorder)
    .then(() => {
      return updateDestinationColumn(reorder);
    })
    .catch((error) => {
      logger.error(error);
    });
}

function updateTask(reorder, userId, userEmail) {
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
        userEmail,
      };

      history.unshift(historyEntry);
      task.history = history;
      task.columnId = columnDestinationId;
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
  const { userId, userEmail } = req;

  Promise.all([
    updateColumns(reorder),
    updateTask(reorder, userId, userEmail),
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
