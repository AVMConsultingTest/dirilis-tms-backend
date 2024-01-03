import { EEldTruckEntityStatus } from "../types";
import { eldTruckEntityService } from "../services";
import Joi from "joi";

export const eldTruckEntityValidator = {
  many: {
    query: Joi.object<Flat<Query<eldTruckEntityService.WhereMany>, "where">>({
      driver_id: Joi.number(),
      truck_id: Joi.number(),
      status: Joi.string().valid(...Object.values(EEldTruckEntityStatus)),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};