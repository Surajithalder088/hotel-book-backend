import express from "express"
import {reviewByService,reviewByReceipt,createReview} from "../controllers/review.js"
import { verifyUser } from "../middleware/authMiddleware.js";

const router=new express.Router;

router.get('/reviewbyserviceid/:serviceId',verifyUser ,reviewByService)
router.get('/reviewbyreceiptid/:receiptId',verifyUser ,reviewByReceipt)
router.post('/review-create',verifyUser ,createReview)

export default router