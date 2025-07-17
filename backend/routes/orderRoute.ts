import express from "express";
import { placeOrder, placeOrderVisa, placeOrderPayPal, allOrders, userOrders, updateStatus } from "../controllers/orderController";
import adminAuth from "../middlewares/adminAuth";
import authUser from "../middlewares/auth";


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/visa',authUser,placeOrderVisa)
orderRouter.post('/paypal',authUser,placeOrderPayPal)

// User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;

