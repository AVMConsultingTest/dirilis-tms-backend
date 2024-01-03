import Joi from "joi";
import { ITrailerCreate, ITrailerUpdate } from "../models";
import { trailerService } from "../services";
import { ETrailerStatus, EVehicleOwnershipType } from "../types";

type ITrailerParams = {
  trailer_id: number
}

export const trailerValidator = {
  create: {
    body: Joi.object<ITrailerCreate>({
      status: Joi.string().valid(...Object.values(ETrailerStatus)).required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      year: Joi.string(),
      plate: Joi.string().required(),
      unit_number: Joi.string().required(),
      ownership_type: Joi.string().valid(...Object.values(EVehicleOwnershipType)).required(),
      owner_driver_id: Joi.number(),
      length: Joi.string().required(),
      width: Joi.string().required(),
      height: Joi.string().required(),
      capacity: Joi.string().required(),
      vin_number: Joi.string().required(),
      notes: Joi.string(),
    }),
  },
  update: {
    params: Joi.object<ITrailerParams>({
      trailer_id: Joi.string().required(),
    }),
    body: Joi.object<ITrailerUpdate>({
      status: Joi.string().valid(...Object.values(ETrailerStatus)),
      brand: Joi.string(),
      model: Joi.string(),
      color: Joi.string(),
      year: Joi.string(),
      plate: Joi.string(),
      unit_number: Joi.string(),
      ownership_type: Joi.string(),
      owner_driver_id: Joi.number(),
      length: Joi.string(),
      width: Joi.string(),
      height: Joi.string(),
      capacity: Joi.string(),
      vin_number: Joi.string(),
      notes: Joi.string(),
    }),
  },
  many: {
    query: Joi.object<Flat<Query<trailerService.WhereMany>, "where">>({
      status: Joi.string().valid(...Object.values(ETrailerStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<ITrailerParams>({
      trailer_id: Joi.string().required(),
    }),
  },
  delete: {
    params: Joi.object<ITrailerParams>({
      trailer_id: Joi.string().required(),
    }),
  },
};