import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// const connectdb = async () => {
//   try {
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.log('MongoDB connection failed:', error.message);
//   }
// };
 async function connectdb() {
   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
} catch (error) {
    console.log('MongoDB connection failed:', error.message);
   }
}
connectdb();
export default connectdb;
