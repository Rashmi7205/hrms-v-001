import Router from 'express';
import isAuthorizedUser from '../middleware/auth.middleware.js';
import { createNewEmployee, deleteEmpById, getEmpById, saveEmpDocumentDetails, updateEmployeeDetails } from '../controller/emp.controller.js';
import upload from '../middleware/multer.middleware.js';
const empRouter = Router();
empRouter.post('/create',isAuthorizedUser,createNewEmployee);
empRouter.post('/upload-doc',isAuthorizedUser,upload.any('documents'),saveEmpDocumentDetails);
// empRouter.get('/docs',isAuthorizedUser,getSavedDocuments);
empRouter.get("/:id",isAuthorizedUser,getEmpById);
empRouter.post("/update/:id",isAuthorizedUser,updateEmployeeDetails);
empRouter.delete("/delete/:id",isAuthorizedUser,deleteEmpById);

export default empRouter;