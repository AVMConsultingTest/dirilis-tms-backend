import Joi from "joi";
import { IBrokerCreate, IBrokerUpdate } from "../models";
import { EBrokerStatus } from "../types";
import { brokerService } from "../services";

type IBrokerParams = {
    broker_id: number
}

export const brokerValidator = {
  create: {
    body: Joi.object<IBrokerCreate>({
      name: Joi.string().required(),
      mc: Joi.string().required(),
      credit_limit: Joi.number().required(),
      credit_available: Joi.string().required(),
      score: Joi.string().required(),
      credit_limit_incrase: Joi.string().required(),
      invoicing_email: Joi.string().required(),
      status: Joi.string().valid(...Object.values(EBrokerStatus)).required(),
      contract: Joi.string().required(),
      notes: Joi.string().required(),
        
      bill_to_address: Joi.string().required(),
      direct_billing: Joi.boolean().required(),
      billing_email: Joi.string().required(),
      billing_option: Joi.string().required(),
        
      address_line1: Joi.string().required(),
      address_line2: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      country: Joi.string().required(),
        
      contact1_first_name: Joi.string().required(),
      contact1_last_name: Joi.string().required(),
      contact1_email: Joi.string().required(),
      contact1_phone_number: Joi.string().required(),
        
      contact2_first_name: Joi.string().required(),
      contact2_last_name: Joi.string().required(),
      contact2_email: Joi.string().required(),
      contact2_phone_number: Joi.string().required(),
    })
  },
  update: {
    params: Joi.object<IBrokerParams>({
      broker_id: Joi.number().required()
    }),
    body: Joi.object<IBrokerUpdate>({
      name: Joi.string().required(),
      mc: Joi.string().required(),
      credit_limit: Joi.number().required(),
      credit_available: Joi.string().required(),
      score: Joi.string().required(),
      credit_limit_incrase: Joi.string().required(),
      invoicing_email: Joi.string().required(),
      status: Joi.string().valid(...Object.values(EBrokerStatus)),
      contract: Joi.string().required(),
      notes: Joi.string().required(),
        
      bill_to_address: Joi.string().required(),
      direct_billing: Joi.boolean().required(),
      billing_email: Joi.string().required(),
      billing_option: Joi.string().required(),
        
      address_line1: Joi.string().required(),
      address_line2: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      country: Joi.string().required(),
        
      contact1_first_name: Joi.string().required(),
      contact1_last_name: Joi.string().required(),
      contact1_email: Joi.string().required(),
      contact1_phone_number: Joi.string().required(),
        
      contact2_first_name: Joi.string().required(),
      contact2_last_name: Joi.string().required(),
      contact2_email: Joi.string().required(),
      contact2_phone_number: Joi.string().required()
    })
  },
  one: {
    params: Joi.object<IBrokerParams>({
      broker_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IBrokerParams>({
      broker_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<brokerService.WhereMany>, "where">>({
      page_size: Joi.number(),
      page_number: Joi.number(),
      name: Joi.string(),
      mc: Joi.string(),
      score: Joi.string(),
    })
  }
};