import Joi from "joi";
import { IFactoringCreate, IFactoringUpdate } from "../models";
import { EFactoringStatus } from "../types";
import { factoringService } from "../services";

type IFactoringParams = {
  factoring_id: number,
}

export const factoringValidator = {
  create: {
    body: Joi.object<IFactoringCreate>({
      shipper_name: Joi.string().required(),
      invoice_date: Joi.date().required(),
      invoice_number: Joi.string().required(),
      reference_number: Joi.string().required(),
      invoice_amount: Joi.number().required(),
      notes: Joi.string()
    })
  },
  update: {
    params: Joi.object<IFactoringParams>({
      factoring_id: Joi.number().required()
    }),
    body: Joi.object<IFactoringUpdate>({
      shipper_name: Joi.string(),
      invoice_date: Joi.date(),
      invoice_number: Joi.string(),
      reference_number: Joi.string(),
      invoice_amount: Joi.number(),
      notes: Joi.string(),
      status: Joi.string().valid(...Object.values(EFactoringStatus))
    })
  },
  one: {
    params: Joi.object<IFactoringParams>({
      factoring_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IFactoringParams>({
      factoring_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<factoringService.WhereMany>, "where">>({
      shipper_name: Joi.string(),
      invoice_number: Joi.string(),
      status: Joi.string().valid(...Object.values(EFactoringStatus)),
      page_size: Joi.number(),
      page_number: Joi.number().required()
    })
  }
};