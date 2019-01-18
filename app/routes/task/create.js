const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../../../logger');

const verifyToken = require('../../middlewares/verifyToken');
const Column = require('../../models/Column');
const Task = require('../../models/Task');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function updateColumn(req, res, task) {
  const { _id, columnId } = task;

  Column.findById(columnId)
    .then(column => {
      column.tasksOrder = [
        _id,
        ...column.tasksOrder,
      ];

      column.save()
        .then(() => res.status(200).send(task))
        .catch(error => {
          logger.error(error);
          throw error;
        });
    })
    .catch((error) => {
      logger.error(error);

      Task.deleteOne({ _id })
        .then(() => {
          res.status(400).send({
            message: 'Column could not be updated, removed task',
          });
        })
        .catch(deleteError => {
          logger.error(deleteError);
          res.status(500).send({
            message: 'Column could not be updated, task could not be removed',
          });
        });
    });
}

router.post('/tasks', verifyToken, (req, res) => {
  const { userId } = req;
  const {
    title,
    columnId,
    boardId,
  } = req.body;

  const newTask = {
    title,
    columnId,
    boardId,
    createdAt: new Date(),
    ownerId: userId,
  };

  Task.create(newTask)
    .then(createdTask => {
      updateColumn(req, res, createdTask);
    })
    .catch((error) => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
