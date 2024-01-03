import Joi from "joi";
import { IBContactCreate, IBContactUpdate } from "../models";
import { bcontactService } from "../services";
import { EBool } from "../types";

type IBContactParams = {
  bcontact_id: number
}

export const bcontactValidator = {
  create: {
    body: Joi.object<IBContactCreate>({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone_number: Joi.string().required(),
      role: Joi.string().required(),
      verified: Joi.string().valid(...Object.values(EBool)).required(),
    })
  },
  update: {
    params: Joi.object<IBContactParams>({
      bcontact_id: Joi.number().required()
    }),
    body: Joi.object<IBContactUpdate>({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string(),
      phone_number: Joi.string(),
      role: Joi.string(),
      verified: Joi.string().valid(...Object.values(EBool)),
    })
  },
  one: {
    params: Joi.object<IBContactParams>({
      bcontact_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IBContactParams>({
      bcontact_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<bcontactService.WhereMany>, "where">>({
      role: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};