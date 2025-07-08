import express from "express";
import { listProducts, addProduct, removingProduct, productInfo } from '../controllers/productController';
import upload from '../middlewares/multer';
import adminAuth from "../middlewares/adminAuth";

const productRouter = express.Router();

productRouter.post(
    '/add',adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addProduct
);


productRouter.post('/remove',adminAuth, removingProduct);
productRouter.post('/info', productInfo);
productRouter.get('/list', listProducts);

export default productRouter;
