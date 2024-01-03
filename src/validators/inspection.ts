import Joi from "joi";
import { IInspectionCreate, IInspectionUpdate } from "../models";
import { inspectionService } from "../services";

type IInspectionParams = {
  inspection_id: number
}

export const inspectionValidator = {
  create: {
    body: Joi.object<IInspectionCreate>({
      driver_id: Joi.number().integer().required(),
      category: Joi.string().required(),
      date: Joi.date().required(),
      state: Joi.string().required(),
      report_number: Joi.string().required(),
      inspection_level: Joi.number().required(),
      violation_group: Joi.string().required(),
      description: Joi.string(),
      violations_count: Joi.number().required(),
      sequence: Joi.number().required(),
      out_of_service: Joi.string().required(),
      violation_severity: Joi.number().required(),
      oos_violation_severity: Joi.number().required(),
      total_violation_severity: Joi.number().required(),
      time_weight: Joi.number().required(),
      total_points: Joi.number().required()
    })
  },
  update: {
    params: Joi.object<IInspectionParams>({
      inspection_id: Joi.number().required()
    }),
    body: Joi.object<IInspectionUpdate>({
      driver_id: Joi.number().integer(),
      category: Joi.string(),
      date: Joi.date(),
      state: Joi.string(),
      report_number: Joi.string(),
      inspection_level: Joi.number(),
      violation_group: Joi.string(),
      description: Joi.string(),
      violations_count: Joi.number(),
      sequence: Joi.number(),
      out_of_service: Joi.string(),
      violation_severity: Joi.number(),
      oos_violation_severity: Joi.number(),
      total_violation_severity: Joi.number(),
      time_weight: Joi.number(),
      total_points: Joi.number()
    })
  },
  one: {
    params: Joi.object<IInspectionParams>({
      inspection_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<IInspectionParams>({
      inspection_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<inspectionService.WhereMany>, "where">>({
      category: Joi.string(),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};