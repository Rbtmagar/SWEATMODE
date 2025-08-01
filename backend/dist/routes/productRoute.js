"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("../middlewares/multer"));
const adminAuth_1 = __importDefault(require("../middlewares/adminAuth"));
const productRouter = express_1.default.Router();
productRouter.post('/add', adminAuth_1.default, multer_1.default.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), productController_1.addProduct);
productRouter.post('/remove', adminAuth_1.default, productController_1.removingProduct);
productRouter.post('/info', productController_1.productInfo);
productRouter.get('/list', productController_1.listProducts);
exports.default = productRouter;
