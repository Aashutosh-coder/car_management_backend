const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('File destination set');
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log('File received:', file.originalname);
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max size
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            console.log('File accepted:', file.mimetype);
            cb(null, true);
        } else {
            console.error('File rejected:', file.mimetype);
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

module.exports = upload;
