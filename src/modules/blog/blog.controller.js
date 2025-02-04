import UserModel from "../../../DB/model/user.model.js";
import blogModel from '../../../DB/model/blog.model.js';

export const getBlogs=async(req, res,next)=>{
    const blogs = await blogModel.findAll({
      attributes:['id','title'],
      include:{
          model:UserModel,
          attributes:['id','userName']
      },
    });
    return res.status(200).json({ message: "success", blogs });
  };


  
export const addBlogs=async(req, res,next)=>{
    const { title, description } = req.body;
    const blog = await blogModel.create({ title, description, UserId:req.id });
    return res.status(201).json({ message: "success", blog });
  }