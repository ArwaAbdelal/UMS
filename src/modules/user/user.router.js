import { Router } from "express";
import auth from "../../middleware/auth.js";
import fileUpload from "../../utils/multer.js";
import * as userRouter from './user.controller.js';
import {asyncHandler} from '../../utils/catchError.js';
const router=Router();


router.get('/getUsers',auth(),asyncHandler(userRouter.getUsers));
router.delete('/deleteUser/:id',auth(),asyncHandler(userRouter.deleteUser));
router.put('/:id',auth(),fileUpload().single('image'),asyncHandler(userRouter.uploadProfilePic));

export default router;
