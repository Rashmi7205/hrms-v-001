import {Router} from 'express';
import { createApplicant, getAllApplicantList, getAllApplicantListByJobId, getApplicantById, uploadApplicantImage, uploadApplicantResume } from '../controller/app.controller.js';
import upload from '../middleware/multer.middleware.js';
import isAuthorizedUser from '../middleware/auth.middleware.js';

const ApplicantRouter=Router();

ApplicantRouter.post('/:id',createApplicant);
ApplicantRouter.post('/upload-image/:id',upload.single('profile-image'),uploadApplicantImage);
ApplicantRouter.post('/upload-resume/:id',upload.single('resume'),uploadApplicantResume);

ApplicantRouter.get('/:id',isAuthorizedUser,getApplicantById);
ApplicantRouter.get('/',isAuthorizedUser,getAllApplicantList);
ApplicantRouter.get('/job/:id',isAuthorizedUser,getAllApplicantListByJobId);

export default ApplicantRouter;
