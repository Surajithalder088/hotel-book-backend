import express  from "express"

import { register,login,profile,hotelById ,hotelAll,edit} from "../controllers/hotel.js";
import { verifyUser } from "../middleware/authMiddleware.js";
const router =new express.Router;


router.post("/register",register)
router.post("/login",login)
router.get("/profile/:id",profile)
router.put("/edit/:id",edit)
router.get("/hotel-all",hotelAll)
router.get("/hotelbyid/:id",verifyUser,hotelById)

export default router;