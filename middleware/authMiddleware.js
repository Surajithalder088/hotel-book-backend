import jwt from "jsonwebtoken"
import customerModel from "../models/customer.js";
import "dotenv/config.js"

export const verifyUser =async(req,res,next)=>{

    try{
const {token}=req.cookies;


    const user=jwt.verify(token,process.env.JWT_SECRET)
    if(!user){
       return res.status(400).json({message:" token not find"})
    }
  
  
    req.user=user;


    next();
    }catch(error){
        res.status(500).json({message:" error to verify user",error})
    }
    
}