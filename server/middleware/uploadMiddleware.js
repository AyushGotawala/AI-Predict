const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadePath = path.join(__dirname,'..','public','uploads');
if(!fs.existsSync(uploadePath)){
  fs.mkdirSync(uploadePath,{recursive : true});
}
console.log(uploadePath);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadePath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

module.exports = upload;