import express, { urlencoded } from 'express';
import cors from 'cors';
import { HTTP } from './constants.js';
import healthCheckRoute from './routes/health-check/healthCheck.js';
import errorMiddleWare from './middleware/error.middleware.js';


const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ limit:'50mb',extended:true}));

app.use(healthCheckRoute);

app.use('*',async (req,res)=>{
  res.status(HTTP.BAD_GATEWAY).json({
    message: 'Route not found',
  });
});

app.use(errorMiddleWare);


export default app;