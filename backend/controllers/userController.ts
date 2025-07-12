import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import validator from "validator";
import bcrypt from "bcrypt";


const createToken = (id: string) => {
    return jwt.sign({id},process.env.JWT_SECRET as string)
}

// Route for user login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            res.status(400).json({ success: false, message: "Email and password are required." });
            return;   //  Must return to stop further execution
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User doesn't exist" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const token = createToken(String(user._id));

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error")
        });
    }
};

// Route for user registration
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        // Check all fields
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "All fields are required." });
            return;
        }
        // Check if user already exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            res.status(409).json({ success: false, message: "User already exists" });
            return;
        }
        // Validate email format
        if (!validator.isEmail(email)) {
            res.status(400).json({ success: false, message: "Please enter a valid email" });
            return;
        }
        // Validate password length
        if (password.length < 8) {
            res.status(400).json({ success: false, message: "Please enter a strong password (min 8 chars)" });
            return;
        }
        // Hash password
        const salt = await bcrypt.genSalt(9);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(String(user._id));

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
    }
};

// Route for admin Login
export const adminLogin = async (req:Request, res:Response) => {
    try {
        
        const {email, password} = req.body

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

        if (!adminEmail || !adminPassword || !jwtSecret) {
        res.status(500).json({
        success: false,
        message: "Admin credentials not configured properly",
      });
      return;
    }

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ email, role: "admin" }, jwtSecret, {
        expiresIn: "1d",
      });

    res.status(200).json({
        success: true,
        token,
        message: "Admin login successful",
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
    return;


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
    }
}
