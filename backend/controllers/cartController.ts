import { NextFunction, Request, Response } from "express";
import UserModel from "../models/userModel";

// add products to user cart
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get userId from middleware
    const userId = (req as any).userId; // from authUser
    const { itemId, size } = req.body;

    // Validate input
    if (!userId || !itemId || !size) {
      res.status(400).json({ success: false, message: "Missing fields" });
      return
    }

    // Get the user
    const userData = await UserModel.findById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return
    }

    // Clone cartData or create if missing
    const cartData: any = { ...(userData.cartData || {}) };

    // Update the cartData logic
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    // Save updated cartData
    await UserModel.findByIdAndUpdate(userId, { cartData });
    await userData.save();

    res.json({ success: true, message: "Added to Cart" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

// Update user cart
export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const { itemId, size, quantity } = req.body;
        const userData = await UserModel.findById(userId);

        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return
        }

        // Clone existing cartData
        const cartData: any = { ...(userData.cartData || {}) };

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        // Optionally: remove if quantity is 0 or less
        if (quantity <= 0) {
            delete cartData[itemId][size];
            // Remove the itemId if all sizes are empty
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        await UserModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


// Get user cart data
export const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
         // Get userId from middleware
        const userId = (req as any).userId; // from authUser
        // Find user by ID (needs { _id: userId } not just userId)
        const userData = await UserModel.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return
        }

        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });  
    }
};
