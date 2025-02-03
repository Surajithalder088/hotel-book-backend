import express from 'express'
import { receiptAll,receiptById,receiptCreate,receiptDelete} from '../controllers/receipt.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router= new express.Router;


//no request from body is required,only data via params is enough to run the controllers

router.post('/receipt-create/:serviceId',verifyUser,receiptCreate)
router.get('/receipt-all',verifyUser,receiptAll)
router.get('/:id',verifyUser,receiptById)
router.delete('/receipt-delete/:id',verifyUser,receiptDelete)

export default router