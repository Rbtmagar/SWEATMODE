"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    mongoose_1.default.connection.on('connected', () => {
        console.log("DB Connected");
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.error("MongoDB connection error:", err);
    });
    await mongoose_1.default.connect(`${process.env.MONGODB_URI}/SweatMode`);
};
exports.default = connectDB;
