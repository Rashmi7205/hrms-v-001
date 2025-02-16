import ServerError from '../utils/server.error.js';
import jwt from 'jsonwebtoken';
const isAuthorizedUser = async(req,res,next)=>{
  try {
      const {hrmAuthToken} = req.cookies;
      const user =jwt.verify(hrmAuthToken,process.env.JWT_SECRET);
      req.user = user;
      next();
  } catch (error) {
    return next(new ServerError(401,'You are not authorized to access this route'));
  }
}

export default isAuthorizedUser;