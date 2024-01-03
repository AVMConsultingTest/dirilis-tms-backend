import Joi from "joi";
import { ITruckCreate, ITruckUpdate } from "../models";
import { truckService } from "../services";
import { ETruckStatus, EVehicleOwnershipType } from "../types";

type ITruckParams = {
  truck_id: number
}

export const truckValidator = {
  create: {
    body: Joi.object<ITruckCreate>({
      status: Joi.string().valid(...Object.values(ETruckStatus)),
      brand: Joi.string(),
      model: Joi.string(),
      year: Joi.string(),
      color: Joi.string(),
      plate: Joi.string(),
      unit_number: Joi.string(),
      make: Joi.string(),
      fuel_type: Joi.string(),
      gross_weight: Joi.string(),
      number_of_axles: Joi.number(),
      vin_number: Joi.string(),
      ownership_type: Joi.string().valid(...Object.values(EVehicleOwnershipType)),
      owner_driver_id: Joi.number(),
      notes: Joi.string(),
    }),
  },
  delete: {
    params: Joi.object<ITruckParams>({
      truck_id: Joi.number().required(),
    }),
  },
  update: {
    params: Joi.object<ITruckParams>({
      truck_id: Joi.number().required(),
    }),
    body: Joi.object<ITruckUpdate>({
      status: Joi.string().valid(...Object.values(ETruckStatus)),
      brand: Joi.string(),
      model: Joi.string(),
      year: Joi.string(),
      color: Joi.string(),
      plate: Joi.string(),
      unit_number: Joi.string(),
      make: Joi.string(),
      fuel_type: Joi.string(),
      gross_weight: Joi.string(),
      number_of_axles: Joi.number(),
      vin_number: Joi.string(),
      ownership_type: Joi.string(),
      owner_driver_id: Joi.number(),
      notes: Joi.string(),
    }),
  },
  one: {
    params: Joi.object<ITruckParams>({
      truck_id: Joi.number().required(),
    }),
  },
  many: {
    query: Joi.object<Flat<Query<truckService.WhereMany>, "where">>({
      status: Joi.string().valid(...Object.values(ETruckStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};
