import { eldIftaTripReportService } from "../services";
import Joi from "joi";

export const eldIftaTripReportValidator = {
  many: {
    query: Joi.object<Flat<Query<eldIftaTripReportService.WhereMany>, "where">>({
      vehicle_id: Joi.number(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};