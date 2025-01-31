import mongoose from "mongoose";

 const connectDB=async()=>{
   await mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(" database  connected");
    
   }).catch((error)=>{
    console.log(" error to connect databse:",error);
    
   })
}

export default connectDB;