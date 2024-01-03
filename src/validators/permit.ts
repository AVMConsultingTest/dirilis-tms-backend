import Joi from "joi";
import { EBool } from "../types";
import { IPermitCreate, IPermitUpdate } from "../models";
import { permitService } from "../services";

type IPermitParams = {
    permit_id: number
}

export const permitValidator = {
  create: {
    body: Joi.object<IPermitCreate>({
      truck_id: Joi.number().required(),
      type: Joi.string().required(),
      number: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      purchased_date: Joi.date().required(),
      cost: Joi.number().precision(2).required(),
      delivery_status: Joi.string().required(),
      vendor_url: Joi.string().required(),
      installed: Joi.string().valid(...Object.values(EBool)).required(),
      notes: Joi.string(),
    }),
  },
  many: {
    query: Joi.object<Flat<Query<permitService.WhereMany>, "where">>({
      truck_id: Joi.number(),
      type: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<IPermitParams>({
      permit_id: Joi.number().required(),
    }),
  },
  update: {
    params: Joi.object<IPermitParams>({
      permit_id: Joi.number().required(),
    }),
    body: Joi.object<IPermitUpdate>({
      type: Joi.string(),
      number: Joi.string(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      purchased_date: Joi.date(),
      cost: Joi.number().precision(2),
      delivery_status: Joi.string(),
      vendor_url: Joi.string(),
      installed: Joi.string().valid(...Object.values(EBool)),
      notes: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object<IPermitParams>({
      permit_id: Joi.number().required(),
    }),
  },
};