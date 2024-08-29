import express, { urlencoded } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import messageRoute from './routes/message.route.js';
import { app, server } from './socket/socket.js'; // Import the socket module

dotenv.config({})

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
    return res.status(200).json({
        message: "I'm coming from backend",
        success: true
    });
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
