import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router=Router();


router.get('/getUsers',async(req,res)=>{
    const users= await UserModel.findAll();
    return res.status(200).json({message:"Success", users});
});


router.post('/register',async(req,res)=>{
    const {userName,email,password}= req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const adduser= await UserModel.create({userName,email,password:hashedPassword});
    return res.status(201).json({message:"success"});
});


router.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    const user= await UserModel.findOne({
        where:{
            email:email
        }
    });
    if (user== null){
        return res.status(404).json({message:"invalid email"});
    };
    const checkpassword = await bcrypt.compareSync(password, user.password);
    if (checkpassword==false){
        return res.status(400).json({message:"invalid password"});
    };
    const token = jwt.sign({ id: user.id, name: user.userName}, 'ar78wa');
    return res.status(200).json({message:"Success", token});
});




export default router;
