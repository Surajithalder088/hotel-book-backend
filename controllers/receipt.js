import serviceModel from "../models/service.js";
import customerModel from "../models/customer.js";
import receiptModel from "../models/receipt.js";
import hotelModel from '../models/hotel.js'
import receipt from "../models/receipt.js";

export const receiptCreate=async(req,res)=>{
    try{
        const userEmail=req.user.email
       const user =await customerModel.findOne({email:userEmail})
      
       
       if(!user){
        return  res.status(404).json({message:"user not found"})
       }
       const {hotelId}=req.params
       const {type,price,services,details}=req.body // services and details are array data type

       const hotel =await hotelModel.findOne({_id:hotelId})
       if(!hotel){
        return  res.status(404).json({message:"hotel not found"})
       }
       const receipt=await receiptModel.create({
        type:type,
        serviceId:services,
        hotelName:hotel._id,
        buyer:user._id,
        price:price,
        details:details
    })
    if(!receipt){
        return  res.status(400).json({message:"failed to generate new receipt"})
    }
   // user.takenServices.push(services)
    user.receipts.push(receipt._id)
    await user.save()

    /* this technique is wrong it should be  updated*/
   
         /* this technique is wrong it should be  updated*/
        
            res.status(200).json({message:"receipt created",user,receipt})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}

export const receiptAll=async(req,res)=>{
    try{ 
        const userEmail=req.user.email
        const user =await customerModel.findOne({email:userEmail})
        if(!user){
         return  res.status(404).json({message:"user not found"})
        }
        const receipts= await receiptModel.find({buyer:user._id})
        if(!receipts){
            return  res.status(404).json({message:"receipt not found"})
           }
           
            res.status(200).json({message:"receipt all found",receipts})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}

export const receiptById=async(req,res)=>{
    try{
        const {id}=req.params
        const receipt= await receiptModel.findOne({_id:id})
        if(!receipt){
            return  res.status(404).json({message:"receipt  by id not found"})
        }
        const hotelid=receipt.hotelName;
        const hotel=await hotelModel.findOne({_id:hotelid})
        const services=await serviceModel.find({_id:{$in:receipt.serviceId}})
        if(!hotel || !services){
            return  res.status(404).json({message:"failed to get hotel and services"})
        }
            res.status(200).json({message:"receipt  by id found",receipt,hotel,services})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}

export const receiptPay=async(req,res)=>{
    try{     const {id}=req.params
    const receipt= await receiptModel.findOne({_id:id})
    if(!receipt){
        return  res.status(404).json({message:"receipt  by id not found"})

    }
    receipt.paid=true;
    await receipt.save();
        res.status(200).json({message:" payment done receipt ",receipt})
       
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}