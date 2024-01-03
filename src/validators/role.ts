import Joi from "joi";
import { IPermissionCreate, IRoleCreate, IRoleUpdate } from "../models";
import { roleService } from "../services";

type IRoleParams = {
  role_id: number
}

type IRoleExtraCreate = {
  permissions: IPermissionCreate[]
}

export const roleValidator = {
  create: {
    body: Joi.object<IRoleCreate & IRoleExtraCreate>({
      name: Joi.string().required(),
      permissions: Joi.array().items(Joi.object({
        route: Joi.string().required(),
        can_write: Joi.boolean().required(),
        can_read: Joi.boolean().required()
      }))
    })
  },
  update: {
    params: Joi.object<IRoleParams>({
      role_id: Joi.number().required(),

    }),
    body: Joi.object<IRoleUpdate>({
      name: Joi.string(),
    })
  },
  one: {
    params: Joi.object<IRoleParams>({
      role_id: Joi.number().required(),
    })
  },
  delete: {
    params: Joi.object<IRoleParams>({
      role_id: Joi.number().required(),
    })
  },
  many: {
    query: Joi.object<Flat<Query<roleService.WhereMany>, "where">>({
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};