import Joi from "joi";

export const trucksValidator = {
  create: {
    body: Joi.object({
      primary_driver_id: Joi.number().required(),
      secondary_driver_id: Joi.number().required(),
      status: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      model_year: Joi.string().optional(),
      color: Joi.string().required(),
      plate: Joi.string().required(),
      unit_number: Joi.string().required(),
      asset_owner: Joi.string().required(),
      acquisition_type: Joi.string().required(),
      vin_number: Joi.string().required(),
      notes: Joi.string().required(),
      registration_renewal_date: Joi.date().required(),
      out_of_service_date: Joi.date().required(),
      annual_inspection_date: Joi.date().required(),
      preventive_maintenance_date: Joi.date().required(),
      in_service_date: Joi.date().required(),
    }),
  },
  delete: {
    params: Joi.object({
      truckId: Joi.number().required(),
    }),
  },
  update: {
    params: Joi.object({
      truckId: Joi.number().required(),
    }),
    body: Joi.object({
      primary_driver_id: Joi.number().required(),
      secondary_driver_id: Joi.number().required(),
      status: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      model_year: Joi.string().optional(),
      color: Joi.string().required(),
      plate: Joi.string().required(),
      unit_number: Joi.string().required(),
      asset_owner: Joi.string().required(),
      acquisition_type: Joi.string().required(),
      vin_number: Joi.string().required(),
      notes: Joi.string().required(),
      registration_renewal_date: Joi.date().required(),
      out_of_service_date: Joi.date().required(),
      annual_inspection_date: Joi.date().required(),
      preventive_maintenance_date: Joi.date().required(),
      in_service_date: Joi.date().required(),
    }),
  },
  getById: {
    params: Joi.object({
      truckId: Joi.number().required(),
    }),
  },
};
