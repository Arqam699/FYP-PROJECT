import mongoose from "mongoose";

const connectDB =()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
         console.log("Mongodb connected Successfully.")
    }).catch((err)=>{
        console.log(`connection error ${err}`)
    })
}
export default connectDB;  


