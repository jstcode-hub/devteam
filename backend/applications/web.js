import userRouter from '../routes/userRoutes.js';

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

export const web = express();

web.use(express.json());
web.use(cookieParser());

web.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

web.use('/users', userRouter);
