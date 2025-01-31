import mongoose from "mongoose";

const customerSchema= new mongoose.Schema({
  email:{
    type:String,
    require:true,
    unique:true,

  },
  password:{
    type:String,
    require:true
  },
  takenServices:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:'service'
  }],
  receipts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'receipt'
  }]
},{timestamps:true})


const customer=new mongoose.model('customer',customerSchema);

export default customer;