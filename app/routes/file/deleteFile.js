const axios = require('axios');

const deleteFile = (assetId) => {
  return new Promise((resolve, reject) => {
    axios.delete(assetId)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = deleteFile;
