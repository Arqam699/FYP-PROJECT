
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
 const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connected");
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
export default connectDb;

