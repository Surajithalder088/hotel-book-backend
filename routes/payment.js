import express from "express"
const router=express.Router()
import {createOrder, payment, paymentWebhook} from "../controllers/payment.js"

router.post("/create-order",createOrder)
router.post("/payment-webhook",paymentWebhook)
router.get("/payment",payment)


export default router;