import { eldIftaVehicleService } from "../services";
import Joi from "joi";

export const eldIftaVehicleValidator = {
  many: {
    query: Joi.object<Flat<Query<eldIftaVehicleService.WhereMany>, "where">>({
      vehicle_id: Joi.number(),
      total_distance: Joi.string(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};