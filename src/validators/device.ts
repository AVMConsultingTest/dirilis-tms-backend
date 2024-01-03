import Joi from "joi";
import { deviceService } from "../services";
import { IDeviceCreate, IDeviceUpdate } from "../models";

type IDeviceParams = {
    device_id: number
}

export const deviceValidator = {
  create: {
    body: Joi.object<IDeviceCreate>({
      truck_id: Joi.number().required(),
      type: Joi.string().required(),
      vendor: Joi.string().required(),
      service_start_date: Joi.date().required(),
      service_end_date: Joi.date(),
      returned_date: Joi.date(),
      notes: Joi.string(),
    })
  },
  update: {
    params: Joi.object<IDeviceParams>({
      device_id: Joi.string().required()
    }),
    body: Joi.object<IDeviceUpdate>({
      truck_id: Joi.number(),
      type: Joi.string(),
      vendor: Joi.string(),
      service_start_date: Joi.date(),
      service_end_date: Joi.date(),
      returned_date: Joi.date(),
      notes: Joi.string(),
    })
  },
  many: {
    query: Joi.object<Flat<Query<deviceService.WhereMany>, "where">>({
      truck_id: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  count: {
    query: Joi.object<Flat<Query<deviceService.WhereMany>, "where">>({
      timeRange: Joi.string().valid("month", "halfYear", "year")
    })
  },
  one: {
    params: Joi.object<IDeviceParams>({
      device_id: Joi.string().required()
    }),
  },
  delete: {
    params: Joi.object<IDeviceParams>({
      device_id: Joi.string().required()
    }),
  }
};