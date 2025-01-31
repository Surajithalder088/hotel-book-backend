import express  from "express"

import { register,login,profile } from "../controllers/hotel.js";
import { verifyUser } from "../middleware/authMiddleware.js";
const router =new express.Router;


router.post("/register",register)
router.post("/login",login)
router.get("/profile",verifyUser,profile)

export default router;