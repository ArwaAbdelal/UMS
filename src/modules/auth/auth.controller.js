import UserModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../utils/SendEmail.js";
import { AppError } from "../../utils/AppError.js";

export const register =async(req,res,next)=>{
    const {userName,email,password, role}= req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const adduser= await UserModel.create({userName,email,password:hashedPassword,role});
    const html= "<h2>Hello world?</h2>";
    sendEmail(email,"welcome",html);
    return res.status(201).json({message:"success"});
    };


export const login=async(req,res,next)=>{
    const {email,password}= req.body;
    const user= await UserModel.findOne({
        where:{
            email:email
        }
    });
    if (user== null){
       // return res.status(404).json({message:"invalid email"});
       return next(new AppError("invalid Email",404));
    };
    const checkpassword = await bcrypt.compareSync(password, user.password);
    if (checkpassword==false){
       // return res.status(400).json({message:"invalid password"});
       return next(new AppError("invalid password",400));
    };
    const token = jwt.sign({ id: user.id, name: user.userName, role:user.role}, 'ar78wa');
    return res.status(200).json({message:"Success", token});
};