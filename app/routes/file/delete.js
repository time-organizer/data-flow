const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const verifyToken = require('../../middlewares/verifyToken');
const deleteFile = require('./deleteFile');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.delete('/files/:assetId', verifyToken, (req, res) => {
  const { assetId } = req.params;

  deleteFile(assetId)
    .then(() => {
      res.status(200).send({
        message: 'Successfully deleted file',
      });
    })
    .catch(() => {
      res.status(500).send('Could not remove the file');
    });
});

module.exports = router;
