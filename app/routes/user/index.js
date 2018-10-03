const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const gm = require('gm');
const uuid = require('uuid');
const User = require('../../models/User');
const verifyToken = require('../../middlewares/verifyToken');

function createUserDirectoryIfNotExist(id) {
  if (!fs.existsSync(`./assets/${id}`)) {
    fs.mkdirSync(`./assets/${id}`);
  }
}

function replaceUserAvatar(res, id, path) {
  User.findById(id, (findError, user) => {
    const oldAvatar = _.get(user, 'avatar', null);

    User.findByIdAndUpdate(id, { avatar: path }, { new: true },
      (updateError, user) => {
        if (updateError) {
          res.status(500).send({
            message: 'There was a problem with updating user avatar.',
          });
        }

        if (oldAvatar) {
          fs.unlink(`./assets/${id}/${oldAvatar.assetId}`, error => {
            if (error) {
              console.warn('File doesnt exist');
            }
          });
        }
        res.status(200).send(user);
      });
  });
}

router.put('/avatar', verifyToken, (req, res) => {
  const form = new formidable.IncomingForm();
  const { userId } = req;

  form.parse(req, (parseError, fields, files) => {
    if (parseError) {
      res.status(500).send({ message: 'Could not parse file' });
    }

    createUserDirectoryIfNotExist(userId);

    const oldPath = files.file.path;
    const assetId = _.get(files, 'file.name', uuid());

    const newPath = `./assets/${userId}/${assetId}`;

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        throw err;
      }

      gm(newPath).size((err, size) => {
        if (!err) {
          replaceUserAvatar(res, userId, {
            assetId,
            size,
          });
        }
      });
    });
  });
});

module.exports = router;
