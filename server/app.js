import express, { urlencoded } from 'express';
import cors from 'cors';
import { HTTP } from './constants.js';
import errorMiddleWare from './middleware/error.middleware.js';
import authRouter from './routes/auth.router.js';
import healthCheckRoute from './routes/healthCheck.js';
import cookieParser from 'cookie-parser';
import empRouter from './routes/emp.routes.js';
import morgan from 'morgan';
import JobRouter from './routes/job.routes.js';
import ApplicantRouter from './routes/applicant.routes.js';


const app = express();

app.use(morgan('combined'));
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit:'50mb',extended:true}));


app.use('/api/v1',healthCheckRoute);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/emp',empRouter);
app.use('/api/v1/job',JobRouter);
app.use('/api/v1/applicant',ApplicantRouter);


app.use('*',async (req,res)=>{
  res.status(HTTP.BAD_GATEWAY).json({
    message: 'Route not found',
  });
});

app.use(errorMiddleWare);


export default app;