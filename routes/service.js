import express from "express"
import { allServices,updateService,deleteService,serviceCreate,serviceById } from "../controllers/service.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = new express.Router;

router.get('/service-all',allServices)
router.post('/service-create/:hotelId',verifyUser,serviceCreate)
router.get('/:id',verifyUser,serviceById)
router.delete('/service-delete/:id',verifyUser,deleteService)
router.put('/service-update/:id',verifyUser,updateService)

export default  router;