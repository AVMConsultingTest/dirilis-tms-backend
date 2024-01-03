import Joi from "joi";
import { IUserRoleCreate, IUserRoleUpdate } from "../models";

type IUserRoleParams = {
  user_role_id: number
}

export const userRoleValidator = {
  create: {
    body: Joi.object<IUserRoleCreate>({
      role_id: Joi.number(),
      user_id: Joi.number()
    })
  },
  update: {
    params: Joi.object<IUserRoleParams>({
      user_role_id: Joi.number().required(),
    }),
    body: Joi.object<IUserRoleUpdate>({
      role_id: Joi.number(),
      user_id: Joi.number()
    })
  },
  delete: {
    params: Joi.object<IUserRoleParams>({
      user_role_id: Joi.number().required(),
    })
  }
};