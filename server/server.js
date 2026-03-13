import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import https from 'https';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'https://mern-auntentication.vercel.app'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("API Working Perfectly!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

    // Keep alive - ping every 14 minutes to prevent Render sleeping
    setInterval(() => {
        https.get('https://mern-auntentication-1.onrender.com', (res) => {
            console.log(`Keep alive ping: ${res.statusCode}`)
        }).on('error', (err) => {
            console.log('Ping error:', err.message)
        })
    }, 14 * 60 * 1000)
});