import express from 'express';
import { requireAuth } from '@clerk/express';
import { syncUser } from '../controllers/userController.js';


const userRouter = express.Router();

// Protect the sync route
userRouter.post('/sync', syncUser);

export default userRouter;
