import express from "express";
import "dotenv/config.js"
const app= express();
import cors from "cors"
import cookieParser from "cookie-parser";
import  connectDB  from "./batabase/batabase.js";
import customerRoute from "./routes/customer.js"
import hotelRoute from "./routes/hotel.js"
import serviceRoute from "./routes/service.js"
import receiptRoute from "./routes/receipt.js"

connectDB();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials:true,
    methods:"GET,POST,PUT,DELETE"
}))
app.use('/api/customer',customerRoute)
app.use('/api/hotel',hotelRoute)
app.use('/api/service',serviceRoute)
app.use('/api/receipt',receiptRoute)
app.get("/",(req,res)=>{
    res.send(" working")
})

export default app;