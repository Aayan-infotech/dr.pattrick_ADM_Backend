// middleware/upload.js
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const mime = require('mime-types'); // to automatically detect MIME types

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv()
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const filename = Date.now() + '-' + file.originalname;
            cb(null, filename); // Unique name for the file
        },
        contentType: (req, file, cb) => {
            const contentType = mime.lookup(file.originalname); // Automatically detect the content type
            cb(null, contentType); // Set the correct content type for S3
        }
    })
});

module.exports = upload;
