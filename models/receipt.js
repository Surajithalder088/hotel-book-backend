import mongoose from "mongoose";

const receiptSchema= new mongoose.Schema({
    type:{
        type:String,
        require:true,
      },
      paid:{
        type:Boolean,
        default:false,
        required:true
      },
      reviewed:{
        type:Boolean,
        default:false,
        required:true
      },
      serviceId:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"service",
       
      }],
      hotelName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
      
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
      details:[{
        type:String,
        
      }]
},{timestamps:true})


const receipt=new mongoose.model('receipt',receiptSchema);

export default receipt;