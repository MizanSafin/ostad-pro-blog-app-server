import colors from "colors";
import mongoose from "mongoose";

export const dbConnect = async (req, res) => {
  try {
    let connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo DB connection success`.bgGreen.red);
  } catch (error) {
    console.log(`Error message :${error.message}`.bgRed.yellow);
  }
};
