import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as blogController from './blog.controller.js';
import {asyncHandler} from '../../utils/catchError.js';;
const router=Router();


router.get('/',asyncHandler(blogController.getBlogs) );
router.post('/',auth() ,asyncHandler(blogController.addBlogs));

export default router;