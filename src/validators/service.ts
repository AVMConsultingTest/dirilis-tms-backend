import Joi from "joi";
import { EServiceVehicleType } from "../types";
import { IService } from "../models";
import { serviceService } from "../services";

type IServiceParams = {
    service_id: number
}

export const serviceValidator = {
  create: {
    body: Joi.object<IService>({
      vehicle_id: Joi.number().required(),
      vehicle_type: Joi.string().valid(...Object.values(EServiceVehicleType)).required(),
      type: Joi.string().required(),
      dot_inspection_number: Joi.string().required(),
      repair_start_date: Joi.date(),
      repair_completion_date: Joi.date(),
      repair_description: Joi.string().required(),
      repair_facility: Joi.string(),
    
      notes: Joi.string(),
    
      driver_id: Joi.number().required(),
      vendor_id: Joi.number().required(),
    }),
  },
  many: {
    query: Joi.object<Flat<Query<serviceService.WhereMany>, "where">>({
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<IServiceParams>({
      service_id: Joi.number().required(),
    }),
  },
  update: {
    params: Joi.object<IServiceParams>({
      service_id: Joi.number().required(),
    }),
    body: Joi.object<IService>({
      vehicle_id: Joi.number(),
      vehicle_type: Joi.string().valid(...Object.values(EServiceVehicleType)),
      type: Joi.string(),
    
      dot_inspection_number: Joi.string(),
      repair_start_date: Joi.date(),
      repair_completion_date: Joi.date(),
      repair_description: Joi.string(),
      repair_facility: Joi.string(),
    
      notes: Joi.string(),
      driver_id: Joi.number(),
      vendor_id: Joi.number(),
    }),
  },
  delete: {
    params: Joi.object<IServiceParams>({
      service_id: Joi.number().required(),
    }),
  },
};