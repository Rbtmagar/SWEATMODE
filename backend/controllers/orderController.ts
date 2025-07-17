import { NextFunction, Request, Response } from "express";
import orderModel from '../models/orderModel';
import UserModel from "../models/userModel";


// Placing order COT method
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;
    if (!userId || !items || !amount || !address || !paymentMethod) {
      res.status(400).json({ success: false, message: "Missing fields" });
      return
    }
    if (!Array.isArray(items) || typeof amount !== "number" || typeof paymentMethod !== "string") {
      res.status(400).json({ success: false, message: "Invalid fields" });
      return
    }

    const order = new orderModel({
      userId,
      items,
      amount,
      address,
      status: 'Order Placed',
      paymentMethod, // Use whatever is passed
      payment: false,
      date: Date.now(),
    });

    await order.save();
    // const newOrder = new orderModel(order)
    // await newOrder.save()
    
    // Clear the user's cart after placing order
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: "Order placed successfully", order });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};



// Placing order using Visa Card
export const placeOrderVisa = async (req: Request, res: Response, next:NextFunction) => {

}

// Placing order using PayPal
export const placeOrderPayPal = async (req: Request, res: Response, next:NextFunction) => {

}


// All Orders Data for Admin Panel
export const allOrders = async (req: Request, res: Response, next:NextFunction) => {

}

// User Order Data For Frontend
export const userOrders = async (req: Request, res: Response, next:NextFunction) => {

}

// update order status from Admin Panel
export const updateStatus = async (req: Request, res: Response, next:NextFunction) => {

}