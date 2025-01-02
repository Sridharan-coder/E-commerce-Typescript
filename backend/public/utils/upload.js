"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', "..", 'uploads');
// Create the uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpg|jpeg|png/;
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimeTypes.includes(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        const error = new Error('Invalid file type.Images are allowed.');
        error.statusCode = 400;
        cb(error);
    }
};
exports.upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: fileFilter
}).single('file');
module.exports = { upload: exports.upload };
