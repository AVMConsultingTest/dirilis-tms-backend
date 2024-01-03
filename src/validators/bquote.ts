import Joi from "joi";
import { IBQuoteCreate, IBQuoteUpdate } from "../models";
import { bquoteService } from "../services";

type IBQuoteParams = {
  bquote_id: number
}

export const bquoteValidator = {
  create: {
    body: Joi.object<IBQuoteCreate>({
      name: Joi.string(),
      origin: Joi.string(),
      destination: Joi.string(),
      pickup_time:  Joi.date(),
      delivery_time:  Joi.date(),
      cargo_type: Joi.string(),
      cargo_weight: Joi.string(),
      equipment_type: Joi.string(),
      customer_phone_number: Joi.number(),
      // customer_email: Joi.string(),
      // load_id: Joi.number(),
      quote: Joi.number(),
      
      status: Joi.string(),
    })
  },
  update: {
    params: Joi.object<IBQuoteParams>({
      bquote_id: Joi.number().required()
    }),
    body: Joi.object<IBQuoteUpdate>({
      name: Joi.string(),
      origin: Joi.string(),
      destination: Joi.string(),
      pickup_time:  Joi.date(),
      delivery_time:  Joi.date(),
      cargo_type: Joi.string(),
      cargo_weight: Joi.string(),
      equipment_type: Joi.string(),
      quote: Joi.string(),
      
      status: Joi.string(),
    })
  },
  one: {
    params: Joi.object<IBQuoteParams>({
      bquote_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IBQuoteParams>({
      bquote_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<bquoteService.WhereMany>, "where">>({
      status: Joi.string(),
      equipment_type: Joi.string(),
      pickup_time: Joi.string(),
      delivery_time: Joi.string(),
      name: Joi.string(),
      origin: Joi.string(),
      destination: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};