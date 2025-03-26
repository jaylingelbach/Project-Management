import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

 dotenv.config();
  
 const connectDB = async () => {
   try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
  
     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
   } catch (error) {
     console.error(`Error: ${error.message}`.red.underline.bold);
     process.exit(1);
   }
 };

 export default connectDB;