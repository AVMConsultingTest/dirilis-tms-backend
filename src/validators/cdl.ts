import Joi from "joi";
import { ICdlCreate, ICdlUpdate } from "../models";
import { ECdlClass, ECdlType } from "../types";

type ICdlParams = {
  cdl_id: number
  driver_id: number
}

export const cdlValidator = {
  create: {
    params: Joi.object<ICdlParams>({
      driver_id: Joi.number().required()
    }),
    body: Joi.object<ICdlCreate>({
      issued_state: Joi.string().required(),
      number: Joi.string().required(),
      expiration_date: Joi.date().required(),
      file: Joi.string().required(),
      type: Joi.string().valid(...Object.values(ECdlType)).required(),
      class: Joi.string().valid(...Object.values(ECdlClass)).required(),
      comment: Joi.string(),
      endorsement: Joi.string().required(),
    })
  },
  update: {
    params: Joi.object<ICdlParams>({
      cdl_id: Joi.number().required(),
      driver_id: Joi.number().required(),
    }),
    body: Joi.object<ICdlUpdate>({
      issued_state: Joi.string(),
      number: Joi.string(),
      expiration_date: Joi.date(),
      file: Joi.string(),
      type: Joi.string().valid(...Object.values(ECdlType)),
      class: Joi.string().valid(...Object.values(ECdlClass)),
      comment: Joi.string(),
      endorsement: Joi.string(),
    })
  },
  delete: {
    params: Joi.object<ICdlParams>({
      cdl_id: Joi.number().required(),
      driver_id: Joi.number().required(),
    })
  }
};