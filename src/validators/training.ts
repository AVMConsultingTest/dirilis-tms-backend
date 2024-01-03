import Joi from "joi";
import { ECadence, EEmployeeType, ETrainingStatus, ETrainingType } from "../types";
import { ITrainingCreate, ITrainingUpdate } from "../models";
import { trainingService } from "../services";

type ITrainingParams = {
  training_id: number
}

type ITrainingSearch = {
  driver_id: number
}



export const trainingValidator = {
  create: {
    body: Joi.object<ITrainingCreate>({
      driver_id: Joi.number().required(),
      employee_type: Joi.string().valid(...Object.values(EEmployeeType)),
      type: Joi.string().valid(...Object.values(ETrainingType)),
      description: Joi.string().required(),
      cadence: Joi.string().valid(...Object.values(ECadence)),
      completion_date: Joi.date(),
      status: Joi.string().valid(...Object.values(ETrainingStatus))
    }),
  },
  update: {
    params: Joi.object<ITrainingParams>({
      training_id: Joi.string().required(),
    }),
    body: Joi.object<ITrainingUpdate>({
      driver_id: Joi.number(),
      employee_type: Joi.string().valid(...Object.values(EEmployeeType)),
      type: Joi.string().valid(...Object.values(ETrainingType)),
      description: Joi.string(),
      cadence: Joi.string().valid(...Object.values(ECadence)),
      completion_date: Joi.date(),
      status: Joi.string().valid(...Object.values(ETrainingStatus))
    }),
  },
  many: {
    query: Joi.object<Flat<Query<trainingService.WhereMany>, "where">>({
      employee_type: Joi.string().valid(...Object.values(EEmployeeType)),
      type: Joi.string().valid(...Object.values(ETrainingType)),
      cadence: Joi.string().valid(...Object.values(ECadence)),
      status: Joi.string().valid(...Object.values(ETrainingStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<ITrainingParams>({
      training_id: Joi.string().required(),
    }),
  },
  delete: {
    params: Joi.object<ITrainingParams>({
      training_id: Joi.string().required(),
    }),
  },
  search: {
    query: Joi.object<ITrainingSearch>({
      driver_id: Joi.number().required()
    })
  }
};