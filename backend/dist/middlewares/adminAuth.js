"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Token missing.",
            });
        }
        const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not an admin.",
            });
        }
        // Optional: You can attach user info to the request
        req.user = decoded;
        next(); // Move to the next middleware/controller
    }
    catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};
exports.default = adminAuth;
