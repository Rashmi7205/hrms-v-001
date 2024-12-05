import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('Db connected successfully at', connection.connection.host);
  } catch (error) {
    console.log("Error in db connection", error.message);
  }
}