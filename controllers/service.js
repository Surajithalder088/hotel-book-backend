import customerModel from "../models/customer.js";
import hotelModel from "../models/hotel.js";
import serviceModel from "../models/service.js";


export const allServices=async(req,res)=>{
   try{
      const allServices= await serviceModel.find().populate('hotel')
      if(!allServices){
        return res.status(500).json({message:"No services available"})
      }
    res.status(200).json({message:"all services",allServices})
   }catch(error){
    res.status(500).json({message:"internal server error",error})
   }
}
export const serviceById=async(req,res)=>{
    try{
      const {id}=req.params
      const service= await serviceModel.findById(id).populate('hotel')
      if(!service){
       return  res.status(400).json({message:"service not found"})
      }
     res.status(200).json({message:" service by id",service})
    }catch(error){
     res.status(500).json({message:"internal server error",error})
    }
 }
 export const serviceCreate=async(req,res)=>{
    try{
      const hotelId=req.params.hotelId;
      const hotel=await hotelModel.findById(hotelId);
      if(!hotel){
        return res.status(400).json({message:"hotel not valid"})
      }
      const {type,price,details,name}=req.body;
      if(!type || !price || !details){
         return res.status(400).json({message:"all field are required"})
       }
      const newService= await serviceModel.create({type,name,price,details,hotel:hotelId})
      hotel.services.push(newService._id);
      await hotel.save()

     res.status(201).json({message:" service create",newService,hotel})
    }catch(error){
     res.status(500).json({message:"internal server error",error})
    }
 }
 export const updateService=async(req,res)=>{
    try{
      const {id}=req.params
      const service=await serviceModel.findById(id)
      if(!service){
        return res.status(400).json({message:"No service found"})
      }
      const {price,details}=req.body
      if(!price || !details){
         return res.status(400).json({message:" all fiels must be filled"})
       }
      service.price=price
      service.details=details
      await service.save()
     res.status(200).json({message:" service updated",service})
    }catch(error){
     res.status(500).json({message:"internal server error",error})
    }
 }

 export const deleteService=async(req,res)=>{
    try{
      const {id}=req.params
      const service=await serviceModel.findByIdAndDelete(id)
      if(!service){
        return res.status(400).json({message:"No service found"})
      }
     res.status(200).json({message:" service deleted",service})
    }catch(error){
     res.status(500).json({message:"internal server error",error})
    }
 }