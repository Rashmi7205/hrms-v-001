import User from '../schema/user.schema.js';
import { getClerkUser } from '../utils/clerk.auth.js';
import ServerError from '../utils/server.error.js';
import jwt from 'jsonwebtoken';


const cookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: true
}

const loginUser = async (req,res,next)=>{
  try {
    const {user_id} = req.body;
    if(!user_id){
      return next(new ServerError(400,"User Id Required"));
    }
    const user = await User.findOne({clerk_id:user_id});
    if(!user){
      return next(new ServerError(400,"User Does'nt exist"));
    }
    const cookieToken = jwt.sign({ clerk_id: user.clerk_id, email:user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('hrmAuthToken', cookieToken, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Logged In Successfully"
    });
  } catch (error) {
    return next(new ServerError(501,"Internal Server Error"));
  }
}


const authorizeUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(new ServerError(401, "User Id is Required"));
    }
    const user = await getClerkUser(userId);
    if (!user) {
      return next(new ServerError(401, 'Invalid User ID'));
    }
    const isUserExist = await User.findOne({ email: user.email_addresses[0].email_address });
    if (isUserExist) {
      return next(new ServerError(401, 'User Already Exist'))
    }
    const newUser = await User.create({
      clerk_id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      username: user.username,
      email: user.email_addresses[0].email_address,
      phone_numbers: user.phone_numbers,
      profile_img_url: user.profile_img_url,
      last_sign_in_at: user.last_sign_in_at
    });

    await newUser.save();
    if (!newUser) {
      return next(new ServerError(401, "Failed Create User"));
    }
    const cookieToken = jwt.sign({ clerk_id: user.id, email: user.email_addresses[0].email_address }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('hrmAuthToken',cookieToken,cookieOptions);
    res.status(200).json({
      success: true,
      message: "User Created Successfully"
    });
  } catch (error) {
    return next(new ServerError(501, "Interal Server Error"));
  }
}
const getMyProfile = async (req,res,next)=>{
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
      return next(new ServerError(501,"Interal Server Error"));
  }
}


export {
  authorizeUser,
  getMyProfile,
  loginUser
}
