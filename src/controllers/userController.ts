import {Request , Response} from "express"
import * as userService from "../services/userService"

export const registerUser = async(req:Request,res:Response)=>{
    const {name,email,clerkId,role} = req.body
    
    const newUser = await userService.createUser(name,email,clerkId,role)
    res.status(201).json(newUser)
}