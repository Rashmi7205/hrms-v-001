import Router from 'express';
import { authorizeUser, getMyProfile, loginUser } from '../controller/auth.controller.js';
import isAuthorizedUser from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/',authorizeUser);
authRouter.post('/login',loginUser);
authRouter.get('/my-profile',isAuthorizedUser,getMyProfile);

export default authRouter;