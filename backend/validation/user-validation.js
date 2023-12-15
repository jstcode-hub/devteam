import joi from 'joi';

export const signupUserValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  username: joi.string().min(3).required(),
});
