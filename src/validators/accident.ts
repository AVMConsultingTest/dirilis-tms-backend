import Joi from "joi";
import { IAccidentCreate, IAccidentUpdate } from "../models";
import { EBool } from "../types";
import { accidentService } from "../services";

type IAccidentParams = {
    accident_id: number
}

export const accidentValidator = {
  create: {
    body: Joi.object<IAccidentCreate>({
      driver_id: Joi.number().required(),
      truck_id: Joi.number().required(),
      report_date: Joi.date().required(),
      report_number: Joi.string().required(),
      report_state: Joi.string().required(),
      fatal: Joi.string().valid(...Object.values(EBool)).required(),
      injury: Joi.string().valid(...Object.values(EBool)).required(),
      tow: Joi.string().valid(...Object.values(EBool)).required(),
      haz_mat: Joi.string().valid(...Object.values(EBool)).required(),
      notes: Joi.string(),
      source: Joi.string(),
    })
  },
  update: {
    params: Joi.object<IAccidentParams>({
      accident_id: Joi.number().required()
    }),
    body: Joi.object<IAccidentUpdate>({
      driver_id: Joi.number(),
      truck_id: Joi.number(),
      report_date: Joi.date(),
      report_number: Joi.string(),
      report_state: Joi.string(),
      fatal: Joi.string().valid(...Object.values(EBool)),
      injury: Joi.string().valid(...Object.values(EBool)),
      tow: Joi.string().valid(...Object.values(EBool)),
      haz_mat: Joi.string().valid(...Object.values(EBool)),
      notes: Joi.string(),
      source: Joi.string(),
    })
  },
  many: {
    query: Joi.object<Flat<Query<accidentService.WhereMany>, "where">>({
      driver_id: Joi.number().optional(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<IAccidentParams>({
      accident_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IAccidentParams>({
      accident_id: Joi.number().required()
    })
  }
};