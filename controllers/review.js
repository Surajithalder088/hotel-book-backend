import customerModel from "../models/customer.js";
import hotelModel from "../models/hotel.js";
import serviceModel from "../models/service.js";
import receiptModel from "../models/receipt.js";

export const createReview=async(req,res)=>{
    try{
        res.send("review created")

    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}
export const reviewByService=async(req,res)=>{
    try{
        res.send("review by service")

    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}
export const reviewByReceipt=async(req,res)=>{
    try{
        res.send("review by receipt")

    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}