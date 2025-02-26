import mongoose from "mongoose";

const hotelSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    require:true,
    unique:true,

  },
  password:{
    type:String,
    require:true
  },
  address:{
    type:String,
  },
  image:{
    type:String
  },
  starValue:{
    type:Number,
    default:0
},
starQunatity:{
 type:Number,
 default:0
},
  services:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'service'
  }],
  
},{timestamps:true})


const hotel=new mongoose.model('hotel',hotelSchema);

export default hotel;