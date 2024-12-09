import express, { urlencoded } from 'express';
import cors from 'cors';
import { HTTP } from './constants.js';
import errorMiddleWare from './middleware/error.middleware.js';
import authRouter from './routes/auth.router.js';
import healthCheckRoute from './routes/healthCheck.js';
import cookieParser from 'cookie-parser';
import empRouter from './routes/emp.routes.js';


const app = express();

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


app.use('*',async (req,res)=>{
  res.status(HTTP.BAD_GATEWAY).json({
    message: 'Route not found',
  });
});

app.use(errorMiddleWare);


export default app;