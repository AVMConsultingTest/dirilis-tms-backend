import Joi from "joi";
import { IAlertCreate, IAlertUpdate } from "../models";
import { EAlertStatus } from "../types";
import { alertService } from "../services";

type IAlertParams = {
  alert_id: number
}

export const alertValidator = {
  create: {
    body: Joi.object<IAlertCreate>({
      status: Joi.string().valid(...Object.values(EAlertStatus)),
      description: Joi.string().required(),
      date: Joi.date().required(),
      licence_status:Joi.string().required(),
      driver_id:Joi.number().required()
    })
  },
  update: {
    params: Joi.object<IAlertParams>({
      alert_id: Joi.number().required()
    }),
    body: Joi.object<IAlertUpdate>({
      status: Joi.string().valid(...Object.values(EAlertStatus)),
      description: Joi.string(),
      date: Joi.date(),
      licence_status: Joi.string(),
      driver_id: Joi.number()
    })
  },
  one: {
    params: Joi.object<IAlertParams>({
      alert_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IAlertParams>({
      alert_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<alertService.WhereMany>, "where">>({
      status: Joi.string().valid(...Object.values(EAlertStatus)),
      driver_id:Joi.number(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};