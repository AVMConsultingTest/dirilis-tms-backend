import { eldIftaDriverService } from "../services";
import Joi from "joi";

export const eldIftaDriverValidator = {
  many: {
    query: Joi.object<Flat<Query<eldIftaDriverService.WhereMany>, "where">>({
      driver_id: Joi.number(),
      total_distance: Joi.string(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};