import {  EEldAlertEventType, EEldAlertStatus } from "../types";
import { eldAlertService } from "../services";
import Joi from "joi";

export const eldAlertValidator = {
  many: {
    query: Joi.object<Flat<Query<eldAlertService.WhereMany>, "where">>({
      driver_id: Joi.number(),
      status: Joi.string().valid(...Object.values(EEldAlertStatus)),
      event_type: Joi.string().valid(...Object.values(EEldAlertEventType)),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};