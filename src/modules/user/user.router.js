import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';
const router=Router();


router.get('/getUsers',async(req,res)=>{
    const {token}= req.headers;
    const decoded = jwt.verify(token, 'ar78wa');
    if (decoded.role!='admin'){
        return res.status(400).json({message:"not authorized"});
    }
    const users= await UserModel.findAll({
        attributes:['id','userName','email']
    });
    return res.status(200).json({message:"Success", users});
});


router.delete('/deleteUser/:id',async(req,res)=>{ 
    const {id} =req.params;
    const {token}= req.headers;
    const decoded = jwt.verify(token, 'ar78wa');
    if (decoded.role!='admin'){
        return res.status(400).json({message:"not authorized"});
    }
    const user= await UserModel.findByPk(id);
    if (user==null){
        return res.status(404).json({message:"user not found"});
    }
    await UserModel.destroy({
        where:{
            id
        }
    })
    return res.status(200).json({message:"success"});
});

export default router;
