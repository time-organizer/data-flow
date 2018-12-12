const formidable = require('formidable');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const uuidv4 = require('uuidv4');

const { GCS_CREDENTIALS_PATH } = process.env;

const storage = new Storage({
  projectId: 'time-organizer-223723',
  keyFilename: GCS_CREDENTIALS_PATH,
});

const bucket = storage.bucket('time-organizer');
const URL_BASE = 'https://storage.googleapis.com/time-organizer/';

const uploadFile = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (parseError, fields, reqFiles) => {
    const { userId } = req;
    const file = reqFiles.file;
    const fileName = `${userId}${uuidv4()}${file.name}`;
    const files = bucket.file(fileName);

    if (parseError) {
      res.status(500).send({ message: 'Could not parse file' });
    }

    fs.createReadStream(file.path)
      .pipe(files.createWriteStream({
        metadata: {
          contentType: file.type,
        },
      }))
      .on('error', () => {
        res.status(500).send({
          message: 'There was a problem with updating the file',
        });
      })
      .on('finish', () => {
        req.assetId = `${URL_BASE}${fileName}`;
        next();
      });
  });
};

module.exports = uploadFile;
