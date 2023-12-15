import { Router } from 'express';
import { signup } from '../controllers/userControllers.js';

const userRouter = Router();

userRouter.post('/signup', signup);
// userRouter.post('/login', login);

export default userRouter;
