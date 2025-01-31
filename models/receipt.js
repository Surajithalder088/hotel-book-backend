import mongoose from "mongoose";

const receiptSchema= new mongoose.Schema({
    type:{
        type:String,
        require:true,
      },
      service:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"service",
        require:true
      },
      buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        require:true
      },
      price:{
        type:Number,
        require:true
      },
      details:{
        type:String,
        require:true
      }
},{timestamps:true})


const receipt=new mongoose.model('receipt',receiptSchema);

export default receipt;