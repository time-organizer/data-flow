const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Label = require('../../models/Label');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/labels/:boardId', (req, res) => {
  const { boardId } = req.params;
  const {
    title,
    startingDate,
    dueDate,
    color,
  } = req.body;

  const newLabel = {
    boardId,
    title,
    startingDate,
    dueDate,
    color,
    createdAt: new Date(),
  };

  Label.find({ title, boardId })
    .then((results) => {
      if (results.length > 0) {
        res.status(409).send({ message: 'Label with that title already exists' });
        return;
      }

      Label.create(newLabel)
        .then(createdLabel => {
          res.status(200).send(createdLabel);
        })
        .catch((error) => {
          console.warn(error);
          res.status(500).send({ message: 'Server error' });
        });
    })
    .catch((error) => {
      console.warn(error);
      res.status(500).send({ message: 'Server error' });
    });
});

module.exports = router;
