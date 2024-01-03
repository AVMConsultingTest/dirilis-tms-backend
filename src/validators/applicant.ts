import Joi from "joi";
import { IApplicantCreate, IApplicantUpdate } from "../models";
import { applicantService } from "../services";
import { EApplicantStatus, EApplicantType } from "../types";

type IApplicantParams = {
    applicant_id: number
}

export const applicantValidator = {
  create: {
    body: Joi.object<IApplicantCreate>({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      hire_date: Joi.date().required(),
      phone_number: Joi.string().required(),
      email: Joi.string().email().required(),
      type: Joi.string().valid(...Object.values(EApplicantType)).required(),
      status: Joi.string().valid(...Object.values(EApplicantStatus)).required(),
    }),
  },
  update: {
    params: Joi.object<IApplicantParams>({
      applicant_id: Joi.string().required(),
    }),
    body: Joi.object<IApplicantUpdate>({
      first_name: Joi.string(),
      last_name: Joi.string(),
      type: Joi.string().valid(...Object.values(EApplicantType)),
      status: Joi.string().valid(...Object.values(EApplicantStatus)),
      hire_date: Joi.date(),
      phone_number: Joi.string(),
      email: Joi.string().email(),

    }),
  },
  many: {
    query: Joi.object<Flat<Query<applicantService.WhereMany>, "where">>({
      type: Joi.string().valid(...Object.values(EApplicantType)),
      status: Joi.string().valid(...Object.values(EApplicantStatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<IApplicantParams>({
      applicant_id: Joi.string().required(),
    }),
  },
  delete: {
    params: Joi.object<IApplicantParams>({
      applicant_id: Joi.string().required(),
    }),
  },
};
