"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.registerUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
};
// Route for user login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check for missing fields
        if (!email || !password) {
            res.status(400).json({ success: false, message: "Email and password are required." });
            return; //  Must return to stop further execution
        }
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User doesn't exist" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error")
        });
    }
};
exports.loginUser = loginUser;
// Route for user registration
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Check all fields
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "All fields are required." });
            return;
        }
        // Check if user already exists
        const exists = await userModel_1.default.findOne({ email });
        if (exists) {
            res.status(409).json({ success: false, message: "User already exists" });
            return;
        }
        // Validate email format
        if (!validator_1.default.isEmail(email)) {
            res.status(400).json({ success: false, message: "Please enter a valid email" });
            return;
        }
        // Validate password length
        if (password.length < 8) {
            res.status(400).json({ success: false, message: "Please enter a strong password (min 8 chars)" });
            return;
        }
        // Hash password
        const salt = await bcrypt_1.default.genSalt(9);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Create user
        const newUser = new userModel_1.default({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
    }
};
exports.registerUser = registerUser;
// Route for admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
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
            const token = jsonwebtoken_1.default.sign({ email, role: "admin" }, jwtSecret, {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
    }
};
exports.adminLogin = adminLogin;
