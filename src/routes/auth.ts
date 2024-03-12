import { Router } from "express";
import{login,signup} from '../controllers/auth'

export const authRoutes:Router = Router()

authRoutes.get('/login',login) 
authRoutes.post('/signup', signup)

