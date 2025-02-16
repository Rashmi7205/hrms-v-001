import express from 'express';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} from '../controller/job.controller.js';
import isAuthorizedUser from '../middleware/auth.middleware.js';

const JobRouter = express.Router();

JobRouter.post('/',isAuthorizedUser, createJob);
JobRouter.get('/',isAuthorizedUser,getJobs);
JobRouter.get('/:id',isAuthorizedUser,getJob);
JobRouter.put('/:id',isAuthorizedUser, updateJob);
JobRouter.delete('/:id',isAuthorizedUser,deleteJob);

export default JobRouter;