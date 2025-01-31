import serviceModel from "../models/service.js";
import customerModel from "../models/customer.js";
import receiptModel from "../models/receipt.js";

export const receiptCreate=async(req,res)=>{
    try{
            res.status(200).json({message:"receipt created"})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}

export const receiptAll=async(req,res)=>{
    try{
            res.status(200).json({message:"receipt all found"})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}

export const receiptById=async(req,res)=>{
    try{
            res.status(200).json({message:"receipt  by id found"})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}

export const receiptDelete=async(req,res)=>{
    try{
            res.status(200).json({message:"receipt  deleted"})
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
}