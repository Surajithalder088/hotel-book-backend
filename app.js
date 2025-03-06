import express from "express";
import "dotenv/config.js"
const app= express();
import cors from "cors"
import Stripe from 'stripe'
import cookieParser from "cookie-parser";
import  connectDB  from "./batabase/batabase.js";
import customerRoute from "./routes/customer.js"
import hotelRoute from "./routes/hotel.js"
import serviceRoute from "./routes/service.js"
import receiptRoute from "./routes/receipt.js"
import reviewRoute from "./routes/review.js"

connectDB();

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"https://sito-hotel-service.vercel.app", // while production there willl be only one route
    credentials:true,
    methods:"GET,POST,PUT,DELETE"
}))




// api to createpayment intent
app.post('/create-payment-intent',async(req,res)=>{
    const {amount}=req.body
    try {
        const paymentIntent=await stripe.paymentIntents.create({
            amount:100,// 100 cents == 1 $
            currency:'usd',
            payment_method_types:["card"]
        })
        res.status(200).json({clientSecret:paymentIntent.client_secret})
    } catch (error) {
        res.status(400).json({message:"payment intent failed ",error})
    }

})

app.use('/api/customer',customerRoute)
app.use('/api/hotel',hotelRoute)
app.use('/api/service',serviceRoute)
app.use('/api/receipt',receiptRoute)
app.use('/api/review',reviewRoute)
app.get("/",(req,res)=>{
    res.send(" working")
})



export default app;