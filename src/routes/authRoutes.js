import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.post(
  '/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

export default authRouter;
