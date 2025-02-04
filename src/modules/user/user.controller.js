import cloudinary from "../../utils/cloudinary.js";
import UserModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';
import { AppError } from "../../utils/AppError.js";


export const getUsers=async(req,res,next)=>{
    const users= await UserModel.findAll({
        attributes:['id','userName','email']
    });
    return res.status(200).json({message:"Success", users});
};


export const deleteUser=async(req,res,next)=>{ 
    const {id} =req.params;
    const user= await UserModel.findByPk(id);
    if (user==null){
       // return res.status(404).json({message:"user not found"});
       return next(new AppError("user not found",404));
    }
    await UserModel.destroy({
        where:{
            id
        }
    })
    return res.status(200).json({message:"success"});
};


export const uploadProfilePic=async(req,res,next)=>{
const { id } = req.params;
const user = await UserModel.findByPk(id);
if(user == null){
    //return res.status(404).json({ message: "user not found" });
    return next(new AppError("user not found",404));
}
    const {secure_url} = await cloudinary.uploader.upload(req.file.path)
    user.profilePicture=secure_url;
    await user.save();
    return res.status(200).json({message:"success"});
};