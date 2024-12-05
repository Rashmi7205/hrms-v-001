import { config } from 'dotenv';
import app from './app.js';
import { connectToDb } from './config/dbConfig.js';

config();


app.listen(process.env.PORT,async()=>{
  await connectToDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});