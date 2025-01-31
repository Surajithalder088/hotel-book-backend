import mongoose from "mongoose";

const serviceSchema= new mongoose.Schema({
  type:{
    type:String,
    require:true,
  },
  hotel:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'hotel',
    require:true
  },
  buyer:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'customer'
  }],
  price:{
    type:Number,
    require:true
  },
  details:{
    type:String,
    require:true
  }
},{timestamps:true})


const service=new mongoose.model('service',serviceSchema);

export default service;