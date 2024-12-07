import mongoose,{model, Schema} from "mongoose";

const UserSchema = new Schema({
  clerk_id: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  phone_numbers: { type: Array(String) },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profile_img_url: { type: String },
  last_sign_in_at: { type: Date }
}, { timestamps: true });
const User = model("User",UserSchema);
export default User;
