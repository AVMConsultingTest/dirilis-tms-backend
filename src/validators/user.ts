import Joi from "joi";
import { EUserRole } from "../types";
import { IUserCreate, IUserUpdate } from "../models";
import { userService } from "../services";

type IUserParams = {
  user_id: number
}

export const userValidator = {
  create: {
    body: Joi.object<IUserCreate>({
      email: Joi.string().email().required(),
      role: Joi.string().valid(...Object.values(EUserRole)).optional()
    }),
  },
  one: {
    params: Joi.object<IUserParams>({
      user_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<userService.WhereMany>, "where">>({
      company_id: Joi.number(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  update: {
    params: Joi.object<IUserParams>({
      user_id: Joi.number().required()
    }),
    body: Joi.object<IUserUpdate>({
      first_name:Joi.string(),
      last_name:Joi.string(),
      email:Joi.string(),
      username:Joi.string(),
      job_title:Joi.string(),
      address_line1:Joi.string(),
      address_line2:Joi.string(),
      state:Joi.string(),
      city:Joi.string(),
      zip_code:Joi.string(),
      country:Joi.string(),
      phone_number:Joi.string(),
      fax_number:Joi.string(),
      image:Joi.string()
    }),
  }
};
