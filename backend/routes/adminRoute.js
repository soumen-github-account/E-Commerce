import express from 'express'

import { getAllUser } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/all-user',getAllUser)



export default adminRouter