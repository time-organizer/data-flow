const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const verifyToken = require('../../middlewares/verifyToken');
const Column = require('../../models/Column');
const Task = require('../../models/Task');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.put('/tasks-reorder', verifyToken, (req, res) => {
  const {
    sourceColumn,
    destinationColumn,
    tasksIds,
  } = req.body;

  const reorderingRequests = [];
  const response = {
    updatedColumns: {},
    updatedTasks: {},
  };

  reorderingRequests.push(
    Column.findByIdAndUpdate(sourceColumn._id, {
      tasksOrder: sourceColumn.tasksOrder,
    }, { upsert: true, new: true })
      .then(updatedColumn => {
        response.updatedColumns[updatedColumn._id] = updatedColumn;
        return updatedColumn;
      })
      .catch(error => error)
  );

  reorderingRequests.push(
    Column.findByIdAndUpdate(destinationColumn._id, {
      tasksOrder: destinationColumn.tasksOrder,
    })
      .then(updatedColumn => {
        response.updatedColumns[updatedColumn._id] = updatedColumn;
        return updatedColumn;
      })
      .catch(error => error)
  );

  reorderingRequests.push(
    tasksIds.map(taskId => {
      Task.findById(taskId)
        .then(updatedTask => {
          response.updatedTasks[updatedTask._id] = updatedTask;
          return updatedTask;
        })
        .catch(error => error);
    })
  );

  Promise.all(reorderingRequests)
    .then(values => console.log(values));
});

module.exports = router;
