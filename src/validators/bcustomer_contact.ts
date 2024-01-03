import Joi from "joi";
import { IBCustomerContactCreate, IBCustomerContactUpdate } from "../models";

type IBCustomerContactParams = {
  bcustomer_contact_id: number
  bcustomer_id: number
}

export const bcustomerContactValidator = {
  create: {
    params: Joi.object<IBCustomerContactParams>({
      bcustomer_id: Joi.number().required(),
    }),
    body: Joi.object<IBCustomerContactCreate>({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone_number: Joi.string().required(),
      role: Joi.string().required(),
    })
  },
  update: {
    params: Joi.object<IBCustomerContactParams>({
      bcustomer_id: Joi.number().required(),
      bcustomer_contact_id: Joi.number().required()
    }),
    body: Joi.object<IBCustomerContactUpdate>({
      name: Joi.string(),
      email: Joi.string(),
      phone_number: Joi.string(),
      role: Joi.string(),
    })
  },
  delete: {
    params: Joi.object<IBCustomerContactParams>({
      bcustomer_id: Joi.number().required(),
      bcustomer_contact_id: Joi.number().required()
    })
  }
};