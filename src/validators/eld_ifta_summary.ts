import { eldIftaSummaryService } from "../services";
import Joi from "joi";

export const eldIftaSummaryValidator = {
  many: {
    query: Joi.object<Flat<Query<eldIftaSummaryService.WhereMany>, "where">>({
      vehicle_id: Joi.number(),
      driver_id: Joi.number(),
      jurisdiction: Joi.string(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};