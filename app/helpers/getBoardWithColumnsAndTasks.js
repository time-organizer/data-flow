const Task = require('../models/Task');
const Column = require('../models/Column');

const logger = require('../../logger');

function getTasksForBoard(boardId) {
  return Task.find({ boardId })
    .then(tasks => {
      return tasks.reduce((previousValue, currentValue) => {
        previousValue[currentValue._id] = currentValue;
        return previousValue;
      }, {});
    })
    .catch(error => {
      logger.error(error);
      return {};
    });
}

function getColumnsForBoard(boardId) {
  return Column.find({ boardId })
    .then(columns => {
      return columns.reduce((previousValue, currentValue) => {
        previousValue[currentValue._id] = currentValue;
        return previousValue;
      }, {});
    })
    .catch(error => {
      logger.error(error);
      return {};
    });
}

function getBoardWithColumnsAndTasks(board) {
  const boardId = board._id;

  return getColumnsForBoard(boardId)
    .then(columns => {
      const boardWithColumns = {
        ...board,
        columns,
      };

      return getTasksForBoard(boardId)
        .then(tasks => {
          return {
            ...boardWithColumns,
            tasks,
          };
        });
    });
}

module.exports = getBoardWithColumnsAndTasks;
