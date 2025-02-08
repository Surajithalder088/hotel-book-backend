import hotelModel from "../models/hotel.js"
import serviceModel from "../models/service.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config.js"



export const register=async (req,res)=>{
    const {name,email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"all field required"})
    }
    try{
        const existingUser=await hotelModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:"user already exist"})
        }
        const hashPassword= await bcrypt.hash(password,10)
        const newUser= await hotelModel.create({name,email,password:hashPassword})
        const token=jwt.sign({email:newUser.email},process.env.JWT_SECRET,{expiresIn:'24h'})
        
       
        res.status(201).cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:60*60*24*1000,
        }).json({message:"new customer created ",newUser,token})


    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }

    
}
export const login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"all field required"})
    }
    try{
        const existingUser=await hotelModel.findOne({email:email})
        if(!existingUser){
            return res.status(400).json({message:"user does not  exist"})
        }
        const matched= await bcrypt.compare(password,existingUser.password)
        if(!matched){
            return res.status(400).json({message:"wrong credentials"})
        }
        const token=jwt.sign({email:existingUser.email},process.env.JWT_SECRET,{expiresIn:'24h'})
        
       
        res.status(200).cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:60*60*24*1000,
        }).json({message:" user loggedin",token,existingUser})


    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }

    
}

export const profile=async (req,res)=>{

    const user=req.user ||"hhhhhh"
    try{
const authUser= await hotelModel.findOne({email:user.email})
    if(!authUser){
        return res.status(400).json({message:" user not find"})
     }

     const services=await serviceModel.find({hotel:authUser._id})
     if(!services){
        return res.status(400).json({message:" service not find"})
     }
    res.status(200).json({authUser:authUser,services})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
    
    
}


export const hotelById=async (req,res)=>{

    const {id}=req.params 
    
    
    try{
const hotel= await hotelModel.findOne({_id:id})
    if(!hotel){
        return res.status(400).json({message:"hotel not find"})
     }
     
     
     const services=await serviceModel.find({hotel:hotel._id}).sort({createdAt:-1})
     if(!services){
        return res.status(400).json({message:" service not find"})
     }
    res.status(200).json({hotel:hotel,services})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
    
    
}