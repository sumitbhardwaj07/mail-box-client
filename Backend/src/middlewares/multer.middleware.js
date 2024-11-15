

import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file if type is allowed
    } else {
        cb(new Error("Unsupported file format"), false); // Reject file if type is not allowed
    }
};

export const upload = multer({storage, fileFilter});