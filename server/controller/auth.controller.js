import User from '../schema/user.schema.js';
import { getClerkUser } from '../utils/clerk.auth.js';
import ServerError from '../utils/server.error.js';

const authorizeUser = async (req, res, next) => {
  try {
    const {userId} = req.body;
    if (!userId) {
      return next(new ServerError(401,"User Id is Required"));
    }
    const user = await getClerkUser(userId);
    if (!user) {
      return next(new ServerError(401,'Invalid User ID' ));
    }
    const newUser  = await User.create({
      clerk_id:user.id,
      firstname:user.first_name,
      lastname:user.last_name,
      username:user.username,
      email: user.email_addresses[0].email_address,
      phone_numbers:user.phone_numbers,
      profile_img_url:user.profile_img_url,
      last_sign_in_at: user.last_sign_in_at
    });

    await newUser.save();
    if(!newUser){
      return next(new ServerError(401,"Failed Create User"));
    }
    res.status(200).json({
      success:true,
      message:"User Created Successfully"
    });
  } catch (error) {
    return next(new ServerError(501,"Interal Server Error"));
  }
}

export{
  authorizeUser
}
