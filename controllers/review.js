import customerModel from "../models/customer.js";
import hotelModel from "../models/hotel.js";
import serviceModel from "../models/service.js";
import receiptModel from "../models/receipt.js";
import reviewModel from "../models/review.js"

export const createReview=async(req,res)=>{
    try{
        const{text,ratings,serviceid,receiptId} =req.body
        if(!text || !ratings ||! serviceid ||!receiptId){
           return res.status(400).json({message:'all fields are required'})
        }
        const userEmail=req.user.email
        const user =await customerModel.findOne({email:userEmail})
        if(!user){
         return  res.status(404).json({message:"user not found"})
        }
        const receipt=await receiptModel.findOne({_id:receiptId})
        if(!receipt){
           return res.status(400).json({message:'no receipt exist'})
        }
        if(receipt.reviewed===true){
            return res.status(400).json({message:'review already acccepted for this  receipt'})
         }
         const hotel =await hotelModel.findOne({_id:receipt.hotelName})
         if(!hotel){
            return  res.status(404).json({message:"hotel not found "})
           }
           hotel.starValue +=ratings
           hotel.starQunatity +=1
            await hotel.save()
        const newReview= await reviewModel.create({text,ratings,service:serviceid,receipt:receiptId,user:user._id})
        if(!newReview){
            return  res.status(400).json({message:"review not created"})
           }
           receipt.reviewed=true;
           await receipt.save();

           res.status(201).json({message:"review created",newReview})

    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}
export const reviewByService=async(req,res)=>{
    try{
        const {serviceId}=req.params;
        
        const service=await serviceModel.findOne({_id:serviceId})
        if(!service){
           return res.status(400).json({message:'no service exist'})
        }
        
        
        const reviews= await reviewModel.find({service:service._id})
        if(!reviews){
            return res.status(400).json({message:'no reviews of this service'})
         }

        res.status(200).json({message:"all reviews ",reviews})

    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}
export const reviewByReceipt=async(req,res)=>{
    try{
        const {receiptId}=req.params;
        
        const receipt=await receiptModel.findOne({_id:receiptId})
        if(!receipt){
           return res.status(400).json({message:'no service exist'})
        }
        
        
        const review= await reviewModel.findOne({receipt:receipt._id})
        if(!review){
            return res.status(400).json({message:'no reviews of this service'})
         }

        res.status(200).json({message:"review of this receipt ",review})

    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}