import serviceModel from "../models/service.js";
import customerModel from "../models/customer.js";
import receiptModel from "../models/receipt.js";
import receipt from "../models/receipt.js";

export const receiptCreate=async(req,res)=>{
    try{
        const userEmail=req.user.email
       const user =await customerModel.findOne({email:userEmail})
      
       
       if(!user){
        return  res.status(404).json({message:"user not found"})
       }
       const {serviceId}=req.params

       const service =await serviceModel.findOne({_id:serviceId}).populate('hotel')
       if(!service){
        return  res.status(404).json({message:"service not found"})
       }
       const receipt=await receiptModel.create({
        type:service.type,
        serviceId:service._id,
        hotelName:service.hotel.email,
        buyer:user._id,
        price:service.price,
        details:service.details
    })
    if(!receipt){
        return  res.status(400).json({message:"failed to generate new receipt"})
    }
    user.takenServices.push(service._id)
    user.receipts.push(receipt._id)
    await user.save()
    service.buyer.push(user._id);
    await service.save()
        
            res.status(200).json({message:"receipt created",user,service,receipt})
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
        const serviceid=receipt.serviceId;
        const service=await serviceModel.findOne({_id:serviceid}).populate('hotel')
            res.status(200).json({message:"receipt  by id found",receipt,service})
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