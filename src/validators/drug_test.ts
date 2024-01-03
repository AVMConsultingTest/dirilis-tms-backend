import Joi from "joi";
import { IDrugTestCreate, IDrugTestUpdate } from "../models";
import { EDrugTestType, EDrugTestStatus } from "../types";
import { drugTestService } from "../services";

type IDrugTestParams = {
  drug_test_id: number
}

export const drugTestValidator = {
  create: {
    body: Joi.object<IDrugTestCreate>({
      type: Joi.string().valid(...Object.values(EDrugTestType)),
      status: Joi.string().valid(...Object.values(EDrugTestStatus)),
      date: Joi.date(),
      result: Joi.string(),
      driver_id: Joi.number()
    })
  },
  update: {
    params: Joi.object<IDrugTestParams>({
      drug_test_id: Joi.number().required()
    }),
    body: Joi.object<IDrugTestUpdate>({
      type: Joi.string().valid(...Object.values(EDrugTestType)),
      status: Joi.string().valid(...Object.values(EDrugTestStatus)),
      date: Joi.date(),
      result: Joi.string(),
      driver_id: Joi.number()
    })
  },
  one: {
    params: Joi.object<IDrugTestParams>({
      drug_test_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IDrugTestParams>({
      drug_test_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<drugTestService.WhereMany>, "where">>({
      type: Joi.string().valid(...Object.values(EDrugTestType)),
      status: Joi.string().valid(...Object.values(EDrugTestStatus)),
      driver_id: Joi.number().optional(),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};