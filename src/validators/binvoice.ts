import Joi from "joi";
import { IBInvoiceCreate, IBInvoiceUpdate } from "../models";
import { binvoiceService } from "../services";
import { EBInvoicePayment, EBInvoiceStatus } from "../types";

type IBInvoiceParams = {
  binvoice_id: number
}

export const binvoiceValidator = {
  create: {
    body: Joi.object<IBInvoiceCreate>({
      title: Joi.string(),
      customer_name: Joi.string(),
      customer_address: Joi.string(),
      bill_to_name: Joi.string(),
      bill_to_address: Joi.string(),
      number: Joi.string(),
      date: Joi.date(),
      credit_terms: Joi.string(),
      notes: Joi.string(),

      load_id: Joi.number()
    })
  },
  update: {
    params: Joi.object<IBInvoiceParams>({
      binvoice_id: Joi.number().required()
    }),
    body: Joi.object<IBInvoiceUpdate>({
      title: Joi.string(),
      customer_name: Joi.string(),
      customer_address: Joi.string(),
      bill_to_name: Joi.string(),
      bill_to_address: Joi.string(),
      number: Joi.string(),
      date: Joi.date(),
      credit_terms: Joi.string(),
      notes: Joi.string(),

      customer_payment: Joi.string().valid(...Object.values(EBInvoicePayment)),
      carrier_payment: Joi.string().valid(...Object.values(EBInvoicePayment)),
      status: Joi.string().valid(...Object.values(EBInvoiceStatus)),
    })
  },
  one: {
    params: Joi.object<IBInvoiceParams>({
      binvoice_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IBInvoiceParams>({
      binvoice_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<binvoiceService.WhereMany>, "where">>({
      number: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};