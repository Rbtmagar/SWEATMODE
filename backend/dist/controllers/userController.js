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
};
exports.loginUser = loginUser;
// Route for user registration
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // checking user already exists
        const exists = await userModel_1.default.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        // validating email format & strong password
        if (!validator_1.default.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        // hashing user password
        const salt = await bcrypt_1.default.genSalt(9);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = new userModel_1.default({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(String(user._id));
        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};
exports.registerUser = registerUser;
// Route for admin Login
const adminLogin = async (req, res) => {
};
exports.adminLogin = adminLogin;
