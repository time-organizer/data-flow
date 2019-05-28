const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Label = require('../../models/Label');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/label', (req, res) => {
  const {
    boardId,
    name,
    dueDate,
  } = req.body;

  const newLabel = {
    boardId,
    name,
    dueDate,
  };

  Label.create(newLabel)
    .then(createdLabel => {
      res.status(200).send(createdLabel);
    })
    .catch((error) => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
