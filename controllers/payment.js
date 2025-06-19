import axios from "axios"
import crypto from"crypto"
import { Cashfree } from "cashfree-pg"

import "dotenv/config.js"
import receipt from "../models/receipt.js"


Cashfree.XClientId=process.env.CASHFREE_APP_ID
Cashfree.XClientSecret=process.env.CASHFREE_SECRET_KEY
Cashfree.XEnvironment=Cashfree.Environment.SANDBOX

const cashfreeappid=process.env.CASHFREE_APP_ID
const cashfreeapiurl=process.env.CASHFREE_API_URL
const cashfreesecretkey=process.env.CASHFREE_SECRET_KEY

// api to create new order

export const createOrder=async(req ,res)=>{

    try {
        const {orderId,amount,customer_name,customer_email,customer_phone}=req.body;
        // const orderData={
        //     order_id:orderId,
        //     order_amount:amount,
        //     order_currency:"INR",
        //     customer_details:{
        //         customer_id:`${Date.now()}`,
        //         customer_name,
        //         customer_email,
        //         customer_phone,
        //     },
        //     order_meta:{
        //         return_url:`http://localhost:3000/payment-success?order_id=${orderId}`,
        //         payment_methods:"cc,dc,upi",
        //     }
        // }
       // console.log("order data",orderData);
        
        // const response= await axios.post(cashfreeapiurl,
        //     orderData,{
        //         headers:{
        //             "Content-Type":"application/json",
        //            "x-api-version":"2022-09-01",
        //            "x-client-id":cashfreeappid,
        //            "x-client-secret":cashfreesecretkey,
        //         }
        //     }
        // );
        // console.log("response",JSON.stringify(response.data));
        const response =await receipt.findByIdAndUpdate({_id:orderId},{paid:true})
        

        res.status(200).json(response)
    } catch (error) {
        console.log("api error",error.response?.data || error);
        
        res.status(500).json({message:"error to create payment order",error})
    }
}


// webhook api to verify payment status

export const paymentWebhook=async(req ,res)=>{
    try {
        const {order_id,cf_payment_id,payment_status}=req.body;
        console.log("webhook received",req.body);

        if(payment_status==="SUCCESS"){
            console.log(`Payment success for order id : ${order_id}, payment id : ${cf_payment_id}`);
          return  res.status(200).json({success:true,message:"payment successful"})
        }else{
            console.log(`payment failedfor order id : ${order_id}`);
            
        }
        res.status(400).json({success:false,message:"Payment failed"})
        
    } catch (error) {
        res.status(500).json({message:"Error to pass webhook",error})
    }
}

function generateOrderId(){
    const uniqueId=crypto.randomBytes(16).toString('hex')

    const hash=crypto.createHash('sha256')
    hash.update(uniqueId)

    const orderId=hash.digest('hex')

    return orderId.substr(0,12)
}

export const payment=async(req ,res)=>{
try {

    let request={
        "order_amount":1.00,
        "order_currency":"INR",
        "order_id":await generateOrderId(),
        "customer_details":{
           "customer_id":"64rvd487r45cv9845bd",
            "customer_email":"test@test.com",
            "customer_name":"test test",
            "customer_phone":"1234566789"
        }
    }

    Cashfree.createOrder
    
} catch (error) {
    
}
}