import { asyncHandler } from "../utils/catchError.js";

const validation=(schema)=>{
    
    return asyncHandler((req,res,next)=>{
        const result= schema.validate(req.body,{abortEarly:false});
        if(result.error){
           // return res.status(400).json({message:"validation error",error:result.error});
           return next(new AppError("validation error",400));
        }
        else{
    next();
        }
})
};
export default validation;