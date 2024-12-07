import Router from 'express';
import { authorizeUser } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post('/',authorizeUser);

export default authRouter;