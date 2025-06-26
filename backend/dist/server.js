"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const cloudinary_1 = __importDefault(require("./config/cloudinary"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
// App Config
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, mongodb_1.default)();
(0, cloudinary_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// api endpoints
app.use('/api/user', userRoute_1.default);
app.get('/', (req, res) => {
    res.send('API is running');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
