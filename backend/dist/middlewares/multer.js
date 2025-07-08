"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/'); // ✅ MUST be defined, creates path for saved files
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
// import multer from "multer";
// const storage = multer.diskStorage({
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });
// const upload = multer({ storage });
// export default upload;
