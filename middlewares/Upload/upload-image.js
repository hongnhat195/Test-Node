const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); //set chỗ lưu file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // đặt lại tene cho file
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extensionImg = [".png", ".jpg", ".bmp", "jpeg"];
    const extension = file.originalname.slice(-4);
    const check = extensionImg.includes(extension);
    if (check) {
      cb(null, true);
    } else {
      cb(new Error("Invalid"));
    }
  },
  limits: { fileSize: 1 * 512 * 512 },
});
export { upload };
