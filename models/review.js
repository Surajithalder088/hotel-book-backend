import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
           ref:'customer'
    },
    service:[{
         type:mongoose.Schema.Types.ObjectId,
            ref:'service'
    }],
    receipt:{
         type:mongoose.Schema.Types.ObjectId,
            ref:'receipt'
    },
    text:{
        type:String,
        require:true
    },
    ratings:{
        type:Number,
        require:true
    }

},{timestamps:true})

const review=new mongoose.model('review',reviewSchema);

export default review;