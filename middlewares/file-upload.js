import multer from "multer";
import { dirExists } from "../generics/utilities.js";

// SET STORAGE
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    if (req.body.type == "profileUrl") {
      dirExists("assets/images/profiles");
      cb(null, "assets/images/profiles");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/* defined filter */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format"), false);
  }
};

const upload = multer({ fileFilter: fileFilter, storage: diskStorage });

export default upload;
