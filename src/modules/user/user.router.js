import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
const router=Router();

router.get('/getUsers',async(req,res)=>{
    const users= await UserModel.findAll();
    return res.status(200).json({message:"Success", users});
})



export default router;
