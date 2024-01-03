import Joi from "joi";
import { IUser } from "../models";

type IUserLogin = Pick<IUser, "email" | "password">
type IUserChangePassword = IUserLogin & { new_password: string }

export const authValidator = {
  login: {
    body: Joi.object<IUserLogin>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  updatePassword: {
    body: Joi.object<IUserChangePassword>({
      email: Joi.string().required(),
      password: Joi.string().optional(),
      new_password: Joi.string().required(),
    }),
  }
};