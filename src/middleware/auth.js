import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/catchError.js';
import { AppError } from '../utils/AppError.js';
const auth=()=>{

return asyncHandler((req,res,next)=>{

    const {token}= req.headers;
    const decoded = jwt.verify(token, 'ar78wa');
    if (decoded.role!='admin'){
       // return res.status(400).json({message:"not authorized"});
       return next(new AppError("not authorized",400));
    }
    req.id=decoded.id;
    next();
});
}
export default auth;