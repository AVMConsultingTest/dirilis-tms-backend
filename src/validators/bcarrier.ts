import Joi from "joi";
import { IBCarrierCreate, IBCarrierUpdate } from "../models";
import { bcarrierService } from "../services";
import { EBool } from "../types";

type IBCarrierParams = {
  bcarrier_id: number
}

export const bcarrierValidator = {
  create: {
    body: Joi.object<IBCarrierCreate>({
      name: Joi.string().required(),
      dba_name: Joi.string().required(),
      mc_number: Joi.string().required(),
      dot_number: Joi.string().required(),
      active_insurance: Joi.string().valid(...Object.values(EBool)).required(),
      insurance_expiration: Joi.date().required(),
      cargo_coverage: Joi.string().required(),
      status: Joi.string().required(),
      home_base_city: Joi.string().required(),
      home_base_state: Joi.string().required(),
    })
  },
  update: {
    params: Joi.object<IBCarrierParams>({
      bcarrier_id: Joi.number().required()
    }),
    body: Joi.object<IBCarrierUpdate>({
      name: Joi.string(),
      dba_name: Joi.string(),
      mc_number: Joi.string(),
      dot_number: Joi.string(),
      active_insurance: Joi.string().valid(...Object.values(EBool)),
      insurance_expiration: Joi.date(),
      cargo_coverage: Joi.string(),
      status: Joi.string(),
      home_base_city: Joi.string(),
      home_base_state: Joi.string(),
    })
  },
  one: {
    params: Joi.object<IBCarrierParams>({
      bcarrier_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IBCarrierParams>({
      bcarrier_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<bcarrierService.WhereMany>, "where">>({
      status: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};