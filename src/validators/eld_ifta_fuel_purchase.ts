import { eldIftaFuelPurchaseService } from "../services";
import Joi from "joi";

export const eldIftaFuelPurchaseValidator = {
  many: {
    query: Joi.object<Flat<Query<eldIftaFuelPurchaseService.WhereMany>, "where">>({
      vehicle_id: Joi.number(),
      source: Joi.string(),
      fuel_type: Joi.string(),
      jurisdiction: Joi.string(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};