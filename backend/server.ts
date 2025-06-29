// server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb';
import connectCloudinary from './config/cloudinary';
import userRouter from './routes/userRoute';

dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB()
connectCloudinary()

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
