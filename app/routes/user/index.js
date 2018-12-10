const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require('fs');
const User = require('../../models/User');
const verifyToken = require('../../middlewares/verifyToken');
const uploadFile = require('../../middlewares/uploadFile');
const deleteFile = require('../file/deleteFile');

function replaceUserAvatar(res, id, path) {
  User.findById(id, (findError, user) => {
    const oldAvatarAssetId = _.get(user, 'avatar.assetId', null);

    User.findByIdAndUpdate(id, { avatar: path }, { new: true },
      (updateError, user) => {
        if (updateError) {
          res.status(500).send({
            message: 'There was a problem with updating user avatar.',
          });
        }

        deleteFile(oldAvatarAssetId)
          .then(() => console.log('Removed successfully'))
          .catch((error) => console.log('Could not remove old avatar', error));

        res.status(200).send(user);
      });
  });
}

router.put('/avatar', verifyToken, uploadFile, (req, res) => {
  const { userId, assetId } = req;

  replaceUserAvatar(res, userId, {
    assetId,
  });
});

module.exports = router;
