import Joi from "joi";
import { IIncidentCreate, IIncidentUpdate } from "../models";
import { EBool } from "../types";
import { incidentService } from "../services";

type IIncidentParams = {
  incident_id: number
}

export const incidentValidator = {
  create: {
    body: Joi.object<IIncidentCreate>({
      driver_id: Joi.number().required(),
      truck_id: Joi.number().required(),
      unit_number: Joi.string().required(),
      event_type: Joi.string().required(),
      date: Joi.date().required(),
      training_required: Joi.string().valid(...Object.values(EBool)).required(),
      training_completed: Joi.string().valid(...Object.values(EBool)).required(),
    })
  },
  update: {
    params: Joi.object<IIncidentParams>({
      incident_id: Joi.string().required()
    }),
    body: Joi.object<IIncidentUpdate>({
      driver_id: Joi.number(),
      truck_id: Joi.number(),
      unit_number: Joi.string(),
      event_type: Joi.string(),
      date: Joi.date(),
      training_required: Joi.string().valid("Yes", "No"),
      training_completed: Joi.string().valid("Yes", "No"),
    })
  },
  many: {
    query: Joi.object<Flat<Query<incidentService.WhereMany>, "where">>({
      event_type: Joi.string(),
      driver_id: Joi.number().optional(),
      truck_id: Joi.number(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<IIncidentParams>({
      incident_id: Joi.string().required()
    })
  },
  delete: {
    params: Joi.object<IIncidentParams>({
      incident_id: Joi.string().required()
    })
  }
};
