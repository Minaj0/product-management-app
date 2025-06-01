const multer = require('multer');
const path = require('path');


const checkFileType = (file, cb) => {
    const fileTypes = /jpg|png|jpeg|gif|webp/i;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only images (jpeg, jpg, png, gif, webp) are allowed!'));
    }
};


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('image', 10);

module.exports = upload;