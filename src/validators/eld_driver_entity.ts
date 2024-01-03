import {  EEldDriverEntityDrivingStatus } from "../types";
import { eldDriverEntityService } from "../services";
import Joi from "joi";

export const eldDriverEntityValidator = {
  many: {
    query: Joi.object<Flat<Query<eldDriverEntityService.WhereMany>, "where">>({
      driver_id: Joi.number(),
      vehicle_id: Joi.number(),
      driving_status: Joi.string().valid(...Object.values(EEldDriverEntityDrivingStatus)),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};