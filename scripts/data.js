// eslint-disable-file
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;
const lorem = require('./lorem');

const getTaskTitles = taskIds => taskIds.map(() => {
  const textLength = lorem.length;
  const maxTaskNameLength = 40;
  const minTaskNameLength = 10;

  const startingIndex = Math.floor(Math.random() * (textLength - maxTaskNameLength));
  const endingIndex = startingIndex + Math.floor(Math.random() * (maxTaskNameLength - minTaskNameLength)) + minTaskNameLength;

  return lorem.substring(startingIndex, endingIndex);
});

const userEmail = 'dev';
const userId = new ObjectID();
const boardId = new ObjectID();

const columnsIds = Array.from(Array(5)).map(() => new ObjectID());
const columnsTitles = ['BACKLOG', 'TO DO', 'IN PROGRESS', 'TESTING', 'COMPLETE'];
const columnTypes = ['BACKLOG', 'BACKLOG', 'IN_PROGRESS', 'IN_PROGRESS', 'COMPLETE'];

const labelsIds = Array.from(Array(10)).map(() => new ObjectID());
const labelsTitles = ['Critical bug', 'Bug', 'Enhancement', 'To be tested', 'Redo', 'Low priority', 'Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];
const labelsColors = ['#4d79a7', '#f28e2c', '#e15659', '#76b7b2', '#59a14e', '#eec849', '#af79a1', '#ff9da8', '#9d7460', '#bbafac'];

const numberOfTasks = 50;
const tasksIdsCol1 = Array.from(Array(numberOfTasks)).map(() => new ObjectID());
const tasksIdsCol2 = Array.from(Array(numberOfTasks)).map(() => new ObjectID());
const tasksIdsCol3 = Array.from(Array(numberOfTasks)).map(() => new ObjectID());
const tasksIdsCol4 = Array.from(Array(numberOfTasks)).map(() => new ObjectID());
const tasksIdsCol5 = Array.from(Array(numberOfTasks)).map(() => new ObjectID());

const columnTasksOrders = [
  tasksIdsCol1.map(taskId => taskId.toString()),
  tasksIdsCol2.map(taskId => taskId.toString()),
  tasksIdsCol3.map(taskId => taskId.toString()),
  tasksIdsCol4.map(taskId => taskId.toString()),
  tasksIdsCol5.map(taskId => taskId.toString()),
];
const allTasksIds = [
  ...tasksIdsCol1,
  ...tasksIdsCol2,
  ...tasksIdsCol3,
  ...tasksIdsCol4,
  ...tasksIdsCol5,
];
const alltasksTitles = getTaskTitles(allTasksIds);
const getColumnId = (index) => {
  if(index < numberOfTasks) {
    return columnsIds[0];
  }
  if(index < 2 * numberOfTasks) {
    return columnsIds[1];
  }

  if(index < 3 * numberOfTasks) {
    return columnsIds[2];
  }

  if(index < 4 * numberOfTasks) {
    return columnsIds[3];
  }

  if(index < 5 * numberOfTasks) {
    return columnsIds[4];
  }
};

module.exports = {
  user: {
    _id: userId,
    email: userEmail,
    password: bcrypt.hashSync('dev', 8),
    createdAt: new Date(),
    name: 'Time organizer dev',
  },
  board: {
    _id: boardId,
    title: 'Lorem ipsum',
    theme: 6,
    ownerId: userId.toString(),
    columns: {},
    columnsOrder: columnsIds.map(columnId => columnId.toString()),
    createdAt: new Date(),
  },
  columns: columnsIds.map((columnId, index) => ({
    _id: columnId,
    title: columnsTitles[index],
    boardId: boardId.toString(),
    createdAt: new Date(),
    tasksOrder: columnTasksOrders[index],
    type: columnTypes[index],
  })),
  labels: labelsIds.map((labelId, index) => ({
    _id: labelId,
    boardId: boardId.toString(),
    title: labelsTitles[index],
    startingDate: new Date(),
    dueDate: new Date(),
    color: labelsColors[index],
    createdAt: new Date(),
  })),
  tasks: allTasksIds.map((taskId, index) => ({
    _id: taskId,
    title: alltasksTitles[index],
    columnId: getColumnId(index).toString(),
    boardId: boardId.toString(),
    createdAt: new Date(),
    ownerId: userId.toString(),
    history: [],
    labels: [labelsIds[Math.floor(Math.random() * labelsIds.length)]],
  }))
};
