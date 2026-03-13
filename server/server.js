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

// Define allowed origins clearly
const allowedOrigins = [
    'http://localhost:5173', 
    'https://mern-auntentication.vercel.app'
];

app.use(express.json());
app.use(cookieParser());

// CORS configuration for cross-origin cookies
app.use(cors({ 
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true 
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("API Working Perfectly!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

    // Keep alive - ping every 14 minutes to prevent Render sleeping
    // Make sure the URL here is exactly your Render backend URL
    setInterval(() => {
        https.get('https://mern-auntentication-1.onrender.com', (res) => {
            console.log(`Keep alive ping: ${res.statusCode}`)
        }).on('error', (err) => {
            console.log('Ping error:', err.message)
        })
    }, 14 * 60 * 1000)
});