import Joi from "joi";
import { IBCustomerContactCreate, IBCustomerCreate, IBCustomerUpdate } from "../models";
import { bcustomerService } from "../services";
import { EBool } from "../types";

type IBCustomerParams = {
  bcustomer_id: number
}

type IBCustomerCreateExtra = {
  bcustomer_contacts: IBCustomerContactCreate[]
}

export const bcustomerValidator = {
  create: {
    body: Joi.object<IBCustomerCreate & IBCustomerCreateExtra>({
      name: Joi.string(),
      dba_name: Joi.string(),
      sales_representative: Joi.string(),
      account_manager: Joi.string(),
      email: Joi.string(),
      phone_number: Joi.string(),
      address_line1: Joi.string(),
      address_line2: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      zip_code: Joi.string(),
      country: Joi.string(),

      bill_method: Joi.string(),
      bill_frequency: Joi.string(),
      shipment_type: Joi.string(),
      pod_required: Joi.string().valid(...Object.values(EBool)),
      credit_limit: Joi.string(),
      payment_team: Joi.string(),

      bcustomer_contacts: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        role: Joi.string().required(),
      }))
    })
  },
  update: {
    params: Joi.object<IBCustomerParams>({
      bcustomer_id: Joi.number().required()
    }),
    body: Joi.object<IBCustomerUpdate>({
      name: Joi.string(),
      dba_name: Joi.string(),
      sales_representative: Joi.string(),
      account_manager: Joi.string(),
      email: Joi.string(),
      phone_number: Joi.string(),
      address_line1: Joi.string(),
      address_line2: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      zip_code: Joi.string(),
      country: Joi.string(),

      bill_method: Joi.string(),
      bill_frequency: Joi.string(),
      shipment_type: Joi.string(),
      pod_required: Joi.string().valid(...Object.values(EBool)),
      credit_limit: Joi.string(),
      payment_team: Joi.string(),
    })
  },
  one: {
    params: Joi.object<IBCustomerParams>({
      bcustomer_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IBCustomerParams>({
      bcustomer_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<bcustomerService.WhereMany>, "where">>({
      name: Joi.string(),
      email: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};