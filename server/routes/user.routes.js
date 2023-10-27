import { Router } from "express";
import { getUser, userLogin, userLogout, userSignup } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRoutes = Router()

userRoutes.post('/signup', userSignup)
userRoutes.post('/login', userLogin)
userRoutes.get('/user', authMiddleware, getUser)
userRoutes.get('/logout', authMiddleware, userLogout)

export default userRoutes