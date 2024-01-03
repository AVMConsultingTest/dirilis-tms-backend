import { eldIftaIdlingEventService } from "../services";
import Joi from "joi";

export const eldIftaIdlingEventValidator = {
  many: {
    query: Joi.object<Flat<Query<eldIftaIdlingEventService.WhereMany>, "where">>({
      vehicle_id: Joi.number(),
      driver_id: Joi.number(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};