import Router from 'express';
import isAuthorizedUser from '../middleware/auth.middleware.js';
import { createNewEmployee, saveEmpDocumentDetails } from '../controller/emp.controller.js';
import upload from '../middleware/multer.middleware.js';
const empRouter = Router();
empRouter.post('/create',isAuthorizedUser,createNewEmployee);
empRouter.post('/upload-doc',isAuthorizedUser,upload.any('documents'),saveEmpDocumentDetails);
export default empRouter;