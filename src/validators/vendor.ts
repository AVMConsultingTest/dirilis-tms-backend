import Joi from "joi";
import { IVendorCreate, IVendorUpdate } from "../models";
import { EVendorStatus } from "../types";
import { vendorService } from "../services";

type IVendorParams = {
  vendor_id: number
}

export const vendorValidator = {
  create: {
    body: Joi.object<IVendorCreate>({
      name: Joi.string().required(),
      contact_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.string().required(),
      address_line1: Joi.string().required(),
      address_line2: Joi.string().optional(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      country: Joi.string().required(),
      business_hours: Joi.string().required(),
      line_of_business: Joi.string().required(),
      status: Joi.string().valid(...Object.values(EVendorStatus)).required(),
      account_number: Joi.string().required(),
      bank_name: Joi.string().required(),
      routing_number: Joi.string().required()
    })
  },
  update: {
    params: Joi.object<IVendorParams>({
      vendor_id: Joi.number().required()
    }),
    body: Joi.object<IVendorUpdate>({
      name: Joi.string(),
      contact_name: Joi.string(),
      email: Joi.string().email(),
      phone_number: Joi.string(),
      address_line1: Joi.string(),
      address_line2: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      zip_code: Joi.string(),
      country: Joi.string(),
      business_hours: Joi.string(),
      line_of_business: Joi.string(),
      status: Joi.string().valid(...Object.values(EVendorStatus)),
      account_number: Joi.string(),
      bank_name: Joi.string(),
      routing_number: Joi.string()
    })
  },
  one: {
    params: Joi.object<IVendorParams>({
      vendor_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IVendorParams>({
      vendor_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<vendorService.WhereMany>, "where">>({
      name: Joi.string(),
      email: Joi.string().email(),
      phone_number: Joi.string(),
      status: Joi.string().valid(...Object.values(EVendorStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};