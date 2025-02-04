import joi from "joi";
export const registerSchema=joi.object({
    userName: joi.string().min(3).max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.valid('user','admin')
});

export const loginSchema=joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});