import Joi from "joi";
import { ILocationCreate, ILocationUpdate } from "../models/index";
import { ELocationStatus } from "../types";
import { locationService } from "../services";

type ILocationParams = {
    location_id: number
}

type ILocationSearchByName = {
    location_name: string
}

export const locationValidator = {
  create: {
    body: Joi.object<ILocationCreate>({
      name: Joi.string().required(),
      address_line1: Joi.string().required(),
      address_line2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.string().required(),
      status: Joi.string().valid(...Object.values(ELocationStatus)).required(),
    })
  },
  update: {
    params: Joi.object<ILocationParams>({
      location_id: Joi.number().required()
    }),
    body: Joi.object<ILocationUpdate>({
      name: Joi.string(),
      address_line1: Joi.string(),
      address_line2: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip_code: Joi.string(),
      status: Joi.string().valid(...Object.values(ELocationStatus)),
    })
  },
  many: {
    query: Joi.object<Flat<Query<locationService.WhereMany>, "where">>({
      status: Joi.string().valid(...Object.values(ELocationStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<ILocationParams>({
      location_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<ILocationParams>({
      location_id: Joi.number().required()
    })
  },
  searchByName: {
    query: Joi.object<ILocationSearchByName>({
      location_name: Joi.string().required()
    })
  }
};

