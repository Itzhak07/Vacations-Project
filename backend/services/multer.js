const path = require("path");
const multer = require("multer");
// const fs = require("fs");

// imgPath = `./uploads/${file.originalname + path.extname(file.originalname)}`;

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

// if (fs.existsSync(imgPath)){
//   fs.unlinkSync(imgPath)
// }

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("file");

module.exports = upload;
