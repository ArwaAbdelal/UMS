import { Router } from "express";
import { registerSchema, loginSchema } from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import  *  as authController from "./auth.controller.js";
import {asyncHandler} from '../../utils/catchError.js';
const router=Router();

router.post('/register',validation(registerSchema),asyncHandler(authController.register));
router.post('/login',validation(loginSchema),asyncHandler(authController.login));

export default router;