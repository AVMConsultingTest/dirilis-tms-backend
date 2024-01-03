import Joi from "joi";
import { IPermissionCreate, IPermissionUpdate } from "../models";

type IPermissionParams = {
  permission_id: number
}

export const permissionValidator = {
  create: {
    body: Joi.object<IPermissionCreate>({
      route: Joi.string().required(),
      can_write: Joi.boolean().required(),
      can_read: Joi.boolean().required(),
      role_id: Joi.number().required()
    })
  },
  update: {
    params: Joi.object<IPermissionParams>({
      permission_id: Joi.number().required()

    }),
    body: Joi.object<IPermissionUpdate>({
      route: Joi.string(),
      can_write: Joi.boolean(),
      can_read: Joi.boolean()
    })
  },
  delete: {
    params: Joi.object<IPermissionParams>({
      permission_id: Joi.number().required(),
    })
  }
};