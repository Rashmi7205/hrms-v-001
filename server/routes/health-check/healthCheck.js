import { Router } from "express";
import { HTTP } from "../../constants.js";
const healthCheckRoute = Router();
healthCheckRoute.get("/health-check",async(req,res)=>{
  try {
    res.status(HTTP.OK).json({
      success:true,
      message:"Server is up and running"
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      success:false,
      message: error.message,
    });
  }
});

export default healthCheckRoute;
