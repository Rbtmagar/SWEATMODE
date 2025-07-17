"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Not Authorized. Token missing or invalid format.",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (decoded.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "Access denied. Not an admin.",
            });
            return;
        }
        req.user = decoded; // Add user to request object
        next(); //Move to next middleware/controller
    }
    catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};
exports.default = adminAuth;
