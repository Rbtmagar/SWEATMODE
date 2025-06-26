import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import validator from "validator";
import bcrypt from "bcrypt";


const createToken = (id: string) => {
    return jwt.sign({id},process.env.JWT_SECRET as string)
}

// Route for user login
export const loginUser = async (req:Request, res:Response, next:NextFunction) => {

}

// Route for user registration
export const registerUser = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const { name, email, password} = req.body;
        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        // Check if user already exits
        const exists = await UserModel.findOne({email});
        if (exists) {
            return res.status(400).json({success:false, message:"User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.status(400).json({success:false, message:"Please enter a strong password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(9)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new UserModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(String(user._id))

        res.status(201).json({
            success:true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: (error as Error).message || "Internal server error" });
    }
}

// Route for admin Login
export const adminLogin = async (req:Request, res:Response) => {

}
