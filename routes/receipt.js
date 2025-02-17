import express from 'express'
import { receiptAll,receiptById,receiptCreate,receiptPay} from '../controllers/receipt.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router= new express.Router;




router.post('/receipt-create/:hotelId',receiptCreate)
router.get('/receipt-all',verifyUser,receiptAll)
router.get('/:id',verifyUser,receiptById)
router.get('/receipt-pay/:id',verifyUser,receiptPay)

export default router