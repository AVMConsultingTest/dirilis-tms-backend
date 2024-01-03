import Joi from "joi";
import { ILoadOfferCreate, ILoadOfferUpdate } from "../models";
import { ELoadOfferStatus } from "../types";
import { loadOfferService } from "../services";

type ILoadOfferParams = {
  load_id: number,
  load_offer_id: number,
}

export const loadOfferValidator = {
  create: {
    body: Joi.object<ILoadOfferCreate>({
      load_id: Joi.number().required(),
      rate_per_mile: Joi.number(),
      all_in_rate: Joi.number(),
      notes: Joi.string(),
      source: Joi.string(),
      joke_offer_rate: Joi.number(),
      kpi: Joi.number()
    })
  },
  update: {
    params: Joi.object<ILoadOfferParams>({
      load_id: Joi.number().required(),
      load_offer_id: Joi.number().required()
    }),
    body: Joi.object<ILoadOfferUpdate>({
      rate_per_mile: Joi.number(),
      all_in_rate: Joi.number(),
      notes: Joi.string(),
      source: Joi.string(),
      joke_offer_rate: Joi.number(),
      kpi: Joi.number(),
      status: Joi.string().valid(...Object.values(ELoadOfferStatus)),
    })
  },
  one: {
    params: Joi.object<ILoadOfferParams>({
      load_id: Joi.number().required(),
      load_offer_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<ILoadOfferParams>({
      load_id: Joi.number().required(),
      load_offer_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<loadOfferService.WhereMany>, "where">>({
      load_id: Joi.number(),
      carrier_id: Joi.number(),
      source: Joi.string(),
      status: Joi.string().valid(...Object.values(ELoadOfferStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};